import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Window from './Window.jsx';
import PixelIcon from './PixelIcon.jsx';
import { ChromeStar, Butterfly, Checker } from './Stickers.jsx';
import { experience } from '../data.js';

// Pinned horizontal scroll (desktop) of Explorer-style windows.
export default function Experience() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current;
      const dist = () => track.scrollWidth - window.innerWidth + 60;
      const tween = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true }
      });
      gsap.utils.toArray('.xp-card').forEach(card => {
        gsap.from(card.querySelectorAll('.xp-points li'), { x: 30, opacity: 0, stagger: 0.07, duration: 0.5, scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 85%' } });
      });
    });
    mm.add('(max-width: 899px)', () => {
      gsap.utils.toArray('.xp-card').forEach(c => gsap.from(c, { y: 50, opacity: 0, duration: 0.7, scrollTrigger: { trigger: c, start: 'top 88%' } }));
    });
    return () => mm.revert();
  }, []);

  const icons = ['computer', 'smiley', 'note'];

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <Checker className="top" />
      <div className="xp-track" ref={trackRef}>
        <div className="xp-intro">
          <h2 className="bubble-heading">work<br />history</h2>
          <p className="xp-intro-sub">3 places that trusted me with production ♡</p>
          <p className="pixel-label blink">keep scrolling →</p>
          <ChromeStar size={64} className="xp-star" />
          <Butterfly size={54} className="xp-bf" hue="lilac" />
        </div>
        {experience.map((x, i) => (
          <Window
            key={x.co}
            title={`${x.co} - Career Explorer`}
            icon="folder"
            className="xp-card"
            style={{ '--accent': x.color }}
            menu={['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help']}
            address={`C:\\Career\\${x.when.slice(-4)}\\${x.co}`}
            status={[`${x.points.length} objects`, x.where, x.when]}
          >
            <div className="xp-inner">
              <aside className="xp-side">
                <div className="xp-side-card">
                  <PixelIcon name={icons[i]} px={4} />
                  <b>{x.co}</b>
                  <span>{x.role}</span>
                </div>
                <div className="xp-side-panel">
                  <p className="xp-side-h">Details</p>
                  <p><small>Date</small>{x.when}</p>
                  <p><small>Location</small>{x.where}</p>
                </div>
              </aside>
              <div className="xp-main">
                <ul className="xp-points">{x.points.map(p => <li key={p}>{p}</li>)}</ul>
                <div className="chips">{x.tags.map(t => <span key={t}>{t}</span>)}</div>
              </div>
            </div>
          </Window>
        ))}
      </div>
      <Checker className="bottom" />
    </section>
  );
}
