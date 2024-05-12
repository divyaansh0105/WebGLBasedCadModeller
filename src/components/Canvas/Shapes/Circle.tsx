import { Shape } from '../Shape'; // Import the Shape interface

class Circle implements Shape {
  private gl: WebGLRenderingContext;
  private centerX: number;
  private centerY: number;
  private centerZ: number;
  private radius: number;
  public vertices: number[] = []; // Array to store vertices

  constructor(gl: WebGLRenderingContext, plane: string) {
    this.gl = gl;
    this.centerX = 0;
    this.centerY = 0;
    this.centerZ = 0;
    this.radius = 0;

    // Prompt the user for input
    this.Input(plane);
  }

  private Input(plane: string): void {
    if (plane === 'XY') {
      const inputX = prompt('Enter the X coordinate for the center of the circle:');
      const inputY = prompt('Enter the Y coordinate for the center of the circle:');
      const inputZ = 0;
      const inputRadius = prompt('Enter the radius of the circle:');

      const x = parseFloat(inputX || '0');
      const y = parseFloat(inputY || '0');
      const z = parseFloat(inputZ || '0');
      const r = parseFloat(inputRadius || '0');

      this.centerX = x;
      this.centerY = y;
      this.centerZ = z;
      this.radius = r;

      this.generateVertices();
    } else if (plane === 'YZ') {
      const inputX = 0;
      const inputY = prompt('Enter the Y coordinate for the center of the circle:');
      const inputZ = prompt('Enter the Z coordinate for the center of the circle:');
      const inputRadius = prompt('Enter the radius of the circle:');

      const x = parseFloat(inputX || '0');
      const y = parseFloat(inputY || '0');
      const z = parseFloat(inputZ || '0');
      const r = parseFloat(inputRadius || '0');

      this.centerX = x;
      this.centerY = y;
      this.centerZ = z;
      this.radius = r;

      this.generateVertices();
    } else {
      const inputX = prompt('Enter the X coordinate for the center of the circle:');
      const inputY = 0;
      const inputZ = prompt('Enter the Z coordinate for the center of the circle:');
      const inputRadius = prompt('Enter the radius of the circle:');

      const x = parseFloat(inputX || '0');
      const y = parseFloat(inputY || '0');
      const z = parseFloat(inputZ || '0');
      const r = parseFloat(inputRadius || '0');

      this.centerX = x;
      this.centerY = y;
      this.centerZ = z;
      this.radius = r;

      this.generateVertices();
    }
  }

  private generateVertices(): void {
    const segments = 100; // Number of line segments to approximate the circle
    const anglePerSegment = (Math.PI * 2) / segments;

    // Generate vertices for the circle in 3D
    for (let i = 0; i <= segments; i++) {
      const angle = i * anglePerSegment;
      const x = this.centerX + Math.cos(angle) * this.radius;
      const y = this.centerY + Math.sin(angle) * this.radius;
      const z = this.centerZ;
      this.vertices.push(x, y, z);
    }
  }

  public draw(): void {
    // Create and bind vertex buffer
    const vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);

    // Set up vertex attribute
    const positionLocation = this.gl.getAttribLocation(this.gl.getParameter(this.gl.CURRENT_PROGRAM), 'a_position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0); // 3 components for 3D vertices

    // Draw the circle as a solid triangle fan
    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, this.vertices.length / 3);
  }
}

export default Circle;
