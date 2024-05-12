

class EllipseDrawer 
{
  private gl: WebGLRenderingContext;
  private centerX: number;
  private centerY: number;
  private centerZ: number;
  private radiusX: number;
  private radiusY: number;
  private radiusZ: number;

  constructor(gl: WebGLRenderingContext, plane: string) {
    this.gl = gl;
    this.centerX = 0;
    this.centerY = 0;
    this.centerZ = 0;
    this.radiusX = 0;
    this.radiusY = 0;
    this.radiusZ = 0;

    // Prompt the user for input based on the selected plane
    if (plane === 'XY') {
      const inputX = prompt('Enter the X coordinate for the center of the ellipse:');
      const inputY = prompt('Enter the Y coordinate for the center of the ellipse:');
      const inputZ = '0';
      const inputRadiusX = prompt('Enter the X radius of the ellipse:');
      const inputRadiusY = prompt('Enter the Y radius of the ellipse:');
      const inputRadiusZ = 0;

      this.centerX = parseFloat(inputX || '0');
      this.centerY = parseFloat(inputY || '0');
      this.centerZ = parseFloat(inputZ || '0');
      this.radiusX = parseFloat(inputRadiusX || '0');
      this.radiusY = parseFloat(inputRadiusY || '0');
      this.radiusZ = parseFloat(inputRadiusZ || '0');
    } else if (plane === 'YZ') {
      const inputX = '0';
      const inputY = prompt('Enter the Y coordinate for the center of the ellipse:');
      const inputZ = prompt('Enter the Z coordinate for the center of the ellipse:');
      const inputRadiusX = 0;
      const inputRadiusY = prompt('Enter the Y radius of the ellipse:');
      const inputRadiusZ = prompt('Enter the Z radius of the ellipse:');

      this.centerX = parseFloat(inputX || '0');
      this.centerY = parseFloat(inputY || '0');
      this.centerZ = parseFloat(inputZ || '0');
      this.radiusX = parseFloat(inputRadiusX || '0');
      this.radiusY = parseFloat(inputRadiusY || '0');
      this.radiusZ = parseFloat(inputRadiusZ || '0');
    } else if (plane === 'ZX') {
      const inputX = prompt('Enter the X coordinate for the center of the ellipse:');
      const inputY = '0';
      const inputZ = prompt('Enter the Z coordinate for the center of the ellipse:');
      const inputRadiusX = prompt('Enter the X radius of the ellipse:');
      const inputRadiusY = 0;
      const inputRadiusZ = prompt('Enter the Z radius of the ellipse:');

      this.centerX = parseFloat(inputX || '0');
      this.centerY = parseFloat(inputY || '0');
      this.centerZ = parseFloat(inputZ || '0');
      this.radiusX = parseFloat(inputRadiusX || '0');
      this.radiusY = parseFloat(inputRadiusY || '0');
      this.radiusZ = parseFloat(inputRadiusZ || '0');
    } else {
      console.error('Invalid plane:', plane);
    }

    // Draw the ellipse
    this.draw();
  }

  public draw(): void {
    const segments = 50; // Number of line segments to approximate the ellipse
    const anglePerSegment = (Math.PI * 2) / segments;
    const vertices = [];

    // Generate vertices for the ellipse in 3D
    for (let i = 0; i <= segments; i++) {
      
      const angle = i * anglePerSegment;
      const x = this.centerX + Math.cos(angle) * this.radiusX;
      const y = this.centerY + Math.sin(angle) * this.radiusY;
      const z = this.centerZ + Math.sin(angle) * this.radiusZ; // Z coordinate for 3D ellipse
      vertices.push(x, y, z);
    }

    // Create and bind vertex buffer
    const vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    // Set up vertex attribute
    const positionLocation = this.gl.getAttribLocation(this.gl.getParameter(this.gl.CURRENT_PROGRAM), 'a_position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0); // 3 components for 3D vertices

    // Draw the ellipse in 3D
    this.gl.drawArrays(this.gl.LINE_STRIP, 0, segments + 1);
  }
}

export default EllipseDrawer;
