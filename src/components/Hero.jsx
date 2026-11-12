import { useEffect, useRef, useState } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { LiquidGlass } from '@ybouane/liquidglass';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sceneState } from './Scene3D.jsx';
import Window from './Window.jsx';
import PaintApp from './PaintApp.jsx';
import NowPlaying from './NowPlaying.jsx';
import DesktopIcons from './DesktopIcons.jsx';
import PixelIcon from './PixelIcon.jsx';
import { InfoDialog, PixelLoader, Y2KStack, ColorProps, FlipPhone, RecycleBin } from './DeskExtras.jsx';
import { ChromeStar, CD, Butterfly, Twinkle } from './Stickers.jsx';
import SplitText from './reactbits/SplitText.jsx';
import DecryptedText from './reactbits/DecryptedText.jsx';
import { profile, messages } from '../data.js';

gsap.registerPlugin(Draggable, InertiaPlugin);

export const HERO_WINDOWS = [
  { id: 'word', title: 'trisha.doc - Microsoft Word', icon: 'doc' },
  { id: 'paint', title: 'cute.bmp - Paint', icon: 'heart' },
  { id: 'msg', title: 'Message', icon: 'mail' },
  { id: 'player', title: 'now playing', icon: 'note' },
  { id: 'note', title: 'to-do.txt', icon: 'doc' },
  { id: 'bin', title: 'Recycle Bin', icon: 'bin' }
];

const FONTS = [
  ['Times New Roman', "'Times New Roman', Times, serif"],
  ['Arial', 'Arial, Helvetica, sans-serif'],
  ['Comic Sans MS', "'Comic Sans MS', 'Chalkboard SE', cursive"],
  ['Courier New', "'Courier New', Courier, monospace"],
  ['Georgia', 'Georgia, serif'],
  ['Verdana', 'Verdana, Geneva, sans-serif']
];
const SIZES = [10, 12, 14, 16, 18];

// draggable sticker: outer element is dragged (with momentum), inner element floats
function Drag({ className = '', children }) {
  return (
    <div className={`drag-sticker ${className}`}>
      <div className="float-inner">{children}</div>
    </div>
  );
}

/*
  Liquid glass: ybouane/liquidglass refracts the direct children of its root.
  The ShaderGradient wallpaper + the R3F canvas (inside Paint) are copied every
  frame into one 2D "mirror" canvas that is a root child, so the glass bubbles
  bend the live wallpaper.
*/
export default function Hero({ closed, setClosed }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const mirrorRef = useRef(null);
  const bgRef = useRef(null);
  const r3fCanvas = useRef(null);
  const deskRef = useRef(null);
  const [font, setFont] = useState(0);
  const [size, setSize] = useState(1);
  const [fmt, setFmt] = useState({ b: false, i: false, u: false });
  const [msgIdx, setMsgIdx] = useState(() => Math.floor(Math.random() * messages.length));
  const msg = messages[msgIdx];

  const close = id => setClosed(c => ({ ...c, [id]: true }));
  const open = id => setClosed(c => ({ ...c, [id]: false }));

  // mirror loop + liquid glass
  useEffect(() => {
    let lg, raf, alive = true;
    const mirror = mirrorRef.current;
    const ctx = mirror.getContext('2d');
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      mirror.width = Math.round(mirror.clientWidth * dpr);
      mirror.height = Math.round(mirror.clientHeight * dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const hr = sectionRef.current?.getBoundingClientRect();
      if (!hr || hr.bottom < 0 || document.body.classList.contains('has-max')) return;
      const bg = bgRef.current?.querySelector('canvas');
      const w = mirror.width, h = mirror.height, s = w / (mirror.clientWidth || 1);
      const mr = mirror.getBoundingClientRect();
      ctx.clearRect(0, 0, w, h);
      if (bg && bg.width) ctx.drawImage(bg, 0, 0, w, h);
      const rc = r3fCanvas.current;
      if (rc?.width) {
        const r = rc.getBoundingClientRect();
        if (r.width) ctx.drawImage(rc, (r.left - mr.left) * s, (r.top - mr.top) * s, r.width * s, r.height * s);
      }
      lg?.markChanged(mirror);
    };
    (async () => {
      try {
        lg = await LiquidGlass.init({
          root: stageRef.current,
          glassElements: stageRef.current.querySelectorAll('[data-glass]'),
          defaults: { cornerRadius: 60, zRadius: 60, bevelMode: 1, refraction: 1, chromAberration: 0.1, edgeHighlight: 0.2, specular: 0.4, blurAmount: 0.05, saturation: 0.3, shadowOpacity: 0.25, floating: true }
        });
        if (!alive) lg.destroy();
      } catch (e) {
        console.warn('liquid glass unavailable, using CSS fallback', e);
        stageRef.current?.classList.add('no-lg');
      }
    })();
    loop();
    return () => { alive = false; cancelAnimationFrame(raf); window.removeEventListener('resize', resize); lg?.destroy(); };
  }, []);

  // draggables + entrance + floating
  useEffect(() => {
    const mm = gsap.matchMedia();
    let z = 20;
    const front = el => (el.style.zIndex = ++z);
    mm.add('(min-width: 1000px)', () => {
      const wins = gsap.utils.toArray('.desk-item, .extra-item', sectionRef.current);
      const drags = wins.map(el =>
        Draggable.create(el, {
          trigger: el.querySelector('.win-bar') || el,
          bounds: sectionRef.current,
          edgeResistance: 0.85,
          zIndexBoost: false,
          cursor: 'inherit',
          activeCursor: 'inherit',
          onPress(e) {
            if (el.querySelector('.win.is-max')) { this.endDrag(e); return; }
            front(el);
          }
        })[0]
      );
      wins.forEach(el => el.addEventListener('pointerdown', () => front(el)));
      return () => drags.forEach(d => d.kill());
    });
    // stickers: draggable with momentum at every size
    const stickers = gsap.utils.toArray('.drag-sticker', sectionRef.current).map(el =>
      Draggable.create(el, { bounds: sectionRef.current, inertia: true, zIndexBoost: false, cursor: 'inherit', activeCursor: 'inherit', onPress() { front(el); } })[0]
    );
    const ctx = gsap.context(() => {
      gsap.from('.desk-item .win, .desk-item .sticky, .extra-item > *', { scale: 0.92, opacity: 0, y: 24, duration: 0.7, ease: 'back.out(1.5)', stagger: 0.07, delay: 0.15, clearProps: 'transform,opacity' });
      gsap.from('.desk-icons li', { opacity: 0, x: -16, stagger: 0.05, duration: 0.4, delay: 0.1, clearProps: 'transform,opacity' });
      gsap.utils.toArray('.float-inner').forEach((el, i) => {
        gsap.to(el, { y: i % 2 ? -14 : 12, rotate: i % 2 ? 8 : -8, duration: 2.6 + (i % 4) * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });
      gsap.utils.toArray('.hero .twinkle').forEach((el, i) => {
        gsap.fromTo(el, { scale: 0.4, opacity: 0.3 }, { scale: 1.1, opacity: 1, duration: 0.9 + (i % 3) * 0.3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.2 });
      });
    }, sectionRef);
    const st = ScrollTrigger.create({ trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true, onUpdate: s => (sceneState.scroll = s.progress) });
    return () => { mm.revert(); stickers.forEach(d => d.kill()); ctx.revert(); st.kill(); };
  }, []);

  const cls = id => `desk-item di-${id} ${closed[id] ? 'is-closed' : ''}`;
  const pageStyle = {
    '--doc-font': FONTS[font][1],
    '--doc-size': `${SIZES[size]}px`,
    '--doc-weight': fmt.b ? 700 : 400,
    '--doc-style': fmt.i ? 'italic' : 'normal',
    '--doc-deco': fmt.u ? 'underline' : 'none'
  };

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <div className="hero-bg" ref={bgRef} aria-hidden="true">
        <ShaderGradientCanvas style={{ position: 'absolute', inset: 0 }} pixelDensity={1} fov={45} pointerEvents="none" preserveDrawingBuffer lazyLoad={false}>
          <ShaderGradient control="props" type="plane" animate="on" uSpeed={0.2} uStrength={2.2} uDensity={1.3} uFrequency={5.5} uAmplitude={1}
            positionX={-1.4} positionY={0} positionZ={0} rotationX={0} rotationY={10} rotationZ={50}
            color1="#ff9ccf" color2="#ffe4f2" color3="#c9b3ff" reflection={0.1}
            cAzimuthAngle={180} cPolarAngle={90} cDistance={3.6} cameraZoom={1} lightType="3d" brightness={1.25} envPreset="city" grain="off" />
        </ShaderGradientCanvas>
      </div>
      <div className="hero-dots" aria-hidden="true" />

      <div className="hero-stage" ref={stageRef}>
        <canvas ref={mirrorRef} className="hero-mirror" aria-hidden="true" />
        <div className="glass-bubble gb1" data-glass><span>hire<br />me ♡</span></div>
        <div className="glass-bubble gb2" data-glass data-config={JSON.stringify({ cornerRadius: 42, zRadius: 42 })}><span>✦</span></div>
      </div>

      {/* side-gutter furniture (wide screens) */}
      <div className="hero-extras">
        <div className="extra-item ex-info"><InfoDialog /></div>
        <div className="extra-item ex-loader"><PixelLoader /></div>
        <div className="extra-item ex-y2k"><Y2KStack /></div>
        <div className="extra-item ex-color"><ColorProps /></div>
        <Drag className="ex-phone"><FlipPhone /></Drag>
        <Drag className="ex-cd2"><CD size={78} /></Drag>
        <Drag className="ex-star-a"><ChromeStar size={70} points={5} /></Drag>
        <Drag className="ex-star-b"><ChromeStar size={52} /></Drag>
        <Drag className="ex-bf"><Butterfly size={60} hue="lilac" /></Drag>
        <Drag className="ex-hearts"><PixelIcon name="heart" px={5} /><PixelIcon name="heart" px={3} /><PixelIcon name="sparkle" px={3} /></Drag>
      </div>

      <div className="desk" ref={deskRef}>
        <DesktopIcons onOpenBin={() => open('bin')} />

        <div className={cls('word')}>
          <Window title="trisha.doc - Microsoft Word" icon="doc" onClose={() => close('word')} className="word"
            menu={['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Table', 'Window', 'Help']}
            status={['Page 1', 'Sec 1', '1/1', 'At 1"', 'Ln 1   Col 1', 'ENG (IN)']}>
            <div className="word-toolbar">
              <span className="tb-select static" style={{ width: 64 }} aria-hidden="true">Normal</span>
              <label className="tb-select" style={{ width: 132 }}>
                <span className="sr">Font</span>
                <select value={font} onChange={e => setFont(+e.target.value)} aria-label="Font">
                  {FONTS.map(([n], i) => <option key={n} value={i}>{n}</option>)}
                </select>
              </label>
              <label className="tb-select" style={{ width: 44 }}>
                <span className="sr">Size</span>
                <select value={size} onChange={e => setSize(+e.target.value)} aria-label="Font size">
                  {SIZES.map((s, i) => <option key={s} value={i}>{s}</option>)}
                </select>
              </label>
              <span className="tb-sep" />
              <button type="button" className={`tb-btn ${fmt.b ? 'on' : ''}`} aria-pressed={fmt.b} onClick={() => setFmt(f => ({ ...f, b: !f.b }))} title="Bold"><b>B</b></button>
              <button type="button" className={`tb-btn ${fmt.i ? 'on' : ''}`} aria-pressed={fmt.i} onClick={() => setFmt(f => ({ ...f, i: !f.i }))} title="Italic"><i>I</i></button>
              <button type="button" className={`tb-btn ${fmt.u ? 'on' : ''}`} aria-pressed={fmt.u} onClick={() => setFmt(f => ({ ...f, u: !f.u }))} title="Underline"><u>U</u></button>
              <span className="tb-sep" />
              <span className="tb-btn tb-align" aria-hidden="true" /><span className="tb-btn tb-align c" aria-hidden="true" /><span className="tb-btn tb-align r" aria-hidden="true" />
              <span className="tb-zoom" aria-hidden="true">100%</span>
            </div>
            <div className="word-ruler" aria-hidden="true"><span /></div>
            <div className="word-page" style={pageStyle}>
              <p className="hi-line">hi! my name is</p>
              <h1 className="bubble-title">
                <SplitText text="trisha" tag="span" className="bubble-split" splitType="chars" delay={45} duration={0.8} trigger="load" effect="rise" textAlign="left" />
              </h1>
              <p className="surname">{profile.name.split(' ')[1].toLowerCase()} <Twinkle size={16} /></p>
              <p className="role-line">Software Engineer · ML Researcher</p>
              <p className="word-copy">{profile.tagline} I'm based in Bengaluru and open to SWE + ML roles.</p>
              <div className="cta-row">
                <a href="#projects" className="aqua-btn">see my work →</a>
                <a href="#about" className="xp-btn big">about me</a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="xp-btn big"><PixelIcon name="computer" px={1.5} />GitHub</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="xp-btn big"><PixelIcon name="globe" px={1.5} />LinkedIn</a>
              </div>
            </div>
          </Window>
        </div>

        <div className={cls('paint')}>
          <Window title="cute.bmp - Paint" icon="heart" onClose={() => close('paint')} className="paint-win" menu={['File', 'Edit', 'View', 'Image', 'Colors', 'Help']}>
            <PaintApp onCanvas={c => (r3fCanvas.current = c)} />
          </Window>
        </div>

        <div className={cls('msg')}>
          <Window title={msg.title} icon="mail" onClose={() => close('msg')} className="msgbox" variant="dialog">
            <div className="msg-body">
              <PixelIcon name={msg.icon} px={5} />
              <p key={msgIdx}>
                <DecryptedText text={msg.text} animateOn="view" sequential speed={22} characters="♡✦01" />
              </p>
            </div>
            <div className="msg-actions">
              <button type="button" className="xp-btn" onClick={() => close('msg')}>ok</button>
              <button type="button" className="xp-btn" onClick={() => setMsgIdx(i => (i + 1) % messages.length)}>another one ↻</button>
            </div>
          </Window>
        </div>

        <div className={cls('player')}>
          <Window title="now playing - ship_it.m3u" icon="note" onClose={() => close('player')} className="player-win" variant="dialog">
            <NowPlaying />
          </Window>
        </div>

        <div className={cls('note')}>
          <div className="sticky">
            <span className="tape" />
            <button type="button" className="sticky-x" aria-label="Close note" onClick={() => close('note')}>×</button>
            <p className="sticky-h">to do ♡</p>
            <ul>
              <li className="done">ship camel routes</li>
              <li className="done">publish 5 papers</li>
              <li className="done">drink water</li>
              <li>get hired by you</li>
            </ul>
          </div>
        </div>

        <div className={cls('bin')}>
          <RecycleBin onClose={() => close('bin')} />
        </div>

        <Drag className="st1"><ChromeStar size={86} /></Drag>
        <Drag className="st2"><ChromeStar size={46} points={5} /></Drag>
        <Drag className="st3"><ChromeStar size={58} /></Drag>
        <Drag className="st4"><CD size={96} /></Drag>
        <Drag className="st5"><Butterfly size={64} /></Drag>
        <Drag className="st6"><Butterfly size={46} hue="blue" /></Drag>
        <Twinkle size={22} className="tw1" /><Twinkle size={14} className="tw2" /><Twinkle size={18} className="tw3" /><Twinkle size={12} className="tw4" /><Twinkle size={20} className="tw5" />
      </div>
    </section>
  );
}
