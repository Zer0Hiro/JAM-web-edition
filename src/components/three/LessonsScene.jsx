import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getBassLevel } from "../../utils/audioBus";

/**
 * Full-page backdrop for the lessons journey: a drifting field of glowing
 * particles. The dominant color cross-fades through the curriculum phase
 * colors as the page scrolls, so the atmosphere "travels" with the learner.
 * Audio playback (lesson previews) makes the field pulse via the audio bus.
 *
 * DPR-capped, paused when hidden, static frame under reduced-motion.
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uPulse;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  attribute float aRand;
  attribute float aSpeed;
  varying float vRand;
  varying float vTwinkle;

  void main() {
    vec3 p = position;
    float t = uTime;

    // Slow upward drift, wrapped vertically; scroll adds gentle parallax
    p.y = mod(p.y + t * aSpeed * 0.30 + uScroll * 7.0 + 9.0, 18.0) - 9.0;
    p.x += sin(t * 0.22 + aRand * 6.2831 + p.y * 0.30) * 0.7;
    p.z += cos(t * 0.18 + aRand * 12.566) * 0.5;
    p.xy += uMouse * (0.25 + aRand * 0.5);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float size = (1.1 + aRand * 2.4) * (1.0 + uPulse * 1.6 * aRand);
    gl_PointSize = size * uPixelRatio * (15.0 / -mv.z);
    vRand = aRand;
    vTwinkle = 0.55 + 0.45 * sin(t * (0.7 + aRand * 1.9) + aRand * 40.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  uniform float uPulse;
  varying float vRand;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.12, d);
    if (disc < 0.01) discard;
    vec3 col = mix(uColorA, uColorB, vRand);
    float alpha = disc * vTwinkle * (0.30 + 0.55 * vRand) * uOpacity;
    alpha *= 1.0 + uPulse * 0.8;
    gl_FragColor = vec4(col, alpha);
  }
`;

function isLightTheme() {
  return document.documentElement.dataset.theme === "light";
}

export default function LessonsScene({ phaseColors = [], className = "" }) {
  const mountRef = useRef(null);
  const colorsRef = useRef(phaseColors);
  colorsRef.current = phaseColors;

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
    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 50);
    camera.position.set(0, 0, 9);

    const COUNT = isMobile ? 420 : 950;
    const positions = new Float32Array(COUNT * 3);
    const rands = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      rands[i] = Math.random();
      speeds[i] = 0.4 + Math.random() * 1.2;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));
    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));

    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--color-accent-purple").trim() || "#7F77DD";
    const startColor = colorsRef.current[0] || accent;

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: isLightTheme() ? THREE.NormalBlending : THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uPulse: { value: 0 },
        uPixelRatio: { value: pixelRatio },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorA: { value: new THREE.Color(startColor) },
        uColorB: { value: new THREE.Color(accent) },
        uOpacity: { value: isLightTheme() ? 0.8 : 1 },
      },
    });
    scene.add(new THREE.Points(geometry, material));

    const themeObserver = new MutationObserver(() => {
      const light = isLightTheme();
      material.uniforms.uOpacity.value = light ? 0.8 : 1;
      material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      material.needsUpdate = true;
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Phase color target follows scroll progress through the page
    const targetColor = new THREE.Color(startColor);
    let scrollProgress = 0;
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = Math.min(1, window.scrollY / max);
      const colors = colorsRef.current;
      if (colors.length > 0) {
        const idx = Math.min(colors.length - 1, Math.floor(scrollProgress * colors.length));
        targetColor.set(colors[idx]);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    if (!isMobile) window.addEventListener("pointermove", onPointerMove, { passive: true });

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

    const clock = new THREE.Clock();
    let raf = 0;
    let pulse = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uScroll.value += (scrollProgress - material.uniforms.uScroll.value) * 0.06;
      material.uniforms.uColorA.value.lerp(targetColor, 0.04);
      pulse += (getBassLevel() - pulse) * 0.18;
      material.uniforms.uPulse.value = pulse;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      renderer.render(scene, camera);
    };

    if (reduced) {
      material.uniforms.uTime.value = 4.0;
      renderer.render(scene, camera);
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
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
      className={`fixed inset-0 -z-10 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
