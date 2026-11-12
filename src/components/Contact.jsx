import { useState } from 'react';
import ScrollVelocity from './reactbits/ScrollVelocity.jsx';
import Window from './Window.jsx';
import PixelIcon from './PixelIcon.jsx';
import { ChromeStar, Checker } from './Stickers.jsx';
import { profile } from '../data.js';

export default function Contact() {
  const [subject, setSubject] = useState('hi trisha! ♡');
  const [body, setBody] = useState('');
  const [leave, setLeave] = useState(true);

  const send = e => {
    e.preventDefault();
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="contact">
      <div className="sec-head center">
        <h2 className="bubble-heading">say hi!</h2>
        <p className="sec-sub">open to SWE & ML roles · replies faster than dial-up</p>
      </div>

      <div className="contact-stage">
        <Window title="New Message" icon="mail" className="oe-win" menu={['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Message', 'Help']}>
          <form onSubmit={send}>
            <div className="oe-toolbar">
              <button type="submit" className="oe-tool"><PixelIcon name="mail" px={2.4} /><span>Send</span></button>
              <span className="oe-tool dim"><PixelIcon name="doc" px={2} /><span>Copy</span></span>
              <span className="oe-tool dim"><PixelIcon name="folder" px={2} /><span>Attach</span></span>
              <a className="oe-tool" href={profile.linkedin} target="_blank" rel="noreferrer"><PixelIcon name="globe" px={2} /><span>LinkedIn</span></a>
              <a className="oe-tool" href={profile.github} target="_blank" rel="noreferrer"><PixelIcon name="computer" px={2} /><span>GitHub</span></a>
            </div>
            <div className="oe-fields">
              <label><span>To:</span><input value={`${profile.name} <${profile.email}>`} readOnly /></label>
              <label><span>Subject:</span><input value={subject} onChange={e => setSubject(e.target.value)} /></label>
            </div>
            <textarea className="oe-body" value={body} onChange={e => setBody(e.target.value)} placeholder="type your message here... (it opens in your email app)" rows={7} />
          </form>
        </Window>

        {leave && (
          <Window title="Error" icon="sparkle" variant="dialog" className="err-win" onClose={() => setLeave(false)}>
            <div className="err-body">
              <span className="err-ico">!</span>
              <p>Are you sure you want to leave without saying hi?</p>
            </div>
            <div className="msg-actions">
              <a href="#contact" className="xp-btn" onClick={() => document.querySelector('.oe-body')?.focus()}>Say hi</a>
              <button type="button" className="xp-btn" onClick={() => setLeave(false)}>Cancel</button>
            </div>
          </Window>
        )}
        <ChromeStar size={80} className="ct-star" />
      </div>

      <footer className="footer">
        <Checker />
        <div className="foot-marquee">
          <ScrollVelocity texts={['✦ thanks 4 visiting ✦ new commit every friday ✦ best viewed at 1024×768 ✦ open to SWE + ML roles ']} velocity={25} numCopies={4} className="foot-marquee-text" />
        </div>
        <div className="foot-cols">
          <div className="foot-brand">
            <span className="brand-word sm">trisha<small>.exe</small></span>
            <p>© {new Date().getFullYear()} {profile.name}. Made with r3f, gsap, lenis, vanta, shadergradient, liquid glass, paper shaders & react-bits.</p>
          </div>
          <div>
            <p className="foot-h">navigate</p>
            <a href="#about">about</a><a href="#experience">work</a><a href="#projects">projects</a><a href="#papers">papers</a>
          </div>
          <div>
            <p className="foot-h">elsewhere</p>
            <a href={profile.github} target="_blank" rel="noreferrer">github</a><a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin</a><a href={`mailto:${profile.email}`}>email</a>
          </div>
          <div className="foot-badges">
            <span className="counter">visitors <b>000404</b></span>
            <span className="badge88">best viewed<br />in any browser</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
