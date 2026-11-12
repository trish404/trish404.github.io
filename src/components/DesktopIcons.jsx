import { useState } from 'react';
import PixelIcon from './PixelIcon.jsx';

export const goTo = (href, offset = -10) => {
  const el = document.querySelector(href);
  if (!el) return;
  window.__lenis ? window.__lenis.scrollTo(el, { offset }) : el.scrollIntoView({ behavior: 'smooth' });
};

// single click selects + opens (double-click also works, like the real thing)
export default function DesktopIcons({ onOpenBin }) {
  const [sel, setSel] = useState(null);
  const ICONS = [
    { id: 'pc', label: 'My Computer', icon: 'computer', run: () => goTo('#about') },
    { id: 'proj', label: 'My Projects', icon: 'folder', run: () => goTo('#projects') },
    { id: 'skills', label: 'skills.bmp', icon: 'star', run: () => goTo('#skills') },
    { id: 'work', label: 'work_history', icon: 'doc', run: () => goTo('#experience') },
    { id: 'papers', label: 'papers.doc', icon: 'doc', run: () => goTo('#papers') },
    {
      id: 'mail', label: 'Outlook Express', icon: 'mail',
      run: () => { goTo('#contact'); setTimeout(() => document.querySelector('.oe-body')?.focus({ preventScroll: true }), 900); }
    },
    { id: 'bin', label: 'Recycle Bin', icon: 'bin', run: () => onOpenBin?.() }
  ];
  const open = ic => { setSel(ic.id); ic.run(); };
  return (
    <ul className="desk-icons" aria-label="Desktop shortcuts">
      {ICONS.map(ic => (
        <li key={ic.id}>
          <button type="button" className={`desk-icon ${sel === ic.id ? 'sel' : ''}`} onClick={() => open(ic)} title={`Open ${ic.label}`}>
            <PixelIcon name={ic.icon} px={3} />
            <span>{ic.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
