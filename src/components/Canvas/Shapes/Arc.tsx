

class Arc 
{
  private gl: WebGLRenderingContext;
  private centerX: number;
  private centerY: number;
  private centerZ: number;
  private radius: number;
  private startAngle: number;
  private endAngle: number;

  constructor(gl: WebGLRenderingContext, plane: string) {
    this.gl = gl;
    this.centerX = 0;
    this.centerY = 0;
    this.centerZ = 0;
    this.radius = 0;
    this.startAngle = 0;
    this.endAngle = 0;

    // Prompt the user for input based on the selected plane
    if (plane === 'XY') {
      const inputX = prompt('Enter the X coordinate for the center of the arc:');
      const inputY = prompt('Enter the Y coordinate for the center of the arc:');
      const inputZ = '0';
      const inputRadius = prompt('Enter the radius of the arc:');
      const inputStartAngle = prompt('Enter the start angle of the arc :');
      const inputEndAngle = prompt('Enter the end angle of the arc :');

      this.centerX = parseFloat(inputX || '0');
      this.centerY = parseFloat(inputY || '0');
      this.centerZ = parseFloat(inputZ || '0');
      this.radius = parseFloat(inputRadius || '0');
      this.startAngle = parseFloat(inputStartAngle || '0');
      this.endAngle = parseFloat(inputEndAngle || '0');
    
      this.startAngle = this.startAngle * (0.017);
      this.endAngle = this.endAngle * (0.017);
    } else if (plane === 'YZ') {
      const inputX = '0';
      const inputY = prompt('Enter the Y coordinate for the center of the arc:');
      const inputZ = prompt('Enter the Z coordinate for the center of the arc:');
      const inputRadius = prompt('Enter the radius of the arc:');
      const inputStartAngle = prompt('Enter the start angle of the arc :');
      const inputEndAngle = prompt('Enter the end angle of the arc :');

      this.centerX = parseFloat(inputX || '0');
      this.centerY = parseFloat(inputY || '0');
      this.centerZ = parseFloat(inputZ || '0');
      this.radius = parseFloat(inputRadius || '0');
      this.startAngle = parseFloat(inputStartAngle || '0');
      this.endAngle = parseFloat(inputEndAngle || '0');
  
      this.startAngle = this.startAngle * (0.017);
      this.endAngle = this.endAngle * (0.017);
    } 
    else if (plane === 'ZX') 
    {
      const inputX = prompt('Enter the X coordinate for the center of the arc:');
      const inputY = '0';
      const inputZ = prompt('Enter the Z coordinate for the center of the arc:');
      const inputRadius = prompt('Enter the radius of the arc:');
      const inputStartAngle = prompt('Enter the start angle of the arc :');
      const inputEndAngle = prompt('Enter the end angle of the arc :');

      this.centerX = parseFloat(inputX || '0');
      this.centerY = parseFloat(inputY || '0');
      this.centerZ = parseFloat(inputZ || '0');
      this.radius = parseFloat(inputRadius || '0');
      this.startAngle = parseFloat(inputStartAngle || '0');
      this.endAngle = parseFloat(inputEndAngle || '0');

      
      this.startAngle = this.startAngle * (0.017);
      this.endAngle = this.endAngle * (0.017);

    } 
    else 
    {
      console.error('Invalid plane:', plane);
    }

    // Draw the arc
    this.draw();
  }

  public draw(): void {
    const segments = 50; // Number of line segments to approximate the arc
    const anglePerSegment = (this.endAngle - this.startAngle) / segments;
    const vertices = [];

    // Generate vertices for the arc
    for (let i = 0; i <= segments; i++) 
    {
      const angle = this.startAngle + i * anglePerSegment;
      const x = this.centerX + Math.cos(angle) * this.radius;
      const y = this.centerY + Math.sin(angle) * this.radius;
      const z = this.centerZ + Math.sin(angle) * this.radius ;
      vertices.push(x, y, z); // Adding Z coordinate for 3D
    }

    // Create and bind vertex buffer
    const vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    // Set up vertex attribute
    const positionLocation = this.gl.getAttribLocation(this.gl.getParameter(this.gl.CURRENT_PROGRAM), 'a_position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0); // 3 components for 3D vertices

    // Draw the arc
    this.gl.drawArrays(this.gl.LINE_STRIP, 0, segments + 1);
  }
}

export default Arc;
