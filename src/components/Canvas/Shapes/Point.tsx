class PointDrawer {
  private gl: WebGLRenderingContext;
  private x: number;
  private y: number;
  private z: number;

  constructor(gl: WebGLRenderingContext, plane: string) {
    this.gl = gl;
    this.x = 0;
    this.y = 0;
    this.z = 0;

    // Prompt the user for input based on the selected plane
    if (plane === 'XY') {
      const inputX = prompt('Enter the X coordinate for the point:');
      const inputY = prompt('Enter the Y coordinate for the point:');
      const inputZ = '0';

      this.x = parseFloat(inputX || '0');
      this.y = parseFloat(inputY || '0');
      this.z = parseFloat(inputZ || '0');
    } else if (plane === 'YZ') {
      const inputX = '0';
      const inputY = prompt('Enter the Y coordinate for the point:');
      const inputZ = prompt('Enter the Z coordinate for the point:');

      this.x = parseFloat(inputX || '0');
      this.y = parseFloat(inputY || '0');
      this.z = parseFloat(inputZ || '0');
    } else if (plane === 'ZX') {
      const inputX = prompt('Enter the X coordinate for the point:');
      const inputY = '0';
      const inputZ = prompt('Enter the Z coordinate for the point:');

      this.x = parseFloat(inputX || '0');
      this.y = parseFloat(inputY || '0');
      this.z = parseFloat(inputZ || '0');
    } else {
      console.error('Invalid plane:', plane);
    }

    // Draw the point
    this.draw();
  }

  public draw(): void {
    const vertices = [this.x, this.y, this.z]; // Include Z coordinate for 3D point

    // Create and bind vertex buffer
    const vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    // Set up vertex attribute
    const positionLocation = this.gl.getAttribLocation(this.gl.getParameter(this.gl.CURRENT_PROGRAM), 'a_position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0); // 3 components for 3D point

    // Draw the point
    this.gl.drawArrays(this.gl.POINTS, 0, 1);
  }
}

export default PointDrawer;
