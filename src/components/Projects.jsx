import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import TiltedCard from './reactbits/TiltedCard.jsx';
import Window from './Window.jsx';
import PixelIcon, { catIcon } from './PixelIcon.jsx';
import { Twinkle } from './Stickers.jsx';
import { projects, categories, profile } from '../data.js';

gsap.registerPlugin(Flip);

const featured = projects.filter(p => p.featured);
const THEMES = ['pink', 'blue', 'lilac', 'mint', 'peach', 'rose'];
const catLabel = Object.fromEntries(categories.map(c => [c.id, c.label]));

// NewJeans-style "profile card" browser windows
function ProfileCard({ p, i }) {
  return (
    <div className={`pc pc-${THEMES[i % THEMES.length]}`}>
      <div className="pc-top">
        <span className="pc-dots"><i /><i /><i /></span>
        <span className="pc-tab">{p.repo.split('-')[0].toUpperCase()}</span>
        <span className="pc-flag"><svg viewBox="0 0 12 12" width="9" height="9"><circle cx="5" cy="5" r="3.5" fill="none" stroke="#fff" strokeWidth="1.6" /><path d="M7.5 7.5 L11 11" stroke="#fff" strokeWidth="1.8" /></svg>FEATURED !!!</span>
      </div>
      <div className="pc-url">
        <span className="pc-refresh">↻</span>
        <span className="pc-field">https://github.com/trish404/{p.repo}</span>
        <PixelIcon name="mail" px={1.4} />
      </div>
      <div className="pc-body">
        <div className="pc-photo">
          <PixelIcon name={catIcon[p.cat]} px={5} />
          <Twinkle size={16} className="pc-tw" />
          <span className="pc-hand"><PixelIcon name="hand" px={2} /></span>
        </div>
        <div className="pc-fields">
          <span className="pc-name">{p.name}</span>
          <div className="pc-hearts" aria-hidden="true">{'♥♥♥♥♥♥♥♥'.split('').map((h, k) => <i key={k}>{h}</i>)}</div>
          <dl>
            <dt>STACK</dt><dd>{p.tags.slice(0, 2).join(' · ')}</dd>
            <dt>YEAR</dt><dd>{p.year}</dd>
            <dt>TYPE</dt><dd>{catLabel[p.cat]}</dd>
          </dl>
        </div>
      </div>
      <p className="pc-desc">{p.desc}</p>
      <div className="pc-foot">
        <span className="pc-load">Loading...<span className="pc-blocks">{'▮▮▮▮▮▮▮▮▮▮▮▮▮▮'}</span></span>
        <span className="pc-links">
          <a href={p.url} target="_blank" rel="noreferrer">code ↗</a>
          {p.live && <a href={p.live} target="_blank" rel="noreferrer">live ↗</a>}
        </span>
      </div>
    </div>
  );
}

export default function Projects({ query = '', setQuery }) {
  const [cat, setCat] = useState('all');
  const listRef = useRef(null);
  const sectionRef = useRef(null);
  const flipState = useRef(null);

  const q = query.toLowerCase();
  const list = useMemo(
    () =>
      projects.filter(p => {
        const inCat = cat === 'all' || p.cat === cat;
        const inQ = !q || [p.name, p.desc, p.repo, ...p.tags].join(' ').toLowerCase().includes(q);
        return inCat && inQ && (q ? true : !p.featured);
      }),
    [cat, q]
  );

  const choose = c => {
    if (c === cat) return;
    flipState.current = Flip.getState(listRef.current.querySelectorAll('.ex-row'));
    setCat(c);
  };

  useEffect(() => {
    if (q) setCat('all');
  }, [q]);

  useEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.45, ease: 'power2.inOut', absolute: true,
      onEnter: els => gsap.fromTo(els, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.35 }),
      onLeave: els => gsap.to(els, { opacity: 0, duration: 0.2 })
    });
    flipState.current = null;
  }, [cat]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pc-wrap', { y: 70, opacity: 0, duration: 0.9, ease: 'back.out(1.3)', stagger: 0.08, scrollTrigger: { trigger: '.featured', start: 'top 82%' } });
      gsap.from('.explorer', { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.explorer', start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="sec-head">
        <h2 className="bubble-heading">my projects</h2>
        <p className="sec-sub">featured ✦ hover a card to tilt it</p>
      </div>

      <div className="featured">
        {featured.map((p, i) => (
          <div className="pc-wrap" key={p.repo}>
            <TiltedCard containerHeight="auto" containerWidth="100%" imageHeight="auto" imageWidth="100%" rotateAmplitude={7} scaleOnHover={1.02} showTooltip={false} radius={6} glare={0.35} glareColor="#ffffff" shadow={0.25} flipOnClick={false}>
              <ProfileCard p={p} i={i} />
            </TiltedCard>
          </div>
        ))}
      </div>

      <Window
        title={q ? `Search Results - "${query}"` : 'My Projects'}
        icon="folder"
        className="explorer"
        menu={['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help']}
        address={q ? `Search: ${query}` : `C:\\Users\\trish404\\repos\\${cat === 'all' ? '' : cat}`}
        status={[`${list.length} object(s)`, `${projects.length} of 62 repos shown`, 'My Computer']}
      >
        <div className="ex">
          <aside className="ex-side">
            <div className="ex-panel">
              <p className="ex-panel-h">Folders</p>
              <ul role="tablist">
                {categories.map(c => (
                  <li key={c.id}>
                    <button type="button" role="tab" aria-selected={cat === c.id && !q} className={cat === c.id && !q ? 'on' : ''} onClick={() => { setQuery?.(''); choose(c.id); }}>
                      <PixelIcon name={c.id === 'all' ? 'folder' : catIcon[c.id]} px={1.6} />{c.label.replace('★ ', '')}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ex-panel">
              <p className="ex-panel-h">Other Places</p>
              <ul>
                <li><a href={profile.github + '?tab=repositories'} target="_blank" rel="noreferrer"><PixelIcon name="globe" px={1.6} />All 62 repos ↗</a></li>
                <li><a href="#papers"><PixelIcon name="doc" px={1.6} />Publications</a></li>
              </ul>
            </div>
          </aside>
          <div className="ex-main">
            <div className="ex-cols" aria-hidden="true"><span>Name</span><span>Type</span><span>Year</span><span>Stack</span></div>
            <div className="ex-list" ref={listRef}>
              {list.map(p => (
                <a key={p.repo} data-flip-id={p.repo} className="ex-row" href={p.url} target="_blank" rel="noreferrer" title={p.desc}>
                  <span className="ex-name"><PixelIcon name={catIcon[p.cat]} px={1.6} /><span><b>{p.name}</b><small>{p.desc}</small></span></span>
                  <span className="ex-type">{catLabel[p.cat]}</span>
                  <span className="ex-year">{p.year}</span>
                  <span className="ex-stack">{p.tags.join(', ')}</span>
                </a>
              ))}
              {!list.length && <p className="ex-empty">No items match your search. Try “fastapi” or “ml”.</p>}
            </div>
          </div>
        </div>
      </Window>
    </section>
  );
}
