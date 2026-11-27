/* mood-board-creator — included by every screen (standalone target), last in <body>.
   1. Drag to scroll: a desktop mouse has no touch, so any scrollable area in the screen can be grabbed and dragged,
      the way a finger would move it. A drag never also clicks.
   2. Inside a round page: a wheel over the screen scrolls the round page instead (no scroll traps while reading
      the round); ⌥/Alt + wheel scrolls the screen itself. Pinch / Ctrl + wheel is left to the browser.
   Opened on its own, the screen scrolls normally with the wheel. */
(() => {
  const framed = window.parent !== window;
  let hosted = false;
  if (framed) {
    addEventListener('message', (e) => {
      if (e.source === window.parent && e.data && e.data.mb === 'host') hosted = true;
    });
    window.parent.postMessage({ mb: 'hello' }, '*');
    addEventListener(
      'wheel',
      (e) => {
        if (!hosted || e.altKey || e.ctrlKey || e.metaKey) return;
        e.preventDefault();
        window.parent.postMessage({ mb: 'wheel', dx: e.deltaX, dy: e.deltaY, mode: e.deltaMode }, '*');
      },
      { passive: false },
    );
  }

  const scrollable = (el, axis) => {
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const s = getComputedStyle(n);
      const o = axis === 'y' ? s.overflowY : s.overflowX;
      if (/(auto|scroll)/.test(o) && (axis === 'y' ? n.scrollHeight > n.clientHeight : n.scrollWidth > n.clientWidth)) return n;
    }
    return null;
  };
  let drag = null;
  document.addEventListener('dragstart', (e) => e.preventDefault());
  document.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch' || e.button !== 0 || e.target.closest('input, textarea, select')) return;
    const x = scrollable(e.target, 'x');
    const y = scrollable(e.target, 'y');
    if (x || y) drag = { x, y, sx: e.clientX, sy: e.clientY, moved: false, lx: e.clientX, ly: e.clientY };
  });
  document.addEventListener('pointermove', (e) => {
    if (!drag) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 4) return;
    drag.moved = true;
    if (drag.x) drag.x.scrollLeft -= e.clientX - drag.lx;
    if (drag.y) drag.y.scrollTop -= e.clientY - drag.ly;
    drag.lx = e.clientX;
    drag.ly = e.clientY;
  });
  document.addEventListener('pointerup', () => {
    if (drag && drag.moved) addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); }, { capture: true, once: true });
    drag = null;
  });
  const style = document.createElement('style');
  style.textContent = '*{-webkit-user-select:none;user-select:none}input,textarea{-webkit-user-select:text;user-select:text}';
  document.head.append(style);
})();
