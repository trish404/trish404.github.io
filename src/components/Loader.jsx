import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STEPS = ['booting trisha.exe', 'polishing pixels', 'warming up neural nets', 'chroming the hearts', 'almost there ♡'];
const MIN_MS = 1800;

// Pixel boot screen: waits for fonts + page load (and a short minimum), then fades away.
export default function Loader() {
  const [p, setP] = useState(0);
  const [gone, setGone] = useState(false);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    document.body.classList.add('is-loading');
    window.__lenis?.stop();
    const t0 = performance.now();
    let ready = false, raf;
    const loaded = new Promise(r => (document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })));
    Promise.all([loaded, document.fonts?.ready]).then(() => (ready = true));
    const safety = setTimeout(() => (ready = true), 3500);

    const finish = () => {
      if (done.current) return;
      done.current = true;
      gsap.timeline({
        onComplete: () => {
          document.body.classList.remove('is-loading');
          window.__lenis?.start();
          setGone(true);
          ScrollTrigger.refresh();
        }
      })
        .to('.ld-inner', { scale: 0.96, opacity: 0, duration: 0.35, ease: 'power2.in' })
        .to(ref.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'power3.inOut' }, '-=0.05');
    };
    let cur = 0;
    const tick = () => {
      const t = performance.now() - t0;
      const cap = ready ? 100 : 88;
      const target = Math.min(cap, (t / MIN_MS) * 100);
      cur = Math.min(cap, Math.max(cur, cur + (target - cur) * 0.12 + 0.3));
      setP(Math.round(cur));
      if (ready && t >= MIN_MS && cur >= 100) { finish(); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.__skipLoader = finish;
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); };
  }, []);

  if (gone) return null;
  const step = STEPS[Math.min(STEPS.length - 1, Math.floor((p / 100) * STEPS.length))];
  const blocks = 24;
  const filled = Math.round((p / 100) * blocks);

  return (
    <div className="loader" ref={ref} data-p={p} onClick={() => window.__skipLoader?.()} role="progressbar" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100} aria-label="Loading">
      <div className="ld-inner">
        <p className="ld-brand">trisha<small>.exe</small></p>
        <div className="ld-bar">
          {Array.from({ length: blocks }, (_, i) => (
            <i key={i} className={i < filled ? `on s${Math.min(3, Math.floor((i / blocks) * 4))}` : ''} />
          ))}
        </div>
        <p className="ld-text">LOADING<span className="ld-dots"><b>.</b><b>.</b><b>.</b></span></p>
        <p className="ld-step">C:\&gt; {step} <span className="ld-pct">{p}%</span></p>
        <p className="ld-skip">click anywhere to skip</p>
      </div>
    </div>
  );
}
