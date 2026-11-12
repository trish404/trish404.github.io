import { useEffect, useRef, useState } from 'react';
import Scene3D, { sceneState } from './Scene3D.jsx';

// A working mini Paint: draw behind a live R3F chrome heart.
const PALETTE = [
  '#000000', '#4a1236', '#8c1d5b', '#c2185b', '#e0408f', '#ff69b4', '#ff8cc6', '#ffb6d9', '#ffd9ec', '#ffffff',
  '#7b2cbf', '#b48cff', '#d9c4ff', '#4d7cff', '#9fc8ff', '#7ee8ff', '#3ccf91', '#ffd84d', '#ff9f4d', '#ff4d6d'
];

const TOOLS = [
  { id: 'pencil', label: 'Pencil', d: 'M3 13 L11 5 L13 7 L5 15 L2 16 Z M11 5 L12 4 L14 6 L13 7' },
  { id: 'brush', label: 'Brush', d: 'M4 16 C2 16 2 13 4 12 C5 11 7 12 7 13 C7 15 6 16 4 16 Z M7 12 L14 3 L15 4 L8 13' },
  { id: 'spray', label: 'Airbrush', d: 'M7 8 H12 V16 H7 Z M8 6 H11 V8 H8 Z M13 4 h1 v1 h-1 Z M15 6 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z' },
  { id: 'eraser', label: 'Eraser', d: 'M3 12 L9 6 L14 11 L10 15 H6 Z M9 6 L12 3 L17 8 L14 11' },
  { id: 'fill', label: 'Fill With Color', d: 'M4 9 L9 4 L15 10 L10 15 Z M15 10 C16 12 17 13 16 14 C15 15 14 13 15 10' },
  { id: 'heart', label: 'Heart Stamp', d: 'M9 15 C3 11 2 8 3 6 C4 4 7 4 9 7 C11 4 14 4 15 6 C16 8 15 11 9 15 Z' }
];

export default function PaintApp({ onCanvas }) {
  const wrapRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const drawRef = useRef(null);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#e0408f');
  const [pos, setPos] = useState('');
  const st = useRef({ down: false, x: 0, y: 0 });
  const toolRef = useRef(tool);
  const colorRef = useRef(color);
  toolRef.current = tool;
  colorRef.current = color;

  // size the drawing canvas + initial doodle
  useEffect(() => {
    const c = drawRef.current;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    const fit = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const snap = c.width ? ctx.getImageData(0, 0, c.width, c.height) : null;
      c.width = Math.max(1, Math.round(r.width * dpr));
      c.height = Math.max(1, Math.round(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, r.width, r.height);
      if (snap) ctx.putImageData(snap, 0, 0);
      else {
        ctx.font = '15px "Comic Sans MS", "Chalkboard SE", cursive';
        ctx.fillStyle = '#ffb6d9';
        ctx.fillText('draw on me ♡', 12, r.height - 14);
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  const pt = e => {
    const r = drawRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const stamp = (ctx, x, y) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1.4, 1.4);
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(-9, 0, -7, -8, 0, -3);
    ctx.bezierCurveTo(7, -8, 9, 0, 0, 6);
    ctx.fillStyle = colorRef.current;
    ctx.fill();
    ctx.restore();
  };

  const paint = (ctx, a, b) => {
    const t = toolRef.current;
    if (t === 'spray') {
      ctx.fillStyle = colorRef.current;
      for (let i = 0; i < 18; i++) {
        const ang = Math.random() * Math.PI * 2, rr = Math.random() * 11;
        ctx.fillRect(b.x + Math.cos(ang) * rr, b.y + Math.sin(ang) * rr, 1.2, 1.2);
      }
      return;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = t === 'eraser' ? '#fff' : colorRef.current;
    ctx.lineWidth = t === 'pencil' ? 2 : t === 'brush' ? 7 : 16;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  };

  const onDown = e => {
    if (sceneState.hoverHeart || sceneState.dragging) return; // grabbing the 3D heart, not drawing
    const ctx = drawRef.current.getContext('2d');
    const p = pt(e);
    const t = toolRef.current;
    if (t === 'fill') {
      const r = drawRef.current.getBoundingClientRect();
      ctx.fillStyle = colorRef.current;
      ctx.fillRect(0, 0, r.width, r.height);
      return;
    }
    if (t === 'heart') { stamp(ctx, p.x, p.y); return; }
    drawRef.current.setPointerCapture(e.pointerId);
    st.current = { down: true, ...p };
    paint(ctx, p, p);
  };
  const onMove = e => {
    const p = pt(e);
    setPos(`${Math.round(p.x)}, ${Math.round(p.y)}px`);
    if (canvasWrapRef.current) canvasWrapRef.current.dataset.grab = sceneState.hoverHeart || sceneState.dragging ? '1' : '';
    if (!st.current.down) return;
    paint(drawRef.current.getContext('2d'), st.current, p);
    st.current.x = p.x;
    st.current.y = p.y;
  };
  const onUp = () => (st.current.down = false);

  return (
    <div className="paint" ref={wrapRef}>
      <div className="paint-main">
        <div className="paint-tools" role="toolbar" aria-label="Paint tools">
          {TOOLS.map(t => (
            <button key={t.id} type="button" title={t.label} aria-label={t.label} aria-pressed={tool === t.id} className={tool === t.id ? 'on' : ''} onClick={() => setTool(t.id)}>
              <svg viewBox="0 0 18 18" width="16" height="16"><path d={t.d} fill={tool === t.id ? '#ff69b4' : '#fff'} stroke="#4a1236" strokeWidth="1.1" strokeLinejoin="round" /></svg>
            </button>
          ))}
          <div className="paint-tool-opts sunken" />
        </div>
        <div className="paint-canvas sunken" ref={canvasWrapRef}>
          <canvas
            ref={drawRef}
            className="paint-draw"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onPointerLeave={() => setPos('')}
          />
          <div className="paint-3d">
            <Scene3D onCanvas={onCanvas} eventSource={canvasWrapRef} />
          </div>
        </div>
      </div>
      <div className="paint-palette">
        <div className="paint-current sunken"><span style={{ background: color }} /><span /></div>
        <div className="paint-swatches">
          {PALETTE.map(c => (
            <button key={c} type="button" aria-label={`Color ${c}`} style={{ background: c }} className={c === color ? 'on' : ''} onClick={() => setColor(c)} />
          ))}
        </div>
      </div>
      <div className="win-status paint-status">
        <span>For Help, click Help Topics on the Help Menu.</span>
        <span>{pos}</span>
      </div>
    </div>
  );
}
