// Decorative Y2K stickers: chrome stars, CDs, butterflies, sparkles.
let uid = 0;

export function ChromeStar({ size = 64, points = 4, className = '', style }) {
  const id = `cs${uid++}`;
  const n = points * 2;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? 48 : points === 4 ? 13 : 22;
    return `${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`;
  }).join(' ');
  return (
    <svg className={`sticker ${className}`} style={style} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#ffc4e1" />
          <stop offset="0.5" stopColor="#d9c4ff" />
          <stop offset="0.62" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ff8cc6" />
        </linearGradient>
      </defs>
      <polygon points={pts} fill={`url(#${id})`} stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
      <polygon points={pts} fill="none" stroke="#e0408f" strokeWidth="1" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

export function CD({ size = 110, className = '', style, spinning = true }) {
  return (
    <div className={`cd ${spinning ? 'spin' : ''} ${className}`} style={{ width: size, height: size, ...style }} aria-hidden="true">
      <span className="cd-hole" />
    </div>
  );
}

export function Butterfly({ size = 56, className = '', style, hue = 'pink' }) {
  const id = `bf${uid++}`;
  const c = hue === 'blue' ? ['#d6ecff', '#7fb8ff'] : hue === 'lilac' ? ['#efe2ff', '#b48cff'] : ['#ffe0f0', '#ff69b4'];
  return (
    <svg className={`sticker butterfly ${className}`} style={style} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor={c[0]} />
          <stop offset="1" stopColor={c[1]} />
        </radialGradient>
      </defs>
      <g className="wing-l">
        <path d="M48 50 C 30 18, 6 14, 8 34 C 10 48, 28 52, 48 52 Z" fill={`url(#${id})`} stroke="#fff" strokeWidth="2.5" />
        <path d="M48 54 C 30 56, 14 66, 22 80 C 30 90, 44 72, 48 58 Z" fill={`url(#${id})`} stroke="#fff" strokeWidth="2.5" />
      </g>
      <g className="wing-r">
        <path d="M52 50 C 70 18, 94 14, 92 34 C 90 48, 72 52, 52 52 Z" fill={`url(#${id})`} stroke="#fff" strokeWidth="2.5" />
        <path d="M52 54 C 70 56, 86 66, 78 80 C 70 90, 56 72, 52 58 Z" fill={`url(#${id})`} stroke="#fff" strokeWidth="2.5" />
      </g>
      <rect x="47" y="40" width="6" height="34" rx="3" fill="#4a1236" />
      <path d="M49 40 Q 44 30 40 28 M51 40 Q 56 30 60 28" stroke="#4a1236" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function Twinkle({ size = 18, className = '', style }) {
  return (
    <svg className={`sticker twinkle ${className}`} style={style} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#fff" stroke="#ff8cc6" strokeWidth="0.8" />
    </svg>
  );
}

export function Checker({ className = '' }) {
  return <div className={`checker ${className}`} aria-hidden="true" />;
}
