import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Three.js hero background: a particle terrain displaced by summed sine
 * waves (an additive-synthesis nod). Theme-aware, mouse-reactive,
 * DPR-capped and paused when off-screen or reduced-motion is requested.
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  attribute float aRand;
  varying float vWave;
  varying float vDepth;
  varying float vRand;

  void main() {
    vec3 p = position;
    float t = uTime;

    // Additive synthesis: stacked sines at different frequencies/phases
    float wave =
        sin(p.x * 0.55 + t * 1.10) * 0.45
      + sin(p.x * 1.70 + t * 0.65 + p.z * 0.80) * 0.22
      + sin(p.z * 1.30 + t * 0.90) * 0.30
      + sin((p.x + p.z) * 0.35 - t * 0.45) * 0.25;

    // Mouse ripple: gentle lift toward pointer x
    wave += uMouse.x * p.x * 0.04 + uMouse.y * 0.15;

    p.y += wave * uAmp;
    vWave = wave;
    vRand = aRand;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_PointSize = (1.6 + aRand * 1.8) * uPixelRatio * (16.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vWave;
  varying float vDepth;
  varying float vRand;

  void main() {
    // Soft round point
    float d = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.18, d);
    if (disc < 0.01) discard;

    // Color by wave height
    float h = clamp(vWave * 0.5 + 0.5, 0.0, 1.0);
    vec3 col = mix(uColorA, uColorB, h);

    // Fade far rows into the background
    float fog = smoothstep(26.0, 6.0, vDepth);
    float alpha = disc * fog * (0.35 + 0.65 * vRand) * uOpacity;
    gl_FragColor = vec4(col, alpha);
  }
`;

function readThemeColors() {
  const css = getComputedStyle(document.documentElement);
  const a = css.getPropertyValue("--color-accent-support").trim() || "#85B7EB";
  const b = css.getPropertyValue("--color-accent-deep").trim() || "#7F77DD";
  const isLight = document.documentElement.dataset.theme === "light";
  return { a: new THREE.Color(a), b: new THREE.Color(b), isLight };
}

export default function HeroScene({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
    camera.position.set(0, 2.1, 7.5);
    camera.lookAt(0, -0.4, 0);

    // Particle grid
    const COLS = isMobile ? 110 : 200;
    const ROWS = isMobile ? 60 : 110;
    const WIDTH = 30;
    const DEPTH = 18;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const rands = new Float32Array(count);
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions[i * 3] = (c / (COLS - 1) - 0.5) * WIDTH;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (r / (ROWS - 1) - 0.5) * DEPTH;
        rands[i] = Math.random();
        i++;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));

    const { a, b, isLight } = readThemeColors();
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uAmp: { value: 0.9 },
        uPixelRatio: { value: pixelRatio },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorA: { value: a },
        uColorB: { value: b },
        uOpacity: { value: isLight ? 0.9 : 1 },
      },
    });
    const points = new THREE.Points(geometry, material);
    points.position.y = -1.2;
    scene.add(points);

    // Theme switches update colors + blending live
    const themeObserver = new MutationObserver(() => {
      const t = readThemeColors();
      material.uniforms.uColorA.value = t.a;
      material.uniforms.uColorB.value = t.b;
      material.uniforms.uOpacity.value = t.isLight ? 0.9 : 1;
      material.blending = t.isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
      material.needsUpdate = true;
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Pointer parallax (lerped)
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    if (!isMobile) window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Size to container
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // Pause when hero scrolled out of view or tab hidden
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      material.uniforms.uTime.value = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      camera.position.x = mouse.x * 0.6;
      camera.position.y = 2.1 + mouse.y * 0.3;
      camera.lookAt(0, -0.4, 0);
      renderer.render(scene, camera);
    };

    if (reduced) {
      // Single static frame
      material.uniforms.uTime.value = 2.5;
      renderer.render(scene, camera);
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      if (!isMobile) window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 -z-10 ${className}`}
      aria-hidden="true"
    />
  );
}
