import { useRef, useEffect, useCallback } from "react";

/**
 * Animated waveform visualizer drawn on a Canvas element.
 * Shows a sine-like wave that responds to the "active" prop by increasing amplitude.
 */
export default function WaveformVisualizer({
  width = 800,
  height = 200,
  color = "#00f0ff",
  secondaryColor = "#ff00aa",
  active = false,
  className = "",
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const amplitudeRef = useRef(0.3);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    // Target amplitude based on active state
    const targetAmp = active ? 0.8 : 0.3;
    amplitudeRef.current += (targetAmp - amplitudeRef.current) * 0.05;
    const amp = amplitudeRef.current;

    timeRef.current += 0.02;
    const t = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    // Draw multiple overlapping waves
    const waves = [
      { freq: 1.5, phase: 0, alpha: 0.6, col: color, lineWidth: 2.5 },
      { freq: 2.2, phase: 1, alpha: 0.3, col: secondaryColor, lineWidth: 1.5 },
      { freq: 0.8, phase: 2.5, alpha: 0.2, col: color, lineWidth: 1 },
    ];

    for (const wave of waves) {
      ctx.beginPath();
      ctx.strokeStyle = wave.col;
      ctx.globalAlpha = wave.alpha;
      ctx.lineWidth = wave.lineWidth;

      for (let x = 0; x < w; x++) {
        const xNorm = x / w;
        const y =
          h / 2 +
          Math.sin(xNorm * Math.PI * 2 * wave.freq + t * 2 + wave.phase) *
            (h * 0.35 * amp) +
          Math.sin(xNorm * Math.PI * 4 * wave.freq + t * 1.5 + wave.phase) *
            (h * 0.1 * amp);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Glow effect
    ctx.globalAlpha = 0.1 * amp;
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const xNorm = x / w;
      const y =
        h / 2 +
        Math.sin(xNorm * Math.PI * 3 + t * 2) * (h * 0.3 * amp);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.globalAlpha = 1;
    animRef.current = requestAnimationFrame(draw);
  }, [active, color, secondaryColor]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{ width: "100%", height: "auto" }}
    />
  );
}
