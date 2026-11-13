import { useEffect, useState } from 'react';
import Window from './Window.jsx';
import PixelIcon from './PixelIcon.jsx';

// Extra Y2K desktop furniture for the side gutters of the hero.

export function InfoDialog() {
  const [freed, setFreed] = useState(false);
  return (
    <Window title="Information" icon="computer" variant="dialog" className="extra-win info-win">
      <div className="info-body">
        <p>{freed ? 'Memory defragmented ♡' : 'Available Memory: 999 MB'}</p>
        <p className="info-small">{freed ? 'all bugs moved to Recycle Bin' : 'trisha.exe is using 1 MB'}</p>
        <button type="button" className="xp-btn" onClick={() => setFreed(f => !f)}>OK</button>
      </div>
    </Window>
  );
}

export function PixelLoader() {
  const [p, setP] = useState(12);
  useEffect(() => {
    const id = setInterval(() => setP(v => (v >= 100 ? 0 : v + 4)), 260);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="px-loader" aria-hidden="true">
      <div className="px-bar"><span style={{ width: `${p}%` }} /></div>
      <p>LOADING<span className="dots">...</span></p>
      <small>next_project.exe · {p}%</small>
    </div>
  );
}

export function Y2KStack() {
  return (
    <div className="y2k-stack" aria-hidden="true">
      <span /><span /><span />
      <b>Y2K</b>
    </div>
  );
}

// Each swatch is a real wallpaper palette: [main, highlight, accent] fed straight into
// the ShaderGradient, plus a matching base colour, so the wallpaper matches the swatch.
export const WALLPAPERS = [
  { n: 'bubblegum', colors: ['#ff9ccf', '#ffe4f2', '#c9b3ff'], base: '#ffd6ea' },
  { n: 'lavender', colors: ['#c9b3ff', '#efe6ff', '#ffb3da'], base: '#e6dcff' },
  { n: 'baby blue', colors: ['#9fd8ff', '#e6f5ff', '#c9b3ff'], base: '#d9efff' },
  { n: 'mint', colors: ['#9ff0d0', '#e9fff6', '#9fd8ff'], base: '#d8f8ec' },
  { n: 'peach', colors: ['#ffd39f', '#fff1e0', '#ffb3da'], base: '#ffe6cf' },
  { n: 'cherry', colors: ['#ff8a9e', '#ffe0e6', '#ffb3da'], base: '#ffd0d8' }
];
const TINTS = WALLPAPERS.map(w => ({ c: w.colors[0], n: w.n }));
export function ColorProps({ value = 0, onPick }) {
  const sel = value;
  const pick = (t, i) => onPick?.(i);
  return (
    <Window title="Color Properties" icon="sparkle" variant="dialog" className="extra-win color-win">
      <div className="color-tabs"><span className="on">General</span><span>Settings</span></div>
      <div className="color-body">
        <p>Wallpaper tint:</p>
        <div className="color-grid">
          {TINTS.map((t, i) => (
            <button key={t.n} type="button" title={t.n} aria-label={`Wallpaper ${t.n}`} className={sel === i ? 'on' : ''} style={{ background: t.c }} onClick={() => pick(t, i)} />
          ))}
        </div>
        <p className="color-name">{TINTS[sel].n}</p>
      </div>
    </Window>
  );
}

export function FlipPhone() {
  const lines = ['hire me?', 'ur cute ♡', 'call me', '1 new msg'];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % lines.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <svg className="flip-phone" width="92" height="170" viewBox="0 0 92 170" aria-hidden="true">
      <defs>
        <linearGradient id="fpg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd0e8" /><stop offset="0.5" stopColor="#ff8cc6" /><stop offset="1" stopColor="#e8489a" />
        </linearGradient>
      </defs>
      <rect x="6" y="4" width="80" height="80" rx="16" fill="url(#fpg)" stroke="#fff" strokeWidth="3" />
      <rect x="16" y="16" width="60" height="50" rx="6" fill="#ffe6f3" stroke="#c92c7e" strokeWidth="2" />
      <text x="46" y="46" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="11" fill="#8c1d5b">{lines[i]}</text>
      <rect x="10" y="84" width="72" height="8" rx="3" fill="#c92c7e" />
      <rect x="6" y="90" width="80" height="76" rx="16" fill="url(#fpg)" stroke="#fff" strokeWidth="3" />
      {[0, 1, 2].map(r => [0, 1, 2].map(c => (
        <rect key={`${r}${c}`} x={20 + c * 20} y={104 + r * 16} width="14" height="10" rx="4" fill="#fff" opacity="0.85" />
      )))}
      <circle cx="46" cy="156" r="5" fill="#fff" opacity="0.85" />
    </svg>
  );
}

const BIN_ITEMS = [
  ['bugs.exe', '0 KB'],
  ['imposter_syndrome.dll', '404 KB'],
  ['merge_conflicts.txt', '12 KB'],
  ['console.log(here).js', '1 KB'],
  ['final_final_v3.ipynb', '88 MB']
];
export function RecycleBin({ onClose }) {
  const [items, setItems] = useState(BIN_ITEMS);
  return (
    <Window title="Recycle Bin" icon="bin" onClose={onClose} className="bin-win"
      menu={['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help']}
      address="Recycle Bin" status={[`${items.length} object(s)`, items.length ? 'ready to empty' : 'squeaky clean ♡']}>
      <div className="bin-body">
        <aside className="bin-side">
          <button type="button" className="xp-btn" onClick={() => setItems([])} disabled={!items.length}>Empty Recycle Bin</button>
          <button type="button" className="xp-btn" onClick={() => setItems(BIN_ITEMS)}>Restore all items</button>
        </aside>
        <ul className="bin-list">
          {items.map(([n, s]) => (
            <li key={n}><PixelIcon name="doc" px={1.6} /><span>{n}</span><small>{s}</small></li>
          ))}
          {!items.length && <li className="bin-empty">This folder is empty.</li>}
        </ul>
      </div>
    </Window>
  );
}
