import { useEffect, useRef } from 'react';
import * as THREE from 'three-vanta';
import NET from 'vanta/dist/vanta.net.min';
import { gsap } from 'gsap';
import Window from './Window.jsx';
import PixelIcon from './PixelIcon.jsx';
import { Butterfly, ChromeStar } from './Stickers.jsx';
import { publications, profile } from '../data.js';

const scholarUrl = t => profile.scholar || `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${t}"`)}`;

/*
  Vanta NET wallpaper. Hovering steers the camera (Vanta's mouseControls);
  press + drag grabs the constellation and spins it, and it keeps spinning
  with momentum after release.
*/
export default function Papers() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    let effect, raf;
    const spin = { on: false, x: 0, y: 0, vx: 0, vy: 0, lx: 0, ly: 0 };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const g = effect?.cont;
      if (!g) return;
      g.rotation.y += spin.vy;
      g.rotation.x = THREE.MathUtils.clamp(g.rotation.x + spin.vx, -1.2, 1.2);
      if (!spin.on) { spin.vy *= 0.96; spin.vx *= 0.94; spin.vy += 0.0004 * Math.sign(spin.vy || 1) * (Math.abs(spin.vy) < 0.0015 ? 1 : 0); }
    };
    const down = e => {
      if (e.target.closest('.win, a, button')) return;
      spin.on = true; spin.lx = e.clientX; spin.ly = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.classList.add('grabbing');
    };
    const move = e => {
      if (!spin.on) return;
      spin.vy = (e.clientX - spin.lx) * 0.004;
      spin.vx = (e.clientY - spin.ly) * 0.003;
      spin.lx = e.clientX; spin.ly = e.clientY;
    };
    const up = e => { spin.on = false; el.releasePointerCapture?.(e.pointerId); el.classList.remove('grabbing'); };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !effect) {
        effect = NET({
          el, THREE, mouseControls: true, touchControls: false, gyroControls: false,
          minHeight: 200, minWidth: 200, scale: 1, scaleMobile: 1,
          color: 0xff5fae, backgroundColor: 0xffeaf5, points: 10, maxDistance: 21, spacing: 18, showDots: true
        });
        tick();
      }
    }, { rootMargin: '300px' });
    io.observe(el);
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);

    const ctx = gsap.context(() => {
      gsap.from('.paper-doc', { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 70%' } });
      gsap.from('.pub li', { opacity: 0, x: -20, stagger: 0.1, duration: 0.5, clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 60%' } });
    }, el);
    return () => {
      io.disconnect(); cancelAnimationFrame(raf); effect?.destroy(); ctx.revert();
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
    };
  }, []);

  return (
    <section id="papers" className="papers" ref={ref}>
      <div className="papers-inner">
        <div className="sec-head">
          <h2 className="bubble-heading">publications</h2>
          <p className="sec-sub">ML for health, cities & compilers · drag the background to spin the network</p>
        </div>
        <Window title="publications.doc - Microsoft Word" icon="doc" className="paper-doc"
          menu={['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Help']}
          status={['Page 1', `${publications.length} items`, 'Ln 5   Col 1', 'ENG (IN)']}>
          <div className="word-ruler" aria-hidden="true"><span /></div>
          <div className="doc-page">
            <p className="doc-title">Selected Publications</p>
            <p className="doc-by">Trisha Vijayekkumaran</p>
            <ol className="pub">
              {publications.map(p => (
                <li key={p.t}>
                  <a className="pub-t" href={scholarUrl(p.t)} target="_blank" rel="noreferrer">“{p.t}”</a>
                  <span className="pub-v">{p.v}</span>
                </li>
              ))}
            </ol>
            <div className="doc-actions">
              <a className="aqua-btn" href={profile.scholar || 'https://scholar.google.com/'} target="_blank" rel="noreferrer">
                {profile.scholar ? 'view on Google Scholar ↗' : 'Google Scholar ↗'}
              </a>
            </div>
          </div>
        </Window>
        <div className="pap-bf"><Butterfly size={70} /></div>
        <div className="pap-star"><ChromeStar size={60} /></div>
      </div>
      <span className="grab-hint pixel-label"><PixelIcon name="hand" px={2} /> drag me</span>
    </section>
  );
}
