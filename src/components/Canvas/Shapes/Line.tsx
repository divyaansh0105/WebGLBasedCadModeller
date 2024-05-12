class LineDrawer {
  private gl: WebGLRenderingContext;
  private x1: number;
  private y1: number;
  private z1: number;
  private x2: number;
  private y2: number;
  private z2: number;

  constructor(gl: WebGLRenderingContext, plane: string) {
    this.gl = gl;
    this.x1 = 0;
    this.y1 = 0;
    this.z1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.z2 = 0;

    // Prompt the user for input based on the selected plane
    if (plane === 'XY') {
      const inputX1 = prompt('Enter the X coordinate for the start point of the line:');
      const inputY1 = prompt('Enter the Y coordinate for the start point of the line:');
      const inputZ1 = '0';
      const inputX2 = prompt('Enter the X coordinate for the end point of the line:');
      const inputY2 = prompt('Enter the Y coordinate for the end point of the line:');
      const inputZ2 = '0';

      this.x1 = parseFloat(inputX1 || '0');
      this.y1 = parseFloat(inputY1 || '0');
      this.z1 = parseFloat(inputZ1 || '0');
      this.x2 = parseFloat(inputX2 || '0');
      this.y2 = parseFloat(inputY2 || '0');
      this.z2 = parseFloat(inputZ2 || '0');
    } else if (plane === 'YZ') {
      const inputX1 = '0';
      const inputY1 = prompt('Enter the Y coordinate for the start point of the line:');
      const inputZ1 = prompt('Enter the Z coordinate for the start point of the line:');
      const inputX2 = '0';
      const inputY2 = prompt('Enter the Y coordinate for the end point of the line:');
      const inputZ2 = prompt('Enter the Z coordinate for the end point of the line:');

      this.x1 = parseFloat(inputX1 || '0');
      this.y1 = parseFloat(inputY1 || '0');
      this.z1 = parseFloat(inputZ1 || '0');
      this.x2 = parseFloat(inputX2 || '0');
      this.y2 = parseFloat(inputY2 || '0');
      this.z2 = parseFloat(inputZ2 || '0');
    } else if (plane === 'ZX') {
      const inputX1 = prompt('Enter the X coordinate for the start point of the line:');
      const inputY1 = '0';
      const inputZ1 = prompt('Enter the Z coordinate for the start point of the line:');
      const inputX2 = prompt('Enter the X coordinate for the end point of the line:');
      const inputY2 = '0';
      const inputZ2 = prompt('Enter the Z coordinate for the end point of the line:');

      this.x1 = parseFloat(inputX1 || '0');
      this.y1 = parseFloat(inputY1 || '0');
      this.z1 = parseFloat(inputZ1 || '0');
      this.x2 = parseFloat(inputX2 || '0');
      this.y2 = parseFloat(inputY2 || '0');
      this.z2 = parseFloat(inputZ2 || '0');
    } else {
      console.error('Invalid plane:', plane);
    }

    // Draw the line
    this.draw();
  }

  public draw(): void {
    const vertices = [this.x1, this.y1, this.z1, this.x2, this.y2, this.z2];

    // Create and bind vertex buffer
    const vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    // Set up vertex attribute
    const positionLocation = this.gl.getAttribLocation(this.gl.getParameter(this.gl.CURRENT_PROGRAM), 'a_position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0); // 3 components for 3D vertices

    // Draw the line
    this.gl.drawArrays(this.gl.LINE_STRIP, 0, 2);
  }
}

export default LineDrawer;
