import { Planes } from './Planes';
import { createShader, createProgram } from './WebGlUtils';
import { mat4 } from 'gl-matrix'; // Import mat4 for matrix operations

class ViewButton {
  private gl: WebGLRenderingContext;
  private rotationX: number;
  private rotationY: number;
  private lastMouseX: number;
  private lastMouseY: number;
  private isDragging: boolean;
  private program: WebGLProgram | null;
  private planes: Planes;

  constructor(gl: WebGLRenderingContext, planes: Planes) {
    this.gl = gl;
    this.rotationX = 0;
    this.rotationY = 0;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.isDragging = false;
    this.program = this.initProgram(); // Initialize the program
    this.planes = planes;

    this.initEventListeners();
    this.render(); // Trigger initial rendering
  }

  private initProgram(): WebGLProgram | null {
    // Define vertex shader source code
    const vertexShaderSource = `
      attribute vec3 a_position;
      void main() {
        gl_PointSize = 5.0; // Set the point size to 5 pixels
        gl_Position = vec4(a_position, 1.0);
      }
    `;

    // Define fragment shader source code
    const fragmentShaderSource = `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Set color to blue
      }
    `;

    // Compile vertex shader
    const vertexShader = createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return null;

    // Create shader program
    const program = createProgram(this.gl, vertexShader, fragmentShader);
    return program;
  }

  private initEventListeners(): void {
    const canvas = this.gl.canvas as HTMLCanvasElement;

    canvas.addEventListener('mousedown', (event: MouseEvent) => {
      this.isDragging = true;
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
    });

    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      if (!this.isDragging) return;

      const deltaX = event.clientX - this.lastMouseX;
      const deltaY = event.clientY - this.lastMouseY;
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;

      this.rotationY += deltaX * 0.01;
      this.rotationX += deltaY * 0.01;

      this.render(); // Re-render on mouse move
    });

    canvas.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
  }

  public render(): void {
    if (!this.gl || !this.program) return;

    // Clear the canvas
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT); // Add DEPTH_BUFFER_BIT for depth buffer

    // Enable depth testing for correct rendering of 3D shapes
    this.gl.enable(this.gl.DEPTH_TEST);

    // Set up the viewport and perspective projection
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    const aspect = this.gl.canvas.width / this.gl.canvas.height;
    const fov = Math.PI / 4;
    const near = 0.1;
    const far = 1000;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fov, aspect, near, far);

    // Create view matrix to apply rotation
    const viewMatrix = mat4.create();
    mat4.translate(viewMatrix, viewMatrix, [0, 0, -5]); // Move the camera back along z-axis
    mat4.rotateX(viewMatrix, viewMatrix, this.rotationX);
    mat4.rotateY(viewMatrix, viewMatrix, this.rotationY);

    // Use shader program
    this.gl.useProgram(this.program);

    // Get the attribute location for the position
    const positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');

    // Iterate over planes and shapes to render vertices
    Object.values(this.planes).forEach(plane => {
      plane.forEach(shape => {
       // const vertices = shape.vertices;
        // Create a buffer for the vertices
        const vertexBuffer = this.gl.createBuffer();
        if (!vertexBuffer) return;

        // Bind the buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        //this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        // Enable the position attribute
        this.gl.enableVertexAttribArray(positionAttributeLocation);

        // Specify how to pull the data out of the buffer
        this.gl.vertexAttribPointer(positionAttributeLocation, 3, this.gl.FLOAT, false, 0, 0);

        // Draw the shape as lines
        //this.gl.drawArrays(this.gl.LINE_STRIP, 0, vertices.length / 3);
      });
    });
  }
}

export default ViewButton;
