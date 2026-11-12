import { useEffect } from 'react';

// tiny Y2K sparkle trail that follows the cursor (pointer: fine devices only)
export default function CursorTrail() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const glyphs = ['✦', '✧', '♡', '⋆', '★'];
    let last = 0;
    const onMove = e => {
      const now = performance.now();
      if (now - last < 45) return;
      last = now;
      const s = document.createElement('span');
      s.className = 'trail';
      s.textContent = glyphs[(Math.random() * glyphs.length) | 0];
      s.style.left = e.clientX + 'px';
      s.style.top = e.clientY + 'px';
      s.style.setProperty('--dx', (Math.random() - 0.5) * 40 + 'px');
      s.style.color = Math.random() > 0.5 ? '#ff4fa3' : '#ffb3d9';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return null;
}
