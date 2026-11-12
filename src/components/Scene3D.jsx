import { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Sparkles, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

// shared mouse + scroll progress (written from outside the canvas)
export const sceneState = { mx: 0, my: 0, scroll: 0, hoverHeart: false, dragging: false };

function heartShape() {
  const s = new THREE.Shape();
  s.moveTo(0, -1.1);
  s.bezierCurveTo(-0.4, -0.75, -1.6, -0.2, -1.6, 0.55);
  s.bezierCurveTo(-1.6, 1.15, -1.1, 1.5, -0.65, 1.5);
  s.bezierCurveTo(-0.3, 1.5, -0.08, 1.3, 0, 1.05);
  s.bezierCurveTo(0.08, 1.3, 0.3, 1.5, 0.65, 1.5);
  s.bezierCurveTo(1.1, 1.5, 1.6, 1.15, 1.6, 0.55);
  s.bezierCurveTo(1.6, -0.2, 0.4, -0.75, 0, -1.1);
  return s;
}

function starShape(r = 1, pinch = 0.22) {
  const s = new THREE.Shape();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * pinch;
    const x = Math.cos(a) * rad, y = Math.sin(a) * rad;
    i === 0 ? s.moveTo(x, y) : s.lineTo(x, y);
  }
  s.closePath();
  return s;
}

const chrome = (color, iri = 1) =>
  new THREE.MeshPhysicalMaterial({
    color,
    metalness: 1,
    roughness: 0.12,
    iridescence: iri,
    iridescenceIOR: 1.6,
    iridescenceThicknessRange: [200, 900],
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.6
  });

// Grab the heart: drag moves it around the canvas, the drag speed flings it into a spin
// that keeps its momentum after you let go.
function Heart() {
  const grp = useRef();
  const ref = useRef();
  const d = useRef({ on: false, vx: 0, vy: 0, last: null, grab: new THREE.Vector3(), target: new THREE.Vector3() });
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const geo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(heartShape(), {
      depth: 0.55, bevelEnabled: true, bevelThickness: 0.35, bevelSize: 0.3, bevelSegments: 24, curveSegments: 64
    });
    g.center();
    return g;
  }, []);
  const mat = useMemo(() => chrome('#ffb3d9'), []);

  const toLocal = e => {
    if (!e.ray.intersectPlane(plane, hit)) return null;
    return grp.current.parent.worldToLocal(hit.clone());
  };
  const down = e => {
    e.stopPropagation();
    e.target.setPointerCapture?.(e.pointerId);
    const p = toLocal(e);
    const s = d.current;
    s.on = true;
    s.last = { x: e.clientX, y: e.clientY };
    if (p) s.grab.copy(p).sub(grp.current.position);
    sceneState.dragging = true;
  };
  const move = e => {
    const s = d.current;
    if (!s.on) return;
    const p = toLocal(e);
    if (p) {
      s.target.copy(p).sub(s.grab);
      s.target.x = THREE.MathUtils.clamp(s.target.x, -3, 3);
      s.target.y = THREE.MathUtils.clamp(s.target.y, -2.2, 2.2);
    }
    const dx = e.clientX - s.last.x, dy = e.clientY - s.last.y;
    s.vy = THREE.MathUtils.clamp(dx * 0.018, -0.6, 0.6);
    s.vx = THREE.MathUtils.clamp(dy * 0.018, -0.6, 0.6);
    s.last = { x: e.clientX, y: e.clientY };
  };
  const up = e => {
    d.current.on = false;
    e.target.releasePointerCapture?.(e.pointerId);
    sceneState.dragging = false;
  };

  useFrame((state, dt) => {
    const m = ref.current, g = grp.current, s = d.current;
    if (!m || !g) return;
    const t = state.clock.elapsedTime;
    g.position.lerp(s.target, 0.22);
    m.rotation.y += s.vy;
    m.rotation.x += s.vx;
    s.vy *= 0.955; // momentum
    s.vx *= 0.94;
    if (Math.abs(s.vy) < 0.004) m.rotation.y += dt * 0.35 + sceneState.mx * 0.004;
    if (Math.abs(s.vx) < 0.004) m.rotation.x += (-sceneState.my * 0.3 - m.rotation.x) * 0.03;
    m.scale.setScalar(1 + Math.sin(t * 2.4) * 0.025); // heartbeat
  });
  return (
    <group ref={grp}>
      <mesh
        ref={ref}
        geometry={geo}
        material={mat}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onPointerOver={() => (sceneState.hoverHeart = true)}
        onPointerOut={() => (sceneState.hoverHeart = false)}
      />
    </group>
  );
}

function Star({ position, scale = 0.4, color = '#ffffff', speed = 1 }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(starShape(), { depth: 0.12, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.08, bevelSegments: 8 });
    g.center();
    return g;
  }, []);
  const mat = useMemo(() => chrome(color, 0.8), [color]);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * speed;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * speed) * 0.3;
  });
  return (
    <Float speed={2 * speed} floatIntensity={1.4} rotationIntensity={0.4}>
      <mesh ref={ref} position={position} scale={scale} geometry={geo} material={mat} />
    </Float>
  );
}

function Ring() {
  const ref = useRef();
  const mat = useMemo(() => chrome('#d9b3ff'), []);
  useFrame((s, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.25;
    ref.current.rotation.y += dt * 0.4;
  });
  return (
    <mesh ref={ref} material={mat} position={[0, 0, -0.6]}>
      <torusGeometry args={[2.35, 0.07, 32, 160]} />
    </mesh>
  );
}

function Layout({ children }) {
  const { size } = useThree();
  const mobile = size.width / size.height < 1.05;
  return (
    <group position={[0, mobile ? 0.05 : 0, 0]} scale={mobile ? 0.62 : 0.7}>
      {children}
    </group>
  );
}

function Rig() {
  useFrame((state, dt) => {
    const c = state.camera;
    c.position.x = THREE.MathUtils.damp(c.position.x, sceneState.mx * 0.8, 3, dt);
    c.position.y = THREE.MathUtils.damp(c.position.y, sceneState.my * 0.5, 3, dt);
    c.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D({ onCanvas, eventSource }) {
  useEffect(() => {
    const onMove = e => {
      sceneState.mx = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.my = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      onCreated={({ gl }) => onCanvas?.(gl.domElement)}
      eventSource={eventSource}
      eventPrefix="client"
      style={{ pointerEvents: "none" }}
    >
      <Rig />
      <ambientLight intensity={0.4} />
      <Environment resolution={256}>
        <color attach="background" args={['#ffc8e4']} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[0, 0, -6]} scale={[12, 4, 1]} />
        <Lightformer form="rect" intensity={4} color="#ff7ac8" position={[-5, 2, 3]} scale={[4, 6, 1]} />
        <Lightformer form="rect" intensity={3} color="#9ad8ff" position={[5, -1, 3]} scale={[4, 6, 1]} />
        <Lightformer form="ring" intensity={6} color="#ffffff" position={[0, 4, 4]} scale={2.5} />
        <Lightformer form="rect" intensity={2} color="#c98bff" position={[0, -4, -2]} scale={[10, 2, 1]} />
      </Environment>
      <Layout>
        <Float speed={1.6} floatIntensity={0.8} rotationIntensity={0.2}>
          <Heart />
        </Float>
        <Ring />
        <Star position={[-2.1, 1.7, 0.6]} scale={0.38} speed={1.2} />
        <Star position={[2.0, -1.5, 0.8]} scale={0.3} color="#ffc4e6" speed={0.8} />
        <Star position={[1.7, 2.0, -0.5]} scale={0.22} color="#e4c9ff" speed={1.6} />
        <Sparkles count={60} scale={[7, 5, 3]} size={3} speed={0.4} color="#ffd6ec" />
      </Layout>
    </Canvas>
  );
}
