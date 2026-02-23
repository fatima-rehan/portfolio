import { useEffect, useRef } from "react";

export function BackgroundStatic({ isMobile }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let frame = 0;
    const scale = isMobile ? 0.35 : 1;
    let lastTime = 0;
    const interval = isMobile ? 100 : 0;

    const render = (time) => {
      if (isMobile && time - lastTime < interval) {
        animId = requestAnimationFrame(render);
        return;
      }
      lastTime = time;
      const w = Math.floor(window.innerWidth * scale);
      const h = Math.floor(window.innerHeight * scale);
      canvas.width = w;
      canvas.height = h;
      frame++;

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      const density = isMobile ? 0.15 : 0.3;
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < density) {
          const v = Math.random() * 60 + 10;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = Math.random() * 40 + 10;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      if (frame % 3 === 0) {
        const numLines = Math.floor(Math.random() * (isMobile ? 2 : 4));
        for (let l = 0; l < numLines; l++) {
          const y = Math.random() * h;
          const lh = Math.random() * 2 + 0.5;
          ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04 + 0.01})`;
          ctx.fillRect(0, y, w, lh);
        }
      }

      if (Math.random() < 0.15) {
        const sx = Math.random() * w;
        const sy = Math.random() * h;
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.15 + 0.05})`;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 2,
        opacity: 0.9,
      }}
    />
  );
}