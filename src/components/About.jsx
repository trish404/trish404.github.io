import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { LiquidMetal } from '@paper-design/shaders-react';
import Window from './Window.jsx';
import PixelIcon from './PixelIcon.jsx';
import CircularText from './reactbits/CircularText.jsx';
import { ChromeStar, Twinkle } from './Stickers.jsx';
import { profile, stats, achievements, experience, skillGroups, skillList } from '../data.js';

gsap.registerPlugin(Draggable);

export default function About() {
  const ref = useRef(null);

  // MEET + SOCIALS panels can be dragged around (desktop)
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 961px)', () => {
      let z = 5;
      const d = gsap.utils.toArray('.about-right .win', ref.current).map(el =>
        Draggable.create(el, {
          trigger: el.querySelector('.win-bar'), bounds: ref.current, zIndexBoost: false, cursor: 'inherit', activeCursor: 'inherit',
          onPress(e) { if (el.classList.contains('is-max')) { this.endDrag(e); return; } el.style.zIndex = ++z; }
        })[0]
      );
      return () => d.forEach(x => x.kill());
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-left > *', { y: 30, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
      gsap.from('.about-row .win', { y: 50, opacity: 0, scale: 0.96, stagger: 0.12, duration: 0.8, ease: 'back.out(1.4)', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.about-row', start: 'top 80%' } });
      gsap.from('.about-right', { y: 50, opacity: 0, duration: 0.8, ease: 'back.out(1.4)', clearProps: 'transform,opacity', scrollTrigger: { trigger: ref.current, start: 'top 65%' } });
      gsap.utils.toArray('.xl-val').forEach(el => {
        const raw = el.dataset.n;
        const num = parseFloat(raw.replace(/[^\d.]/g, ''));
        if (Number.isNaN(num)) return;
        const pre = raw.match(/^\D*/)[0], suf = raw.replace(/^\D*[\d.]+/, '');
        const o = { v: 0 };
        gsap.to(o, { v: num, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%' }, onUpdate: () => (el.textContent = pre + Math.round(o.v) + suf) });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-page">
        <div className="about-left">
          <h2 className="pixel-display">about<br /><span>me!</span></h2>
          <a className="serif-name" href={profile.github} target="_blank" rel="noreferrer">{profile.name}</a>
          <p className="serif-copy">{profile.about}</p>

          <h3 className="serif-h">SKILLS</h3>
          <dl className="skill-lines">
            {skillGroups.map(g => (
              <div key={g.id}>
                <dt>{g.label}</dt>
                <dd>{skillList.filter(s => s.g === g.id && s.lv >= 2).map(s => s.n).join(' · ')}</dd>
              </div>
            ))}
          </dl>
          <a href="#skills" className="skills-more">see the full breakdown in skills.bmp ↓</a>

          <div className="serif-cols">
            <div>
              <h3 className="serif-h">EDUCATION</h3>
              <p className="mini"><small>2022 – 2026</small><b>Amrita Vishwa Vidyapeetham</b>B.Tech CSE · CGPA 8.43</p>
              <p className="mini"><small>exp. 2028</small><b>IIT Madras</b>B.S. Data Science</p>
            </div>
            <div>
              <h3 className="serif-h">EXPERIENCE</h3>
              {experience.map(x => (
                <p className="mini" key={x.co}><small>{x.when}</small><b>{x.co}</b>{x.role}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="about-right">
          <Window title="MEET-TRISHA" icon="user" variant="classic" className="meet-win">
            <div className="meet-stage">
              <CircularText text="✦ OPEN TO WORK ✦ SWE ✦ ML ✦ BENGALURU " spinDuration={20} onHover="speedUp" size={270} fontSize={14} color="#e0408f" className="meet-ring" />
              <div className="meet-metal">
                <LiquidMetal width={170} height={170} image="/logo.svg" colorBack="#00000000" colorTint="#ffe3f1" repetition={3} softness={0.3} shiftRed={0.35} shiftBlue={0.35} distortion={0.12} contour={0.5} angle={60} speed={0.9} scale={0.85} fit="contain" />
              </div>
              <Twinkle size={20} className="m-tw1" /><Twinkle size={14} className="m-tw2" />
            </div>
          </Window>
          <Window title="SOCIALS" icon="globe" variant="classic" className="socials-win">
            <ul className="socials">
              <li><a href={profile.github} target="_blank" rel="noreferrer"><PixelIcon name="computer" px={2} />github.com/{profile.handle}</a></li>
              <li><a href={profile.linkedin} target="_blank" rel="noreferrer"><PixelIcon name="globe" px={2} />in/trisha-vijayekkumaran</a></li>
              <li><a href={`mailto:${profile.email}`}><PixelIcon name="mail" px={2} />{profile.email}</a></li>
            </ul>
          </Window>
          <ChromeStar size={70} className="about-star" />
        </div>
      </div>

      <div className="about-row">
        <Window title="trisha's details" icon="user" className="details-win">
          <table className="details">
            <tbody>
              <tr><th>Status:</th><td>open to work</td></tr>
              <tr><th>Here for:</th><td>SWE & ML roles</td></tr>
              <tr><th>Hometown:</th><td>{profile.location}</td></tr>
              <tr><th>Focus:</th><td>backend systems &amp; applied ML</td></tr>
              <tr><th>Languages:</th><td>Java, Python, C++, JS, SQL, R</td></tr>
              <tr><th>Education:</th><td>Amrita B.Tech CSE · IIT-M BS DS</td></tr>
            </tbody>
          </table>
        </Window>

        <Window title="stats.xls - Microsoft Excel" icon="chart" className="excel-win" menu={['File', 'Edit', 'View', 'Insert', 'Format', 'Data']}>
          <div className="xl-formula"><span className="xl-cell-ref">B5</span><span className="xl-fx">fx</span><span>=COUNT(papers)+hackathons</span></div>
          <table className="xl">
            <thead><tr><th /><th>A</th><th>B</th></tr></thead>
            <tbody>
              <tr><th>1</th><td className="xl-h">metric</td><td className="xl-h">value</td></tr>
              {stats.map((s, i) => (
                <tr key={s.l}><th>{i + 2}</th><td>{s.l}</td><td className={`xl-val ${i === 1 ? 'xl-sel' : ''}`} data-n={s.n}>{s.n}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="xl-tabs"><span className="on">Sheet1</span><span>Sheet2</span><span>Sheet3</span></div>
        </Window>

        <Window title="trisha's top 3" icon="trophy" className="top3-win">
          <ul className="top3">
            {achievements.map((a, i) => (
              <li key={a.t}>
                <span className="top3-frame"><PixelIcon name={i === 0 ? 'trophy' : i === 1 ? 'star' : 'heart'} px={4} /></span>
                <b>{a.t}</b>
                <small>{a.d}</small>
              </li>
            ))}
          </ul>
        </Window>
      </div>
    </section>
  );
}
