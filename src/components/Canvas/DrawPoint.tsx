// drawPoint.ts
const drawPoint = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 1, y + 1);
    ctx.stroke();
  };
  
  export default drawPoint;
  