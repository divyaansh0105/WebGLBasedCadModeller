
const drawCircle = (gl: WebGLRenderingContext, centerX: number, centerY: number, radius: number) => {
  const segments = 50; // Number of line segments to approximate the circle
  const anglePerSegment = (Math.PI * 2) / segments;
  const vertices = [];

  // Generate vertices for the circle
  for (let i = 0; i <= segments; i++) {
    const angle = i * anglePerSegment;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    vertices.push(x, y);
  }

  // Create and bind vertex buffer
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Set up vertex attribute
  const positionLocation = gl.getAttribLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Draw the circle
  gl.drawArrays(gl.LINE_STRIP, 0, segments + 1);
};

export default drawCircle;
