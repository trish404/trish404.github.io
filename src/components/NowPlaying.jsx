import { useEffect, useState } from 'react';
import PixelIcon from './PixelIcon.jsx';
import { CD } from './Stickers.jsx';

const TRACKS = [
  { t: 'debugging at 2am', a: 'stack trace', len: 214 },
  { t: 'merge conflict (acoustic)', a: 'git & the rebases', len: 187 },
  { t: 'gradient descent (slowed)', a: 'loss.fn', len: 242 },
  { t: 'camel route remix', a: 'ibm mq', len: 199 }
];
const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function NowPlaying() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [sec, setSec] = useState(37);
  const tr = TRACKS[i];

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setSec(s => (s + 1 >= tr.len ? (setI(n => (n + 1) % TRACKS.length), 0) : s + 1)), 1000);
    return () => clearInterval(id);
  }, [playing, tr.len]);

  const skip = d => { setI(n => (n + d + TRACKS.length) % TRACKS.length); setSec(0); };
  const pct = (sec / tr.len) * 100;
  const blocks = 20;
  const filled = Math.round((pct / 100) * blocks);

  return (
    <div className="np">
      <div className="np-lcd">
        <div className="np-top">
          <span className="np-signal"><i /><i /><i /><i /></span>
          <PixelIcon name="heart" px={2} />
          <span className="np-batt"><i /></span>
        </div>
        <p className="np-label">♫ NOW PLAYING ♫</p>
        <p className="np-title">{tr.t}</p>
        <p className="np-artist">{tr.a}</p>
        <div className="np-bar" aria-hidden="true">
          {Array.from({ length: blocks }, (_, k) => <i key={k} className={k < filled ? 'on' : ''} />)}
        </div>
        <div className="np-time"><span>{fmt(sec)}</span><span className={`np-eq ${playing ? 'go' : ''}`}><i /><i /><i /><i /><i /></span><span>{fmt(tr.len)}</span></div>
      </div>
      <div className="np-side">
        <CD size={92} spinning={playing} />
        <div className="np-btns">
          <button type="button" className="xp-btn" aria-label="Previous" onClick={() => skip(-1)}>◀◀</button>
          <button type="button" className="xp-btn" aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying(p => !p)}>{playing ? '❚❚' : '▶'}</button>
          <button type="button" className="xp-btn" aria-label="Next" onClick={() => skip(1)}>▶▶</button>
        </div>
        <p className="np-pl">playlist: <b>ship it</b></p>
      </div>
    </div>
  );
}
