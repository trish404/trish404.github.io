import { useEffect, useRef, useState } from 'react';
import PixelIcon from './PixelIcon.jsx';
import { HERO_WINDOWS } from './Hero.jsx';
import { profile } from '../data.js';

const go = href => {
  const el = document.querySelector(href);
  if (!el) return;
  window.__lenis ? window.__lenis.scrollTo(el, { offset: -10 }) : el.scrollIntoView({ behavior: 'smooth' });
};

export default function Taskbar({ closed, setClosed }) {
  const [open, setOpen] = useState(false);
  const [off, setOff] = useState(false);
  const [time, setTime] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = e => { if (!menuRef.current?.contains(e.target) && !e.target.closest('.start-btn')) setOpen(false); };
    const onKey = e => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const restore = id => {
    setClosed(c => ({ ...c, [id]: false }));
    go('#home');
  };
  const pick = href => { setOpen(false); go(href); };

  return (
    <>
      <div className="taskbar" role="navigation" aria-label="Taskbar">
        <button type="button" className={`start-btn ${open ? 'on' : ''}`} onClick={() => setOpen(o => !o)} aria-expanded={open} aria-haspopup="menu">
          <PixelIcon name="heart" px={2} /> <span>start</span>
        </button>
        <div className="tb-quick" aria-hidden="true"><PixelIcon name="globe" px={1.6} /><PixelIcon name="mail" px={1.6} /><PixelIcon name="folder" px={1.6} /></div>
        <div className="tb-tasks">
          {HERO_WINDOWS.map(w => (
            <button key={w.id} type="button" className={`tb-task ${closed[w.id] ? 'min' : ''}`} onClick={() => (closed[w.id] ? restore(w.id) : go('#home'))} title={closed[w.id] ? `Restore ${w.title}` : w.title}>
              <PixelIcon name={w.icon} px={1.4} /><span>{w.title}</span>
            </button>
          ))}
        </div>
        <div className="tb-tray">
          <span className="tray-ico" title="Volume"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 6 H5 L9 2 V14 L5 10 H2 Z" fill="#fff" stroke="#4a1236" strokeWidth="1"/><path d="M11 5 Q13 8 11 11 M12.5 3.5 Q16 8 12.5 12.5" stroke="#fff" strokeWidth="1.3" fill="none"/></svg></span>
          <span className="tray-ico" title="Connected at 56 kbps"><PixelIcon name="computer" px={1.3} /></span>
          <span className="tray-clock" title="Bengaluru time">{time}</span>
        </div>
      </div>

      {open && (
        <div className="start-menu" ref={menuRef} role="menu">
          <div className="sm-head">
            <span className="sm-avatar"><PixelIcon name="user" px={4} /></span>
            <b>{profile.short}</b>
          </div>
          <div className="sm-cols">
            <ul className="sm-left">
              <li><button role="menuitem" onClick={() => pick('#projects')}><PixelIcon name="folder" px={2.5} /><span><b>My Projects</b><small>24 repos</small></span></button></li>
              <li><button role="menuitem" onClick={() => pick('#experience')}><PixelIcon name="star" px={2.5} /><span><b>Work History</b><small>NatWest, Rubixe, Gabify</small></span></button></li>
              <li><button role="menuitem" onClick={() => pick('#papers')}><PixelIcon name="doc" px={2.5} /><span><b>Publications</b><small>5 papers</small></span></button></li>
              <li className="sm-sep" />
              <li><button role="menuitem" onClick={() => pick('#about')}><PixelIcon name="user" px={2.5} /><span>About Me</span></button></li>
              <li><button role="menuitem" onClick={() => pick('#contact')}><PixelIcon name="mail" px={2.5} /><span>Outlook Express</span></button></li>
            </ul>
            <ul className="sm-right">
              <li><a role="menuitem" href={profile.github} target="_blank" rel="noreferrer"><PixelIcon name="computer" px={2} />GitHub</a></li>
              <li><a role="menuitem" href={profile.linkedin} target="_blank" rel="noreferrer"><PixelIcon name="globe" px={2} />LinkedIn</a></li>
              <li><a role="menuitem" href={`mailto:${profile.email}`}><PixelIcon name="mail" px={2} />E-mail</a></li>
              <li className="sm-sep" />
              <li><button role="menuitem" onClick={() => { setClosed({}); pick('#home'); }}><PixelIcon name="sparkle" px={2} />Restore Windows</button></li>
            </ul>
          </div>
          <div className="sm-foot">
            <button type="button" onClick={() => { setOpen(false); setOff(true); }}><span className="pwr">⏻</span> Turn Off Computer</button>
          </div>
        </div>
      )}

      {off && (
        <button type="button" className="shutdown" onClick={() => setOff(false)}>
          <span>It's now safe to turn off<br />your computer.</span>
          <small>(just kidding, click anywhere to come back ♡)</small>
        </button>
      )}
    </>
  );
}
