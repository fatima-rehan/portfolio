import { useEffect, useRef } from "react";

export function FilmGrain({ isMobile }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const scale = isMobile ? 0.5 : 1;
    let lastTime = 0;
    const interval = isMobile ? 80 : 0;

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
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      const step = isMobile ? 8 : 4;
      for (let i = 0; i < data.length; i += step) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 18;
      }
      ctx.putImageData(imageData, 0, 0);
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
        zIndex: 9999,
        mixBlendMode: "overlay",
      }}
    />
  );
}