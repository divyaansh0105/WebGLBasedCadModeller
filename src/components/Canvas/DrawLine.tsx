// drawLine.ts
const drawLine = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    ctx.beginPath(); // Begin a new path
    ctx.moveTo(startX, startY); // Move to the starting point
    ctx.lineTo(endX, endY); // Draw a line to the ending point
    ctx.stroke(); // Stroke the line
  };
  
  export default drawLine;
  