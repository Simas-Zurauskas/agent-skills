// node check.mjs <url-or-file> [more] [--widths 390,1440] [--out DIR] [--json] [--settle MS]
// Renders each page at each width in a headless browser, saves a first-viewport and a full-page screenshot, and
// reports FLOOR failures (exit 1), TELLS (look closer, never fail the run) and an INVENTORY of what the page uses.
// It measures; it does not judge. Read references/floor.md and references/tells.md for what each line means.
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { launch, sleep, isMain } from './cdp.mjs';

// ---- runs inside the page (serialized with toString): keep it self-contained ----
export const audit = (W) => {
  const out = { fail: [], warn: [], tells: [], inv: {} };
  const push = (list, id, msg, samples = []) => {
    const uniq = [...new Set(samples)];
    out[list].push({ id, msg, count: uniq.length || 1, samples: uniq.slice(0, 4) });
  };
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const colorCache = new Map();
  const rgba = (c) => {
    if (colorCache.has(c)) return colorCache.get(c);
    cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1);
    const v = [...cv.getImageData(0, 0, 1, 1).data]; colorCache.set(c, v); return v;
  };
  const over = ([r, g, b, a], [R, G, B]) => { a /= 255; return [r * a + R * (1 - a), g * a + G * (1 - a), b * a + B * (1 - a)]; };
  const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const hsl = ([r, g, b]) => {
    r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    if (!d) return [0, 0, l];
    const s = d / (1 - Math.abs(2 * l - 1));
    const h = mx === r ? ((g - b) / d + 6) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, s, l];
  };
  const hex = (c) => '#' + c.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  const styles = new WeakMap();
  const cs = (e) => { let s = styles.get(e); if (!s) { s = getComputedStyle(e); styles.set(e, s); } return s; };
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'HEAD', 'META', 'LINK', 'TITLE', 'BR', 'WBR']);
  const all = [...document.querySelectorAll('body *')].filter((e) => !SKIP.has(e.tagName) && !e.closest('svg'));
  const rect = (e) => e.getBoundingClientRect();
  const shown = (e) => { const r = rect(e); if (r.width <= 1 || r.height <= 1) return false; const s = cs(e); return s.visibility !== 'hidden' && s.display !== 'none'; };
  const ownText = (e) => [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ').replace(/\s+/g, ' ').trim();
  const clip = (t, n = 36) => { t = String(t).replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1) + '…' : t; };
  const label = (e) => clip(e.getAttribute('aria-label') || e.textContent || e.getAttribute('placeholder') || e.getAttribute('name') || e.tagName.toLowerCase(), 30) || e.tagName.toLowerCase();
  const opacityOf = (e) => { let o = 1; for (; e && e.nodeType === 1; e = e.parentElement) o *= parseFloat(cs(e).opacity); return o; };
  const bgOf = (el) => {
    const layers = []; let img = false;
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      const s = cs(e); if (s.backgroundImage !== 'none') img = true;
      const c = rgba(s.backgroundColor); if (c[3]) { layers.push(c); if (c[3] === 255) break; }
    }
    return [layers.reverse().reduce((acc, c) => over(c, acc), [255, 255, 255]), img];
  };
  const family = (s) => s.fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '');
  const SERIF = /serif$|playfair|fraunces|cormorant|georgia|times|lora|newsreader|dm serif|crimson|baskerville|garamond|merriweather|spectral|bodoni|didot|caslon|tiempos|canela|sectra|literata|libre caslon|charter|palatino|book antiqua|cambria/i;
  const isSerif = (s) => { const f = family(s); if (/sans|grotesk|mono/i.test(f)) return false; if (SERIF.test(f)) return true; const stack = s.fontFamily.toLowerCase(); return /(^|,)\s*serif\s*$/.test(stack) && !/sans-serif/.test(stack); };
  const isMono = (s) => /mono|menlo|consolas|courier|sfmono|sf mono/i.test(family(s));
  const colors = (str) => (str.match(/(rgba?\([^)]+\)|hsla?\([^)]+\)|oklch\([^)]+\)|oklab\([^)]+\)|lab\([^)]+\)|lch\([^)]+\)|color\([^)]+\)|#[0-9a-f]{3,8}\b)/gi) || []).map(rgba);
  const decorative = (e) => !!e.closest('[aria-hidden="true"], [inert]');
  const phone = W < 600;
  const vw = innerWidth, vh = innerHeight;

  // ---------- FLOOR ----------
  const low = [], tiny = [], invisible = []; let onImage = 0;
  const textEls = [];
  for (const el of all) {
    const text = ownText(el).replace(/\p{Extended_Pictographic}|️|‍/gu, '').trim();
    if (text.length < 2 || !shown(el)) continue;
    const s = cs(el), px = parseFloat(s.fontSize);
    if (opacityOf(el) < 0.05) { if (!decorative(el) && !el.closest('a[href^="#"]')) invisible.push(clip(text)); continue; }
    textEls.push([el, text, s, px]);
    if (decorative(el)) continue;
    if (px < 12) tiny.push(`"${clip(text, 28)}" ${px}px`);
    if (s.webkitBackgroundClip === 'text' || s.backgroundClip === 'text') continue;
    const [bg, img] = bgOf(el);
    if (img) { onImage++; continue; }
    const c = rgba(s.color), fg = over([c[0], c[1], c[2], c[3] * opacityOf(el)], bg), cr = ratio(fg, bg);
    const large = px >= 24 || (px >= 18.66 && +s.fontWeight >= 700), need = large ? 3 : 4.5;
    if (cr < need - 0.05) low.push(`"${clip(text, 28)}" ${cr.toFixed(1)}:1, needs ${need} (${px}px ${hex(fg)} on ${hex(bg)})`);
  }
  if (low.length) push('fail', 'contrast', 'text contrast too low', low);
  if (tiny.length) push('fail', 'small-text', 'text under 12px', tiny);
  if (onImage) out.inv.textOverImage = onImage;

  const hitSel = 'a[href], button, [role=button], [role=tab], [role=link], [role=menuitem], [role=switch], [role=checkbox], [role=radio], input:not([type=hidden]), select, textarea, summary';
  const small = [], touch = [], hits = [];
  for (const e of document.querySelectorAll(hitSel)) {
    if (!shown(e) || e.closest('svg') || decorative(e)) continue;
    let r = rect(e);
    if (e.tagName === 'INPUT' && /checkbox|radio/.test(e.type)) { const l = e.closest('label') || (e.id && document.querySelector(`label[for="${CSS.escape(e.id)}"]`)); if (l) r = rect(l); }
    if (e.tagName === 'A' && cs(e).display.startsWith('inline') && e.parentElement && ownText(e.parentElement).length > 20) continue; // links inside a sentence are exempt
    hits.push([e, r]);
  }
  // WCAG 2.5.8: an undersized target passes when a 24px box centred on it touches no other target
  const box24 = (r) => { const cx = r.left + r.width / 2, cy = r.top + r.height / 2; return { left: Math.min(r.left, cx - 12), right: Math.max(r.right, cx + 12), top: Math.min(r.top, cy - 12), bottom: Math.max(r.bottom, cy + 12) }; };
  const meet = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
  for (const [e, r] of hits) {
    const w = Math.round(r.width), h = Math.round(r.height);
    if (w < 24 || h < 24) { const mine = box24(r); if (hits.some(([o, q]) => o !== e && !o.contains(e) && !e.contains(o) && meet(mine, q.width < 24 || q.height < 24 ? box24(q) : q))) small.push(`"${label(e)}" ${w}×${h}`); }
    else if (phone && (w < 44 || h < 44)) touch.push(`"${label(e)}" ${w}×${h}`);
  }
  if (small.length) push('fail', 'target-size', 'targets under 24×24 and crowded by another target', small);
  if (touch.length) push('warn', 'touch-target', 'targets under 44×44 on a phone layout', touch);

  const docW = document.documentElement.scrollWidth;
  if (docW > vw + 1) {
    const wide = all.filter((e) => shown(e) && rect(e).right > vw + 1 && !all.some((c) => c !== e && e.contains(c) && rect(c).right > vw + 1)).slice(0, 4)
      .map((e) => `${e.tagName.toLowerCase()}${e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/)[0] : ''} reaches ${Math.round(rect(e).right)}px`);
    push('fail', 'overflow-x', `page scrolls sideways (${docW}px wide in a ${vw}px viewport)`, wide);
  }
  const hScroll = [], vScroll = [], clipped = [];
  const docScrolls = document.documentElement.scrollHeight > vh + 4;
  for (const e of all) {
    if (!shown(e)) continue; const s = cs(e), tag = e.tagName.toLowerCase();
    const name = `${tag}${e.id ? '#' + e.id : ''}${e.className && typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/)[0] : ''}`;
    if (/auto|scroll/.test(s.overflowX) && e.scrollWidth > e.clientWidth + 1 && !/^(pre|code|textarea|input|select)$/.test(tag)) hScroll.push(name);
    if (/auto|scroll/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 1 && e.clientHeight > vh * 0.6 && docScrolls && !/^(textarea)$/.test(tag)) vScroll.push(name);
    // skip text hidden for screen readers on purpose (the sr-only pattern: about 1px, clipped)
    const srOnly = e.clientWidth <= 2 || e.clientHeight <= 2 || /rect\(0/.test(s.clip) || /inset\(50%/.test(s.clipPath);
    if (!srOnly && ownText(e).length > 1 && /hidden|clip/.test(s.overflowX) && e.scrollWidth > e.clientWidth + 1 && s.textOverflow !== 'ellipsis') clipped.push(`"${clip(ownText(e), 28)}"`);
  }
  if (hScroll.length) push('warn', 'scroll-x-inner', 'scrolls sideways inside the page (intended?)', hScroll);
  if (vScroll.length) push('warn', 'double-scroll', 'tall inner scroller inside a scrolling page (two scroll bars)', vScroll);
  if (clipped.length) push('warn', 'clipped-text', 'text cut off without an ellipsis', clipped);

  const noLabel = [], noVisible = [], smallInput = [];
  for (const e of document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=reset]):not([type=image]), select, textarea')) {
    if (!shown(e)) continue;
    const lab = e.closest('label') || (e.id && document.querySelector(`label[for="${CSS.escape(e.id)}"]`));
    const aria = e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') || e.getAttribute('title');
    const n = e.getAttribute('placeholder') || e.getAttribute('name') || e.type || e.tagName.toLowerCase();
    if (!lab && !aria) noLabel.push(n); else if (!lab && !/checkbox|radio|search/.test(e.type || '')) noVisible.push(n);
    if (phone && parseFloat(cs(e).fontSize) < 16 && !/checkbox|radio|range|color|file/.test(e.type || '')) smallInput.push(`${n} ${parseFloat(cs(e).fontSize)}px`);
  }
  if (noLabel.length) push('fail', 'input-label', 'inputs with no label', noLabel);
  if (noVisible.length) push('warn', 'input-visible-label', 'inputs with no visible label (a placeholder is not a label)', noVisible);
  if (smallInput.length) push('warn', 'input-zoom', 'input text under 16px on a phone (the page zooms on focus)', smallInput);

  const unnamed = [];
  for (const e of document.querySelectorAll('button, a[href], [role=button]')) {
    if (!shown(e)) continue;
    const named = e.textContent.trim() || e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') || e.getAttribute('title') || e.querySelector('img[alt]:not([alt=""]), svg title');
    if (!named) unnamed.push(`${e.tagName.toLowerCase()}${e.className && typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/)[0] : ''}`);
  }
  if (unnamed.length) push('fail', 'no-name', 'icon-only controls with no accessible name', unnamed);

  const noAlt = [], broken = [], noDims = [];
  for (const e of document.querySelectorAll('img')) {
    const src = clip((e.currentSrc || e.src || '').split('/').pop() || 'img', 30);
    if (!e.hasAttribute('alt')) noAlt.push(src);
    if (e.complete && e.naturalWidth === 0 && (e.currentSrc || e.src)) broken.push(src);
    else if (!e.getAttribute('width') && !e.getAttribute('height') && cs(e).aspectRatio === 'auto' && shown(e)) noDims.push(src);
  }
  if (noAlt.length) push('fail', 'img-alt', 'images with no alt attribute', noAlt);
  if (broken.length) push('fail', 'img-broken', 'images that did not load', broken);
  if (noDims.length) push('warn', 'img-dimensions', 'images with no width/height or aspect-ratio (layout jumps)', noDims);

  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(shown);
  const h1s = hs.filter((h) => h.tagName === 'H1').length;
  if (h1s !== 1) push('warn', 'h1', h1s ? `${h1s} h1 elements (one expected)` : 'no h1');
  const skips = []; hs.reduce((prev, h) => { const lv = +h.tagName[1]; if (prev && lv > prev + 1) skips.push(`h${prev} → h${lv} "${clip(h.textContent, 24)}"`); return lv; }, 0);
  if (skips.length) push('warn', 'heading-order', 'heading levels skip', skips);
  if (!document.documentElement.getAttribute('lang')) push('fail', 'lang', 'no lang attribute on <html>');
  const vp = document.querySelector('meta[name=viewport]')?.content || '';
  if (!vp) push('warn', 'viewport', 'no viewport meta tag');
  else if (/user-scalable\s*=\s*(no|0)/i.test(vp) || /maximum-scale\s*=\s*1(\.0*)?(\D|$)/i.test(vp)) push('fail', 'zoom-disabled', `zoom is disabled (${vp})`);

  const long = [];
  for (const [el, text, s, px] of textEls) {
    if (!/^(P|LI|BLOCKQUOTE|DD)$/.test(el.tagName) || text.length < 240) continue;
    const lh = parseFloat(s.lineHeight) || px * 1.2, lines = Math.round(rect(el).height / lh);
    if (lines >= 3 && text.length / lines > 85) long.push(`"${clip(text, 24)}" about ${Math.round(text.length / lines)} characters per line`);
  }
  if (long.length) push('warn', 'measure', 'lines longer than about 85 characters', long);

  const transAll = all.filter((e) => shown(e) && cs(e).transitionProperty === 'all' && parseFloat(cs(e).transitionDuration) > 0);
  if (transAll.length) push('warn', 'transition-all', `transition: all on ${transAll.length} elements (name the properties)`);
  let moving = 0, reduced = false, tokenNames = new Set();
  const walk = (rules) => { for (const r of rules) {
    if (r.conditionText && /prefers-reduced-motion/.test(r.conditionText)) reduced = true;
    if (r.style) for (const p of r.style) if (/^--(paper|cream|parchment|ivory|sand|linen|bone)\b/.test(p)) tokenNames.add(p);
    if (r.cssRules) walk(r.cssRules);
  } };
  for (const sheet of document.styleSheets) { try { walk(sheet.cssRules); } catch { /* cross-origin sheet */ } }
  const loops = [];
  for (const e of all) { if (!shown(e)) continue; const s = cs(e);
    if (s.animationName !== 'none') { moving++; if (s.animationIterationCount.includes('infinite')) loops.push(`${e.tagName.toLowerCase()}${e.className && typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/)[0] : ''} (${s.animationName})`); }
    else if (parseFloat(s.transitionDuration) > 0 && /transform|all|translate|scale/.test(s.transitionProperty)) moving++;
  }
  if (moving && !reduced) push('warn', 'reduced-motion', 'animation present but no prefers-reduced-motion rule found');
  const text = document.body.innerText || '';
  if (/lorem ipsum|dolor sit amet/i.test(text)) push('fail', 'placeholder-text', 'placeholder text left in (lorem ipsum)');
  // check each family at a weight and style the page actually uses, or a family loaded only in bold reads as missing
  // and probe with the element's own text: subsetted faces (CJK, split by unicode-range) never load the space character
  const used = new Map(); for (const [, text, s] of textEls) if (!used.has(family(s))) used.set(family(s), [`${s.fontStyle} ${s.fontWeight}`, text.trim().slice(0, 40) || 'a']);
  // a family counts as loaded if the check passes or any of its faces has loaded (subsetted faces load piecemeal)
  const anyLoaded = (f) => [...document.fonts].some((ff) => ff.family.replace(/["']/g, '') === f && ff.status === 'loaded');
  const notLoaded = [...used].filter(([f, [fw, sample]]) => { try { return !document.fonts.check(`${fw} 16px "${f}"`, sample) && !anyLoaded(f); } catch { return false; } }).map(([f]) => f);
  if (notLoaded.length) push('warn', 'font-not-loaded', 'declared web fonts that did not load (fallback is showing)', notLoaded);
  // on a phone, the page's main action should be in the first screen (outside the header and its menu)
  if (vw <= 480) {
    const pageBg = cs(document.body).backgroundColor;
    const acts = [...document.querySelectorAll('a[href], button, [role="button"], input[type="submit"]')].filter((e) => {
      if (e.closest('header, nav, [role="banner"], [role="navigation"], [aria-hidden="true"], [inert]') || !shown(e)) return false;
      const s = cs(e), r = rect(e);
      if (r.width < 24 || r.height < 24) return false;
      const filled = rgba(s.backgroundColor)[3] > 0 && s.backgroundColor !== pageBg;
      const boxed = parseFloat(s.borderTopWidth) >= 1 && s.borderTopStyle !== 'none' && parseFloat(s.borderBottomWidth) >= 1;
      return filled || boxed;
    });
    const top = (e) => rect(e).top + scrollY;
    if (acts.length && !acts.some((e) => top(e) >= 0 && top(e) + rect(e).height <= vh))
      push('warn', 'action-below-fold', 'no button in the first phone screen outside the header: the main action needs a scroll', acts.slice(0, 3).map((e) => `"${clip(e.textContent || e.value, 24)}" at ${Math.round(top(e))}px`));
  }
  out.invisible = invisible;

  // ---------- TELLS ----------
  const tell = (id, msg, samples) => push('tells', id, msg, samples);
  const gradText = [], purple = [], glass = [], glow = [], ghost = [], stripe = [];
  let gradients = 0;
  const HIT = /^(BUTTON|A|INPUT|SELECT|TEXTAREA|LABEL|SUMMARY)$/;
  const cards = [];
  for (const e of all) {
    if (!shown(e)) continue; const s = cs(e), r = rect(e);
    const bi = s.backgroundImage;
    if (bi.includes('gradient')) {
      if (s.webkitBackgroundClip === 'text' || s.backgroundClip === 'text') gradText.push(`"${clip(e.textContent, 28)}"`);
      else if (r.width * r.height > 2000) gradients++;
      if (colors(bi).some((c) => { const [h, sat, l] = hsl(c); return c[3] > 60 && h >= 245 && h <= 300 && sat > 0.35 && l > 0.25 && l < 0.8; })) purple.push(`${e.tagName.toLowerCase()} ${Math.round(r.width)}×${Math.round(r.height)}`);
    }
    if ((s.backdropFilter && s.backdropFilter !== 'none') || (s.webkitBackdropFilter && s.webkitBackdropFilter !== 'none')) glass.push(`${e.tagName.toLowerCase()} ${Math.round(r.width)}×${Math.round(r.height)}`);
    const radius = parseFloat(s.borderTopLeftRadius) || 0;
    const bw = ['Top', 'Right', 'Bottom', 'Left'].map((k) => (rgba(s[`border${k}Color`])[3] > 20 && s[`border${k}Style`] !== 'none' ? parseFloat(s[`border${k}Width`]) : 0));
    const hasBorder = bw.some((w) => w > 0);
    let wideSoft = false;
    if (s.boxShadow !== 'none') for (const sh of s.boxShadow.split(/,(?![^(]*\))/)) {
      const c = colors(sh)[0] || [0, 0, 0, 255], nums = (sh.replace(/(rgba?|hsla?|oklch|oklab|lab|lch|color)\([^)]+\)/gi, '').match(/-?[\d.]+px/g) || []).map(parseFloat);
      const [x = 0, y = 0, blur = 0] = nums, [, sat] = hsl(c);
      if (Math.abs(x) < 1 && Math.abs(y) < 1 && blur >= 20 && sat > 0.4 && c[3] > 40 && !sh.includes('inset')) glow.push(`${e.tagName.toLowerCase()} glow ${hex(c)} blur ${blur}px`);
      if (blur >= 20 && !sh.includes('inset')) wideSoft = true;
    }
    const big = r.width >= 120 && r.height >= 60;
    if (big && !HIT.test(e.tagName) && hasBorder && wideSoft) ghost.push(e);
    if (big && radius > 0) { const max = Math.max(...bw), others = bw.filter((w) => w < max); if (max >= 3 && others.length === 3 && others.every((w) => w <= 1)) stripe.push(`"${clip(e.textContent, 24)}"`); }
    if (big && !HIT.test(e.tagName) && radius >= 4 && (s.boxShadow !== 'none' || hasBorder)) cards.push({ e, r, radius, shadow: s.boxShadow });
  }
  if (gradText.length) tell('gradient-text', 'gradient text', gradText);
  if (purple.length) tell('purple-gradient', 'purple / indigo / violet gradient', purple);
  if (gradients >= 3) tell('gradients', `decorative gradients on ${gradients} elements`);
  if (glass.length) tell('glass', 'backdrop blur (glass)', glass);
  if (glow.length) tell('glow', 'coloured glow with no offset', glow);
  if (ghost.length >= 3) tell('ghost-card', `hairline border plus wide soft shadow on ${ghost.length} boxes`);
  if (stripe.length) tell('side-stripe', 'coloured stripe on one side of a rounded box (does it encode a state?)', stripe);
  const nested = cards.filter((c) => cards.some((p) => p.e !== c.e && p.e.contains(c.e)));
  if (nested.length) tell('nested-cards', `cards inside cards (${nested.length})`, nested.map((c) => `"${clip(c.e.textContent, 24)}"`));
  if (cards.length >= 5) { const rset = new Set(cards.map((c) => c.radius)), sset = new Set(cards.map((c) => c.shadow));
    if (rset.size === 1 && sset.size === 1 && cards[0].shadow !== 'none') tell('kit-defaults', `${cards.length} boxes share one radius (${cards[0].radius}px) and one shadow: hierarchy is not shown in depth`); }

  // identical repeated blocks: 3+ siblings of the same size, each a heading plus text
  const groups = [];
  for (const p of new Set(all.map((e) => e.parentElement))) {
    if (!p) continue; const kids = [...p.children].filter(shown); if (kids.length < 3) continue;
    const same = kids.filter((k) => Math.abs(rect(k).width - rect(kids[0]).width) < 4 && k.querySelector('h2,h3,h4,h5,h6,strong,b') && k.querySelector('p,span,li') && rect(k).height > 80);
    if (same.length >= 3 && same.length === kids.length) groups.push({ n: same.length, icon: same.every((k) => k.querySelector('svg, img, i')), card: same.every((k) => cards.some((c) => c.e === k)), sample: clip(same[0].querySelector('h2,h3,h4,h5,h6,strong,b').textContent, 24) });
  }
  const idGrid = groups.filter((g) => g.icon || g.card);
  if (idGrid.length) tell('identical-blocks', 'rows of identical blocks (same size, each a heading and text)', idGrid.map((g) => `${g.n}× ${g.card ? 'card' : 'block'}${g.icon ? ' with icon' : ''}, starting "${g.sample}"`));

  const eyebrows = [], pills = [], accents = [], tight = [], italicSerif = [];
  const isCaps = (t, s) => s.textTransform === 'uppercase' || (t === t.toUpperCase() && /\p{Lu}{3,}/u.test(t));
  for (const h of hs) {
    const s = cs(h), hpx = parseFloat(s.fontSize), ht = h.textContent.trim();
    if (/^H[123]$/.test(h.tagName)) {
      let prev = h.previousElementSibling;
      if (!prev && h.parentElement && !/^(BODY|MAIN)$/.test(h.parentElement.tagName)) prev = h.parentElement.previousElementSibling;
      if (prev && shown(prev)) {
        const t = prev.textContent.trim();
        if (t && t.length < 40 && prev.querySelectorAll('*').length <= 3) {
          const leaf = [...prev.querySelectorAll('*')].reverse().find((x) => ownText(x)) || prev, ls = cs(leaf), lpx = parseFloat(ls.fontSize);
          const tracked = parseFloat(ls.letterSpacing) / lpx >= 0.04;
          const r = rect(prev), ps = cs(prev), pill = parseFloat(ps.borderTopLeftRadius) >= r.height / 2 - 1 && r.height < 48 && (rgba(ps.backgroundColor)[3] > 10 || parseFloat(ps.borderTopWidth) > 0);
          if (pill) pills.push(`"${clip(t, 24)}" above "${clip(ht, 20)}"`);
          else if ((lpx <= 14 || lpx <= hpx * 0.45) && (isCaps(t, ls) || tracked)) eyebrows.push(`"${clip(t, 24)}" above "${clip(ht, 20)}"`);
        }
      }
    }
    if (/^H[12]$/.test(h.tagName)) {
      for (const c of h.querySelectorAll('em, i, span, strong, b, mark, u')) {
        const t = c.textContent.trim(); if (!t || t.length >= ht.length * 0.6) continue; const k = cs(c);
        if (k.fontStyle !== s.fontStyle || k.color !== s.color || family(k) !== family(s) || (k.backgroundImage !== 'none' && k.backgroundImage !== s.backgroundImage)) { accents.push(`"${clip(t, 20)}" in "${clip(ht, 28)}"`); break; }
      }
      if (parseFloat(s.letterSpacing) / hpx <= -0.045) tight.push(`"${clip(ht, 24)}" ${(parseFloat(s.letterSpacing) / hpx).toFixed(3)}em`);
      if (s.fontStyle === 'italic' && isSerif(s)) italicSerif.push(`"${clip(ht, 24)}"`);
    }
  }
  if (eyebrows.length) tell('eyebrow', 'small tracked or all-caps label above a heading', eyebrows);
  if (pills.length) tell('badge-above-heading', 'badge pill above a heading', pills);
  if (accents.length) tell('accent-word', 'one word or phrase in a headline styled differently', accents);
  if (tight.length) tell('tight-tracking', 'display type tracked very tight', tight);
  if (italicSerif.length) tell('italic-serif-display', 'italic serif display headline', italicSerif);

  const caps = [], monoLabels = [], dots = [], arrows = [], numbered = [], emoji = [], stats = [], centered = [];
  let blocks = 0, dashes = 0;
  for (const [el, t, s, px] of textEls) {
    if (isCaps(t, s) && t.replace(/[^\p{L}]/gu, '').length >= 4 && !/^H[1-6]$/.test(el.tagName)) caps.push(clip(t, 20));
    if (isMono(s) && px <= 13 && t.length < 40 && !el.closest('pre, code, kbd, samp, textarea')) monoLabels.push(clip(t, 20));
    if (/\S\s[·•]\s\S/.test(t) && t.length < 80) dots.push(clip(t, 30));
    if (el.closest('a, button') && /(→|->|›|»|➜|⟶)\s*$/.test(t)) arrows.push(clip(t, 24));
    if (/^0[1-9](\s*[./—–-])?$/.test(t) || /^0[1-9]\s*[./—–-]\s/.test(t)) numbered.push(clip(t, 16));
    dashes += (t.match(/\s—\s/g) || []).length;
    if (px >= 28 && /^[~≈<>]?[€$£]?\d[\d.,\s]*\s?(%|\+|k|K|M|B|x|×|ms|s|h|min)?\+?$/.test(t) && t.length <= 9) stats.push(t);
    if (/^(P|H[1-6]|LI)$/.test(el.tagName)) { blocks++; if (s.textAlign === 'center') centered.push(1); }
  }
  for (const el of all) { const raw = ownText(el); if (raw && shown(el) && /^(\p{Extended_Pictographic}|️|‍|\s)+$/u.test(raw)) emoji.push(raw.trim()); }
  if (caps.length >= 6) tell('caps-labels', `all-caps labels (${caps.length})`, caps);
  if (monoLabels.length >= 3) tell('mono-labels', `monospace on small labels (${monoLabels.length}): is it code or data?`, monoLabels);
  if (dots.length >= 2) tell('middle-dots', 'meta strings joined with middle dots', dots);
  if (arrows.length >= 2) tell('arrow-links', 'arrows glued to link or button text', arrows);
  if (numbered.length >= 2) tell('numbered-markers', '01 / 02 / 03 markers (a real sequence?)', numbered);
  if (emoji.length >= 2) tell('emoji-icons', 'emoji used as icons', emoji);
  if (dashes >= 4) tell('em-dashes', `${dashes} spaced em dashes in the copy`);
  if (stats.length >= 3) tell('stat-strip', 'row of big numbers (is every number real?)', stats);
  if (blocks >= 8 && centered.length / blocks > 0.6) tell('all-centred', `${Math.round((centered.length / blocks) * 100)}% of text blocks are centred`);
  if (loops.length) tell('loops', 'animations that never stop (a true live state?)', loops);
  const stock = (text.match(/\b(elevate[sd]?|seamless(ly)?|unlock(s|ed|ing)?|supercharge[sd]?|effortless(ly)?|world-class|cutting-edge|next-generation|reimagine[sd]?|revolutioni[sz]e[sd]?|game-chang(er|ing)|delve|tapestry|empower(s|ed|ing)?|leverage[sd]?|ai-powered|scroll to explore)\b/gi) || []).map((w) => w.toLowerCase());
  if (stock.length) tell('stock-copy', 'stock marketing words', stock);
  const fake = (text.match(/\b(John Doe|Jane Doe|Acme( Inc| Corp)?|Lorem|99\.9+%)/g) || []);
  if (fake.length) tell('placeholder-facts', 'placeholder names or invented-sounding figures', fake);

  // palette-level tells
  const bodyBg = bgOf(document.body)[0], [bh, bs, bl] = hsl(bodyBg);
  const accentsUsed = new Map();
  for (const e of all) { if (!shown(e)) continue; const s = cs(e);
    for (const c of [rgba(s.backgroundColor), ...(ownText(e) ? [rgba(s.color)] : [])]) { if (c[3] < 200) continue; const [h, sat, l] = hsl(c); if (sat > 0.35 && l > 0.2 && l < 0.8) { const k = hex(c); accentsUsed.set(k, (accentsUsed.get(k) || 0) + 1); } } }
  const acc = [...accentsUsed.keys()].map((k) => [k, hsl(rgba(k))]);
  const h1 = hs.find((h) => h.tagName === 'H1') || hs[0];
  const cream = bl >= 0.88 && bl < 0.99 && bh >= 25 && bh <= 75 && bodyBg[0] - bodyBg[2] >= 5;
  const serifDisplay = !!h1 && isSerif(cs(h1));
  const terracotta = acc.filter(([, [h, sat, l]]) => h >= 5 && h <= 32 && sat >= 0.35 && l >= 0.3 && l <= 0.68).map(([k]) => k);
  const parts = [cream && `warm cream page ${hex(bodyBg)}`, serifDisplay && `serif display (${family(cs(h1))})`, terracotta.length && `terracotta / clay accent ${terracotta[0]}`, tokenNames.size && `tokens named ${[...tokenNames].slice(0, 3).join(', ')}`].filter(Boolean);
  if (cream && parts.length >= 2) tell('cream-serif-terracotta', 'the warm "tasteful" default', parts);
  const neon = acc.filter(([, [h, sat, l]]) => sat >= 0.75 && l >= 0.45 && l <= 0.7 && ((h >= 60 && h <= 170) || h <= 20 || h >= 340)).map(([k]) => k);
  if (lum(bodyBg) < 0.02 && neon.length) tell('dark-neon', 'near-black page with a neon or acid accent', [`page ${hex(bodyBg)}`, `accent ${neon[0]}`]);
  const STOCK = { '#6366f1': 'indigo-500', '#4f46e5': 'indigo-600', '#8b5cf6': 'violet-500', '#7c3aed': 'violet-600', '#a855f7': 'purple-500', '#9333ea': 'purple-600', '#615fff': 'indigo-500', '#4f39f6': 'indigo-600', '#8e51ff': 'violet-500', '#7f22fe': 'violet-600', '#ad46ff': 'purple-500', '#9810fa': 'purple-600' };
  const near = (a, b) => rgba(a).slice(0, 3).every((v, i) => Math.abs(v - rgba(b)[i]) <= 5);
  const stockHits = [...accentsUsed.keys()].flatMap((k) => Object.keys(STOCK).filter((s) => near(k, s)).map((s) => `${k} (Tailwind ${STOCK[s]})`));
  if (stockHits.length) tell('stock-accent', "the framework's stock purple as the accent", stockHits);

  // ---------- INVENTORY ----------
  const fams = new Map(), sizes = new Map(), weights = new Set(), textColors = new Map(), bgColors = new Map(), radii = new Map(), shadows = new Set();
  for (const [el, t, s, px] of textEls) {
    const f = family(s), role = el.closest('h1,h2,h3') ? 'headings' : 'text';
    const rec = fams.get(f) || { headings: 0, text: 0 }; rec[role] += t.length; fams.set(f, rec);
    sizes.set(px, (sizes.get(px) || 0) + 1); weights.add(s.fontWeight);
    const c = hex(over(rgba(s.color), bgOf(el)[0])); textColors.set(c, (textColors.get(c) || 0) + t.length);
  }
  for (const e of all) { if (!shown(e)) continue; const s = cs(e), c = rgba(s.backgroundColor), r = rect(e);
    if (c[3] > 200) bgColors.set(hex(c), (bgColors.get(hex(c)) || 0) + r.width * r.height);
    const rad = parseFloat(s.borderTopLeftRadius); if (rad > 0 && r.width > 20) radii.set(rad >= r.height / 2 ? 'pill' : Math.round(rad), (radii.get(rad >= r.height / 2 ? 'pill' : Math.round(rad)) || 0) + 1);
    if (s.boxShadow !== 'none') shadows.add(s.boxShadow);
  }
  const top = (m, n) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k]) => k);
  const REFLEX = /^(inter|roboto|open sans|lato|poppins|montserrat|manrope|space grotesk|space mono|playfair display|fraunces|cormorant( garamond)?|instrument (serif|sans)|geist( mono| sans)?|satoshi|outfit|dm sans|dm serif (display|text)|dm mono|ibm plex (sans|mono|serif)|plus jakarta sans|syne|newsreader|lora|crimson (pro|text)|cabinet grotesk|clash display|general sans|bricolage grotesque|jetbrains mono)$/i;
  const SYSTEM = /^(system-ui|-apple-system|blinkmacsystemfont|ui-sans-serif|ui-serif|arial|helvetica|helvetica neue|segoe ui|sans-serif|serif|times|times new roman)$/i;
  const famList = [...fams.entries()].sort((a, b) => b[1].headings + b[1].text - (a[1].headings + a[1].text));
  out.inv.fonts = famList.map(([f, r]) => `${f} (${[r.headings && 'headings', r.text && 'text'].filter(Boolean).join(', ')})`);
  const reflex = famList.filter(([f]) => REFLEX.test(f)).map(([f, r]) => `${f} (${[r.headings && 'headings', r.text && 'text'].filter(Boolean).join(', ')})`);
  if (reflex.length) tell('reflex-fonts', 'faces models reach for by habit (fine with a reason from the subject)', reflex);
  if (h1 && SYSTEM.test(family(cs(h1)))) tell('system-display', `the main heading is set in a system default (${family(cs(h1))})`);
  if (famList.length === 1 && textEls.length > 12) out.inv.singleFamily = true;
  out.inv.sizes = [...sizes.keys()].sort((a, b) => a - b);
  out.inv.weights = [...weights].sort();
  out.inv.textColors = top(textColors, 8); out.inv.textColorCount = textColors.size;
  out.inv.surfaces = top(bgColors, 8); out.inv.surfaceCount = bgColors.size;
  out.inv.radii = [...radii.keys()].sort((a, b) => (a === 'pill') - (b === 'pill') || a - b);
  out.inv.shadows = shadows.size;
  out.inv.page = hex(bodyBg);
  out.inv.accents = top(accentsUsed, 6);
  out.inv.cards = cards.length; out.inv.gradients = gradients; out.inv.animated = moving;
  return out;
};

// text that is still invisible after the whole page has been scrolled
const stillHidden = () => {
  const hidden = [];
  for (const el of document.querySelectorAll('body *')) {
    const t = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ').trim();
    if (t.length < 2 || el.closest('[aria-hidden="true"], [inert], a[href^="#"], svg, script, style, noscript, template')) continue;
    const r = el.getBoundingClientRect(); if (r.width <= 1 || r.height <= 1) continue;
    let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const s = getComputedStyle(e); if (s.visibility === 'hidden' || s.display === 'none') { o = 1; break; } o *= parseFloat(s.opacity); }
    if (o < 0.05) hidden.push(t.replace(/\s+/g, ' ').slice(0, 30));
  }
  return [...new Set(hidden)];
};
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
const focusSig = `(e) => { const g = (x) => { if (!x || x.nodeType !== 1) return ''; const s = getComputedStyle(x), b = getComputedStyle(x, '::before'), a = getComputedStyle(x, '::after'); return [s.outlineStyle, s.outlineWidth, s.outlineColor, s.boxShadow, s.borderColor, s.borderWidth, s.backgroundColor, s.textDecorationLine, s.color, b.boxShadow, b.outlineStyle, b.opacity, b.borderColor, a.boxShadow, a.outlineStyle, a.opacity, a.borderColor].join('|'); }; return g(e) + '||' + g(e.parentElement); }`;

async function focusCheck(b) {
  const total = await b.eval(`(() => { const sig = ${focusSig}; window.__ucf = new Map(); for (const e of document.querySelectorAll(${JSON.stringify(FOCUSABLE)})) { const r = e.getBoundingClientRect(); if (r.width > 1 && r.height > 1) window.__ucf.set(e, sig(e)); } window.scrollTo(0, 0); if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); return window.__ucf.size; })()`);
  if (!total) return { tested: 0, missing: [] };
  const missing = new Set(); let tested = 0; const seen = new Set();
  for (let i = 0; i < Math.min(total, 30); i++) {
    for (const type of ['rawKeyDown', 'keyUp']) await b.send('Input.dispatchKeyEvent', { type, key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
    await sleep(140);
    const res = JSON.parse(await b.eval(`(() => { const sig = ${focusSig}; const e = document.activeElement; if (!e || e === document.body || e === document.documentElement) return 'null'; const before = window.__ucf.get(e); const s = getComputedStyle(e); const ring = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0; const name = (e.getAttribute('aria-label') || e.textContent || e.getAttribute('placeholder') || e.getAttribute('name') || e.tagName).replace(/\\s+/g, ' ').trim().slice(0, 30) || e.tagName.toLowerCase(); if (!window.__ucn) window.__ucn = new WeakMap(); let id = window.__ucn.get(e); if (!id) { id = Math.random().toString(36).slice(2); window.__ucn.set(e, id); } return JSON.stringify({ id, name: e.tagName.toLowerCase() + ' "' + name + '"', ok: ring || (before !== undefined && before !== sig(e)), known: before !== undefined }); })()`));
    if (!res) continue;
    if (seen.has(res.id)) break; seen.add(res.id);
    if (!res.known) continue;
    tested++; if (!res.ok) missing.add(res.name);
  }
  return { tested, missing: [...missing] };
}

const usage = 'usage: node check.mjs <url-or-file> [more] [--widths 390,1440] [--out DIR] [--json] [--settle MS]';
async function main() {
  const args = process.argv.slice(2), targets = [], opt = { widths: [390, 1440], settle: 1500, json: false, out: null };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--json') opt.json = true;
    else if (a === '--widths') opt.widths = String(args[++i] || '').split(',').map(Number);
    else if (a === '--out') opt.out = args[++i];
    else if (a === '--settle') opt.settle = Number(args[++i]);
    else if (a.startsWith('--')) { console.error(`unknown option ${a}\n${usage}`); process.exit(2); }
    else targets.push(/^(https?|file):/.test(a) ? a : pathToFileURL(resolve(a)).href);
  }
  if (!targets.length || !opt.widths.length || !opt.widths.every((w) => Number.isInteger(w) && w >= 280 && w <= 3840) || !(opt.settle >= 0 && opt.settle <= 60000)) { console.error(usage); process.exit(2); }
  const out = opt.out ? resolve(opt.out) : mkdtempSync(join(tmpdir(), 'ui-craft-'));
  mkdirSync(out, { recursive: true });
  const b = await launch({ width: opt.widths[0], height: 900 });
  const results = []; let failed = false;
  try {
    await b.send('Log.enable');
    for (const [ti, url] of targets.entries()) {
      const page = { url, widths: {}, console: [] };
      const off = b.on((m) => {
        if (m.method === 'Runtime.exceptionThrown') page.console.push({ level: 'exception', text: (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text || '').split('\n')[0] });
        else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') page.console.push({ level: 'error', text: m.params.args.map((x) => x.value ?? x.description ?? '').join(' ').slice(0, 160) });
        else if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') page.console.push({ level: 'error', text: `${m.params.entry.text} ${m.params.entry.url || ''}`.slice(0, 160) });
      });
      const slug = `${targets.length > 1 ? String(ti + 1).padStart(2, '0') + '-' : ''}${(new URL(url).pathname.split('/').filter(Boolean).pop() || new URL(url).hostname || 'page').replace(/[^a-z0-9.-]+/gi, '-').replace(/\.html?$/, '')}`;
      for (const w of opt.widths) {
        const h = w < 600 ? 844 : 900;
        await b.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 });
        const err = await b.goto(url, opt.settle);
        if (err) { page.widths[w] = { error: err }; failed = true; continue; }
        await b.eval('document.fonts.ready.then(() => true)');
        const shots = { top: join(out, `${slug}-${w}-top.png`), full: join(out, `${slug}-${w}-full.png`) };
        await b.shot(shots.top);
        const res = await b.eval(`(${audit.toString()})(${w})`);
        // scroll the page the way a reader would, so scroll-triggered content shows in the full-page shot
        const height = await b.eval('Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)');
        for (let y = 0, n = 0; y < height && n < 30; y += Math.round(h * 0.8), n++) { await b.eval(`window.scrollTo(0, ${y})`); await sleep(120); }
        await b.eval('window.scrollTo(0, 0)'); await sleep(250);
        const hidden = await b.eval(`(${stillHidden.toString()})()`);
        if (hidden.length) res.fail.push({ id: 'never-visible', msg: 'text that stays invisible (opacity 0) after scrolling the whole page', count: hidden.length, samples: hidden.slice(0, 4) });
        const revealed = res.invisible.filter((t) => !hidden.includes(t.replace(/…$/, '').slice(0, 30)));
        if (revealed.length >= 4) res.tells.push({ id: 'entrance-everywhere', msg: `${revealed.length} text elements start invisible and animate in`, count: revealed.length, samples: revealed.slice(0, 3) });
        delete res.invisible;
        const full = await b.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: Math.min(height, 15000), scale: 1 } });
        writeFileSync(shots.full, Buffer.from(full.result.data, 'base64'));
        if (w === Math.max(...opt.widths)) {
          const f = await focusCheck(b);
          if (f.missing.length) res.fail.push({ id: 'focus-visible', msg: 'no visible focus style when reached by keyboard', count: f.missing.length, samples: f.missing.slice(0, 4) });
          res.inv.focusTested = f.tested;
        }
        page.widths[w] = { ...res, shots };
      }
      off();
      const exc = page.console.filter((c) => c.level === 'exception'), errs = page.console.filter((c) => c.level === 'error');
      page.extra = { fail: exc.length ? [{ id: 'js-exception', msg: 'JavaScript exceptions on load', count: exc.length, samples: [...new Set(exc.map((c) => c.text))].slice(0, 3) }] : [], warn: errs.length ? [{ id: 'console-error', msg: 'console errors', count: errs.length, samples: [...new Set(errs.map((c) => c.text))].slice(0, 3) }] : [] };
      results.push(page);
    }
  } finally { await b.close(); }

  // merge findings across widths so each is printed once, tagged with the widths it appeared at
  const merge = (page, list) => {
    const m = new Map();
    for (const [w, r] of Object.entries(page.widths)) for (const f of r[list] || []) {
      const cur = m.get(f.id) || { ...f, widths: [], samples: [] };
      cur.widths.push(w); cur.count = Math.max(cur.count, f.count); cur.msg = f.msg; cur.samples = [...new Set([...cur.samples, ...f.samples])].slice(0, 4); m.set(f.id, cur);
    }
    for (const f of page.extra[list] || []) m.set(f.id, { ...f, widths: [] });
    return [...m.values()];
  };
  for (const page of results) { page.fail = merge(page, 'fail'); page.warn = merge(page, 'warn'); page.tells = merge(page, 'tells'); if (page.fail.length) failed = true; }
  if (opt.json) { console.log(JSON.stringify({ out, pages: results }, null, 2)); process.exit(failed ? 1 : 0); }

  const allW = opt.widths.map(String);
  const line = (mark, f) => {
    const at = f.widths.length && f.widths.length < allW.length ? ` [${f.widths.join(', ')}px]` : '';
    const more = f.count > f.samples.length ? ` (+${f.count - f.samples.length} more)` : '';
    console.log(`  ${mark} ${f.msg}${at}${f.samples.length ? ': ' + f.samples.join('; ') + more : ''}`);
  };
  for (const page of results) {
    console.log(`\n━━ ${page.url}`);
    for (const [w, r] of Object.entries(page.widths)) console.log(r.error ? `  ${w}px: could not load (${r.error})` : `  ${w}px: ${r.shots.top}\n         ${r.shots.full}`);
    console.log(`\nFLOOR  ${page.fail.length} failing, ${page.warn.length} to check`);
    page.fail.forEach((f) => line('✗', f)); page.warn.forEach((f) => line('!', f));
    if (!page.fail.length && !page.warn.length) console.log('  nothing measurable is failing');
    console.log(`\nTELLS  ${page.tells.length} (look closer; keep only what the brief, the system or the subject earns)`);
    page.tells.forEach((f) => line('•', f));
    const widest = page.widths[Math.max(...opt.widths)], inv = widest && widest.inv;
    if (inv) {
      console.log('\nINVENTORY  (widest width)');
      console.log(`  fonts: ${inv.fonts.join('; ') || 'none'}`);
      console.log(`  sizes (${inv.sizes.length}): ${inv.sizes.join(' ')}   weights: ${inv.weights.join(' ')}`);
      console.log(`  page ${inv.page}   text colours (${inv.textColorCount}): ${inv.textColors.join(' ')}`);
      console.log(`  surfaces (${inv.surfaceCount}): ${inv.surfaces.join(' ')}   accents: ${inv.accents.join(' ') || 'none'}`);
      console.log(`  radii: ${inv.radii.join(' ') || 'none'}   shadows: ${inv.shadows}   boxes: ${inv.cards}   gradients: ${inv.gradients}   animated: ${inv.animated}`);
      const notes = [inv.sizes.length > 9 && `${inv.sizes.length} font sizes: is there a scale?`, inv.textColorCount > 8 && `${inv.textColorCount} text colours: are they roles?`, inv.radii.filter((r) => r !== 'pill').length > 4 && 'many radii: one family?', inv.shadows > 5 && `${inv.shadows} different shadows: an elevation scale?`, inv.textOverImage && `${inv.textOverImage} text elements sit on an image or gradient: check their contrast by eye`, inv.focusTested === 0 && 'keyboard focus could not be tested here: tab through it yourself'].filter(Boolean);
      notes.forEach((n) => console.log(`  note: ${n}`));
    }
  }
  console.log(`\nScreenshots: ${out}\nThis measures; it does not judge. Open the screenshots and operate the page.`);
  process.exit(failed ? 1 : 0);
}
if (isMain(import.meta.url)) main().catch((e) => { console.error(e.message); process.exit(2); });
