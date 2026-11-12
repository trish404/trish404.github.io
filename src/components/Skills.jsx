import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Window from './Window.jsx';
import PixelIcon from './PixelIcon.jsx';
import { ChromeStar, Twinkle } from './Stickers.jsx';
import { skillGroups, skillList, projects } from '../data.js';

const LEVEL = ['', 'familiar', 'shipped with it', 'daily driver'];
const DECOR = ['<333*', '★★★★★', 'i <3 code', '404 bugs', 'it’s2026', '© trisha', 'ERROR', 'ship it!'];
const groupLabel = Object.fromEntries(skillGroups.map(g => [g.id, g.label]));

// Big = daily driver, medium = shipped with it, small = familiar.
export default function Skills() {
  const ref = useRef(null);
  const [group, setGroup] = useState('all');
  const [sel, setSel] = useState('Java');
  const skill = skillList.find(s => s.n === sel) || skillList[0];

  const ordered = useMemo(() => {
    // interleave sizes so the wall looks like a collage, not a sorted list
    const big = skillList.filter(s => s.lv === 3), mid = skillList.filter(s => s.lv === 2), small = skillList.filter(s => s.lv === 1);
    const out = [];
    let i = 0;
    while (big.length || mid.length || small.length) {
      if (big.length) out.push(big.shift());
      if (mid.length) out.push(mid.shift());
      if (mid.length) out.push(mid.shift());
      if (small.length && i % 2 === 0) out.push(small.shift());
      i++;
    }
    return out;
  }, []);

  const related = useMemo(() => {
    const key = skill.n.toLowerCase().replace(/[^a-z0-9]/g, '');
    return projects.filter(p => [...p.tags, p.desc].join(' ').toLowerCase().replace(/[^a-z0-9 ]/g, '').includes(key)).slice(0, 4);
  }, [skill]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sk-word, .sk-decor', {
        scale: 0.2, opacity: 0, rotate: () => gsap.utils.random(-25, 25), duration: 0.6, ease: 'back.out(2)',
        stagger: { each: 0.025, from: 'random' }, clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.sk-wall', start: 'top 80%' }
      });
      gsap.from('.sk-props', { x: 40, opacity: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.sk-wall', start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo('.sk-props-name', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' });
    gsap.fromTo('.sk-lvl-fill', { width: 0 }, { width: `${(skill.lv / 3) * 100}%`, duration: 0.6, ease: 'steps(12)' });
  }, [skill]);

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="sec-head">
        <h2 className="bubble-heading">skills</h2>
        <p className="sec-sub">the bigger the word, the deeper I go. click any word for details.</p>
      </div>

      <div className="sk-layout">
        <Window title="skills_collage.bmp - Paint" icon="star" className="sk-win" menu={['File', 'Edit', 'View', 'Image', 'Colors', 'Help']}
          status={[`${skillList.length} skills`, 'BIG = daily driver · medium = shipped · small = familiar']}>
          <div className="sk-tabs" role="tablist">
            {[{ id: 'all', label: 'everything' }, ...skillGroups].map(g => (
              <button key={g.id} type="button" role="tab" aria-selected={group === g.id} className={group === g.id ? 'on' : ''} onClick={() => setGroup(g.id)}>{g.label}</button>
            ))}
          </div>
          <div className="sk-wall">
            {ordered.map((s, i) => (
              <Fragment key={s.n}>
                <button
                  type="button"
                  className={`sk-word lv${s.lv} v${i % 7} ${group !== 'all' && s.g !== group ? 'dim' : ''} ${sel === s.n ? 'sel' : ''}`}
                  onClick={() => setSel(s.n)}
                  onMouseEnter={() => setSel(s.n)}
                  aria-pressed={sel === s.n}
                  title={`${s.n}: ${LEVEL[s.lv]}`}
                >
                  {s.n}
                </button>
                {i % 5 === 3 && <span className={`sk-decor d${(i / 5) % 4 | 0}`} aria-hidden="true">{DECOR[(i / 5) % DECOR.length | 0]}</span>}
              </Fragment>
            ))}
          </div>
        </Window>

        <div className="sk-side">
          <Window title="Skill Properties" icon="sparkle" variant="dialog" className="sk-props">
            <div className="sk-props-tabs"><span className="on">General</span><span>Details</span></div>
            <div className="sk-props-body">
              <p className="sk-props-name">{skill.n}</p>
              <p className="sk-props-cat"><PixelIcon name="folder" px={1.5} />{groupLabel[skill.g]}</p>
              <div className="sk-lvl">
                <div className="sk-lvl-bar"><span className="sk-lvl-fill" /></div>
                <p>LEVEL: <b>{LEVEL[skill.lv]}</b></p>
              </div>
              <fieldset>
                <legend>where I used it</legend>
                <p>{skill.where}</p>
              </fieldset>
              {related.length > 0 && (
                <fieldset>
                  <legend>related projects</legend>
                  <ul>
                    {related.map(p => <li key={p.repo}><a href={p.url} target="_blank" rel="noreferrer">{p.name} ↗</a></li>)}
                  </ul>
                </fieldset>
              )}
            </div>
          </Window>
          <div className="sk-legend">
            {[3, 2, 1].map(l => (
              <span key={l} className={`lg lv${l}`}><i />{LEVEL[l]} · {skillList.filter(s => s.lv === l).length}</span>
            ))}
          </div>
          <ChromeStar size={64} className="sk-star" />
          <Twinkle size={20} className="sk-tw" />
        </div>
      </div>
    </section>
  );
}
