import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getFrequencyData, getBassLevel } from "../../utils/audioBus";

/**
 * Audio-reactive centerpiece for the sandbox: a radial spectrum ring of
 * instanced bars around a wireframe core. While a preview plays, bar
 * heights follow the live frequency spectrum from the audio bus and the
 * core thumps with the bass; idle, everything breathes on summed sines.
 */

const BAR_COUNT = 96;
const RING_RADIUS = 2.35;

function themeColors() {
  const css = getComputedStyle(document.documentElement);
  return {
    cyan: new THREE.Color(css.getPropertyValue("--color-accent-cyan").trim() || "#85B7EB"),
    purple: new THREE.Color(css.getPropertyValue("--color-accent-purple").trim() || "#7F77DD"),
    magenta: new THREE.Color(css.getPropertyValue("--color-accent-magenta").trim() || "#AFA9EC"),
    isLight: document.documentElement.dataset.theme === "light",
  };
}

export default function SandboxScene({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
    camera.position.set(0, 3.4, 7.2);
    camera.lookAt(0, 0, 0);

    let { cyan, purple, magenta, isLight } = themeColors();

    // --- Spectrum ring (instanced bars) ---
    const barGeo = new THREE.BoxGeometry(0.085, 1, 0.085);
    barGeo.translate(0, 0.5, 0); // grow upward from the ring plane
    const barMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: isLight ? 0.85 : 0.95,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });
    const bars = new THREE.InstancedMesh(barGeo, barMat, BAR_COUNT);
    const dummy = new THREE.Object3D();
    const barColor = new THREE.Color();
    for (let i = 0; i < BAR_COUNT; i++) {
      const angle = (i / BAR_COUNT) * Math.PI * 2;
      dummy.position.set(Math.cos(angle) * RING_RADIUS, 0, Math.sin(angle) * RING_RADIUS);
      dummy.rotation.y = -angle;
      dummy.scale.set(1, 0.15, 1);
      dummy.updateMatrix();
      bars.setMatrixAt(i, dummy.matrix);
      // gradient around the ring: cyan -> purple -> magenta -> cyan
      const t = i / BAR_COUNT;
      if (t < 0.33) barColor.lerpColors(cyan, purple, t / 0.33);
      else if (t < 0.66) barColor.lerpColors(purple, magenta, (t - 0.33) / 0.33);
      else barColor.lerpColors(magenta, cyan, (t - 0.66) / 0.34);
      bars.setColorAt(i, barColor);
    }
    bars.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(bars);

    // --- Bass core ---
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: purple,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.55 : 0.7,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // --- Ground ring guide ---
    const guideGeo = new THREE.RingGeometry(RING_RADIUS - 0.02, RING_RADIUS + 0.02, 96);
    const guideMat = new THREE.MeshBasicMaterial({
      color: cyan,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const guide = new THREE.Mesh(guideGeo, guideMat);
    guide.rotation.x = -Math.PI / 2;
    scene.add(guide);

    const themeObserver = new MutationObserver(() => {
      const c = themeColors();
      cyan = c.cyan; purple = c.purple; magenta = c.magenta; isLight = c.isLight;
      coreMat.color = purple;
      coreMat.opacity = isLight ? 0.55 : 0.7;
      guideMat.color = cyan;
      barMat.opacity = isLight ? 0.85 : 0.95;
      barMat.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
      barMat.needsUpdate = true;
      for (let i = 0; i < BAR_COUNT; i++) {
        const t = i / BAR_COUNT;
        if (t < 0.33) barColor.lerpColors(cyan, purple, t / 0.33);
        else if (t < 0.66) barColor.lerpColors(purple, magenta, (t - 0.33) / 0.33);
        else barColor.lerpColors(magenta, cyan, (t - 0.66) / 0.34);
        bars.setColorAt(i, barColor);
      }
      bars.instanceColor.needsUpdate = true;
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

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

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    const heights = new Float32Array(BAR_COUNT).fill(0.15);
    const clock = new THREE.Clock();
    let raf = 0;
    let bass = 0;

    const renderFrame = (t) => {
      const data = getFrequencyData();
      for (let i = 0; i < BAR_COUNT; i++) {
        let target;
        if (data) {
          // mirror the spectrum so the ring is symmetric front/back
          const half = i < BAR_COUNT / 2 ? i : BAR_COUNT - 1 - i;
          const bin = Math.floor((half / (BAR_COUNT / 2)) * (data.length * 0.75));
          const v = data[bin] / 255;
          target = 0.12 + Math.pow(v, 1.4) * 2.4;
        } else {
          // idle: gentle additive-synthesis breathing
          const angle = (i / BAR_COUNT) * Math.PI * 2;
          target =
            0.22 +
            0.16 * Math.sin(angle * 3 + t * 1.2) +
            0.10 * Math.sin(angle * 5 - t * 0.8) +
            0.06 * Math.sin(t * 2.1 + i);
          target = Math.max(0.08, target);
        }
        heights[i] += (target - heights[i]) * 0.25;
        const angle = (i / BAR_COUNT) * Math.PI * 2;
        dummy.position.set(Math.cos(angle) * RING_RADIUS, 0, Math.sin(angle) * RING_RADIUS);
        dummy.rotation.y = -angle;
        dummy.scale.set(1, heights[i], 1);
        dummy.updateMatrix();
        bars.setMatrixAt(i, dummy.matrix);
      }
      bars.instanceMatrix.needsUpdate = true;

      bass += (getBassLevel() - bass) * 0.2;
      const breathe = 1 + Math.sin(t * 1.1) * 0.04;
      const s = breathe + bass * 0.9;
      core.scale.set(s, s, s);
      core.rotation.y = t * 0.25;
      core.rotation.x = t * 0.11;
      bars.rotation.y = t * 0.06;

      camera.position.x += (mouse.x * 1.4 - camera.position.x) * 0.04;
      camera.position.y += (3.4 + mouse.y * 0.8 - camera.position.y) * 0.04;
      camera.lookAt(0, 0.4, 0);
      renderer.render(scene, camera);
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      renderFrame(clock.getElapsedTime());
    };

    if (reduced) {
      renderFrame(2.0);
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      if (!isMobile) window.removeEventListener("pointermove", onPointerMove);
      barGeo.dispose();
      barMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      guideGeo.dispose();
      guideMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 -z-10 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
