import { useRef, useEffect, useState } from 'react';

// Canvas overlay that lets a kid trace/write with finger, mouse, or stylus.
// `guide` text is drawn faintly behind as a tracing reference.
export default function TracingCanvas({ guide, width = 220, height = 220, strokeColor = '#1d4ed8' }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  const drawGuide = (ctx) => {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.font = `${Math.floor(height * 0.65)}px sans-serif`;
    ctx.fillStyle = '#d1d5db';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(guide, width / 2, height / 2);
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawGuide(ctx);
    setHasInk(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guide]);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return {
      x: ((point.clientX - rect.left) / rect.width) * width,
      y: ((point.clientY - rect.top) / rect.height) * height,
    };
  };

  const start = (e) => {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const move = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getPos(e);
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = strokeColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasInk(true);
  };

  const end = () => {
    drawing.current = false;
  };

  const clear = () => {
    const ctx = canvasRef.current.getContext('2d');
    drawGuide(ctx);
    setHasInk(false);
  };

  return (
    <div className="tracing-canvas-wrap">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="tracing-canvas"
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
      />
      <button type="button" className="btn-small" onClick={clear} disabled={!hasInk}>
        ↺ Clear
      </button>
    </div>
  );
}
