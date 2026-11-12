import { useState } from 'react';
import { LiquidMetal } from '@paper-design/shaders-react';
import ScrollVelocity from './reactbits/ScrollVelocity.jsx';
import PixelIcon from './PixelIcon.jsx';

const NAV = [
  ['home', 'home', '#home'],
  ['about', 'user', '#about'],
  ['work', 'star', '#experience'],
  ['projects', 'folder', '#projects'],
  ['papers', 'doc', '#papers'],
  ['contact', 'mail', '#contact']
];

export default function Header({ onSearch }) {
  const [q, setQ] = useState('');
  const submit = e => {
    e.preventDefault();
    onSearch(q.trim());
    const el = document.querySelector('#projects');
    window.__lenis ? window.__lenis.scrollTo(el, { offset: -10 }) : el.scrollIntoView();
  };
  return (
    <header className="site-header">
      <div className="ticker">
        <ScrollVelocity
          texts={['✦ NEW: software engineer @ natwest group  ✦  5 papers published  ✦  open to SWE + ML roles  ✦  top 9 / 700+ at infosys global hackathon  ✦  free hugs for recruiters  ']}
          velocity={30}
          numCopies={4}
          className="ticker-text"
        />
      </div>
      <div className="masthead">
        <a href="#home" className="brand" aria-label="trisha.exe home">
          <span className="brand-logo">
            <LiquidMetal width={58} height={58} image="/logo.svg" colorBack="#00000000" colorTint="#ffe3f1" repetition={4} softness={0.45} shiftRed={0.3} shiftBlue={0.3} distortion={0.1} contour={0.4} angle={70} speed={1} scale={0.9} fit="contain" />
          </span>
          <span className="brand-word">trisha<small>.exe</small></span>
        </a>
        <nav className="icon-nav" aria-label="Sections">
          {NAV.map(([label, icon, href]) => (
            <a key={label} href={href}>
              <PixelIcon name={icon} px={2.4} />
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <form className="search" onSubmit={submit} role="search">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="search my repos..." aria-label="Search projects" />
          <button type="submit" aria-label="Search">
            <svg viewBox="0 0 16 16" width="14" height="14"><circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="#fff" strokeWidth="2" /><path d="M10 10 L14 14" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" /></svg>
          </button>
          <span className="search-hand"><PixelIcon name="hand" px={2} /></span>
        </form>
      </div>
    </header>
  );
}
