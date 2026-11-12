import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import PixelIcon from './PixelIcon.jsx';

/*
  Pink Windows-XP style window.
  menu    – menubar labels      status  – status-bar panels      address – explorer address bar
  onMin / onClose – hero windows send themselves to the taskbar; other windows "roll up".
  Maximize (□ or double-click the title bar) fills the screen above everything but the taskbar.
  position:fixed breaks inside transformed ancestors (draggables, pinned scroll tracks), so while
  maximized we neutralise those ancestors' transforms/filters and restore them exactly afterwards.
*/

const Window = forwardRef(function Window(
  { title, icon = 'doc', children, className = '', menu, status, address, onClose, onMin, variant = 'xp', bodyClass = '', ...rest },
  ref
) {
  const winRef = useRef(null);
  const saved = useRef([]);
  const [max, setMax] = useState(false);
  const [rolled, setRolled] = useState(false);
  useImperativeHandle(ref, () => winRef.current);

  const toggleMax = useCallback(() => { setRolled(false); setMax(m => !m); }, []);

  useLayoutEffect(() => {
    if (!max) return;
    // .max-host (CSS, !important) beats the inline transforms GSAP keeps re-applying
    // to pinned sections / draggables, so the fixed window escapes every ancestor.
    const list = [];
    for (let el = winRef.current.parentElement; el && el !== document.body; el = el.parentElement) {
      el.classList.add('max-host');
      list.push(el);
    }
    saved.current = list;
    document.body.classList.add('has-max');
    window.__lenis?.stop();
    const onKey = e => e.key === 'Escape' && setMax(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      saved.current.forEach(el => el.classList.remove('max-host'));
      saved.current = [];
      if (!document.querySelector('.win.is-max')) {
        document.body.classList.remove('has-max');
        window.__lenis?.start();
      }
    };
  }, [max]);


  const minimize = () => { if (max) setMax(false); onMin ? onMin() : onClose ? onClose() : setRolled(r => !r); };
  const close = () => { if (max) setMax(false); onClose ? onClose() : setRolled(r => !r); };

  return (
    <div
      ref={winRef}
      className={`win win-${variant} ${max ? 'is-max' : ''} ${rolled ? 'is-rolled' : ''} ${className}`}
      data-lenis-prevent={max ? '' : undefined}
      {...rest}
    >
      <div className="win-bar" onDoubleClick={e => { if (!e.target.closest('button')) toggleMax(); }}>
        <span className="win-title">
          <PixelIcon name={icon} px={1.5} />
          <span className="win-title-text">{title}</span>
        </span>
        <span className="win-btns">
          <button type="button" className="wb wb-min" aria-label="Minimize" title="Minimize" onClick={minimize}><i /></button>
          <button type="button" className="wb wb-max" aria-label={max ? 'Restore' : 'Maximize'} title={max ? 'Restore Down' : 'Maximize'} onClick={toggleMax}><i className={max ? 'restore' : ''} /></button>
          <button type="button" className="wb wb-close" aria-label="Close" title="Close" onClick={close}><i /></button>
        </span>
      </div>
      <div className="win-content">
        {menu && (
          <div className="win-menu" aria-hidden="true">
            {menu.map(m => <span key={m}><u>{m[0]}</u>{m.slice(1)}</span>)}
          </div>
        )}
        {address && (
          <div className="win-address">
            <span className="addr-label">Address</span>
            <span className="addr-field"><PixelIcon name="folder" px={1} />{address}</span>
            <span className="addr-go">Go</span>
          </div>
        )}
        <div className={`win-body ${bodyClass}`}>{children}</div>
        {status && (
          <div className="win-status">
            {status.map((s, i) => <span key={i}>{s}</span>)}
          </div>
        )}
      </div>
    </div>
  );
});

export default Window;
