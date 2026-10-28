// The prompt's spring: 14px, 45ms stagger, tension 220, friction 26.
export function rise(node, order = 0) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let disposed = false, frameId, timer;
  const rest = () => { node.style.transform = ''; node.style.opacity = '1'; node.style.willChange = ''; };
  function play() {
    clearTimeout(timer); cancelAnimationFrame(frameId);
    if (reduced) return rest();
    let x = 14, v = 0, last = null;
    node.style.opacity = '0';
    node.style.transform = 'translate3d(0,14px,0)';
    node.style.willChange = 'transform, opacity';
    function frame(now) {
      if (disposed) return;
      if (last === null) last = now;
      const dt = Math.min((now - last) / 1000, .064); last = now;
      const steps = Math.max(1, Math.ceil(dt / (1 / 240))), h = dt / steps;
      for (let i = 0; i < steps; i++) { v += (-220 * x - 26 * v) * h; x += v * h; }
      node.style.transform = `translate3d(0,${x.toFixed(3)}px,0)`;
      node.style.opacity = String(Math.max(0, Math.min(1, 1 - x / 14)));
      if (Math.abs(x) < .01 && Math.abs(v) < .01) return rest();
      frameId = requestAnimationFrame(frame);
    }
    timer = setTimeout(() => { if (!disposed) frameId = requestAnimationFrame(frame); }, order * 45);
  }
  function replay(event) {
    if ((event.key === 'r' || event.key === 'R') && !event.target.closest('input,textarea,select,[contenteditable]')) play();
  }
  play(); window.addEventListener('keydown', replay);
  return { destroy() { disposed = true; clearTimeout(timer); cancelAnimationFrame(frameId); window.removeEventListener('keydown', replay); } };
}
