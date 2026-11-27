/* mood-board-creator — the round page (standalone target). Marks the current round tab, and makes the phones
   behave like the Design Lab's: a wheel over a phone scrolls the PAGE (phone.js inside each screen sends it up —
   no scroll traps), dragging scrolls inside the phone, ⌥/Alt + wheel scrolls the phone natively. Messages are only
   accepted from this page's own frames. Works from file:// (postMessage crosses the file-origin boundary). */
(() => {
  const here = location.pathname.replace(/index\.html$/, '');
  for (const a of document.querySelectorAll('.mb-tabs a[href]')) {
    const target = new URL(a.getAttribute('href'), location.href).pathname.replace(/index\.html$/, '');
    if (target === here) a.setAttribute('aria-current', 'page');
  }

  const frames = () => [...document.querySelectorAll('iframe')];
  const LINE = 16;
  let pan = null;
  addEventListener('message', (e) => {
    const d = e.data;
    if (!d || typeof d.mb !== 'string' || !frames().some((f) => f.contentWindow === e.source)) return;
    if (d.mb === 'hello') e.source.postMessage({ mb: 'host' }, '*');
    else if (d.mb === 'wheel') {
      const unit = d.mode === 1 ? LINE : d.mode === 2 ? innerHeight : 1;
      scrollBy({ left: (+d.dx || 0) * unit, top: (+d.dy || 0) * unit, behavior: 'instant' });
    } else if (d.mb === 'pan') {
      if (d.phase === 'start') pan = { x: +d.sx, y: +d.sy };
      else if (d.phase === 'move' && pan) {
        scrollBy({ left: pan.x - +d.sx, top: pan.y - +d.sy, behavior: 'instant' });
        pan = { x: +d.sx, y: +d.sy };
      } else pan = null;
    }
  });
})();
