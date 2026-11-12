import { useState } from 'react';
import useLenis from './hooks/useLenis.js';
import ClickSpark from './components/reactbits/ClickSpark.jsx';
import CursorTrail from './components/CursorTrail.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Papers from './components/Papers.jsx';
import Contact from './components/Contact.jsx';
import Taskbar from './components/Taskbar.jsx';
import Loader from './components/Loader.jsx';

export default function App() {
  useLenis();
  const [closed, setClosed] = useState({ bin: true });
  const [query, setQuery] = useState('');
  return (
    <ClickSpark sparkColor={['#ff69b4', '#ffd9ec', '#b48cff', '#ffffff']} shape="star" sparkCount={9} sparkSize={12} sparkRadius={30} duration={550} glow={0.4} style={{ height: 'auto' }}>
      <Loader />
      <CursorTrail />
      <Header onSearch={setQuery} />
      <main>
        <Hero closed={closed} setClosed={setClosed} />
        <About />
        <Skills />
        <Experience />
        <Projects query={query} setQuery={setQuery} />
        <Papers />
        <Contact />
      </main>
      <Taskbar closed={closed} setClosed={setClosed} />
    </ClickSpark>
  );
}
