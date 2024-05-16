import * as THREE from 'three';
import { Shape } from '../interfaces/Shape';
import Point3D from './Point3D'
class Line implements Shape {
  private StartPoint : Point3D = new Point3D(0,0,0);
  private EndPoint : Point3D = new Point3D(0,0,0);
  private plane: string;
  private vertices2d: number[] = [];
  private vertices3d: number[] = [];

  constructor(StartPoint: Point3D,Endpoint: Point3D, plane: string) {
    this.StartPoint.x = StartPoint.x;
    this.StartPoint.y = StartPoint.y;
    this.StartPoint.z = StartPoint.z;
    this.EndPoint.x = Endpoint.x ;
    this.EndPoint.y = Endpoint.y ;
    this.EndPoint.z = Endpoint.z ;
    this.plane = plane;

    this.initializeVertices();
  }

  private initializeVertices(): void {
    if (this.plane === 'XY') 
    {
      this.vertices2d.push(this.StartPoint.x, this.StartPoint.y,0, this.EndPoint.x, this.EndPoint.y,0);
      this.vertices3d.push(this.StartPoint.x, this.StartPoint.y, this.StartPoint.z, this.EndPoint.x, this.EndPoint.y, this.EndPoint.z);
    } else if (this.plane === 'ZX') {
      this.vertices2d.push(this.StartPoint.x, this.StartPoint.y,0, this.EndPoint.x, this.EndPoint.y,0);
      this.vertices3d.push(this.StartPoint.x, this.StartPoint.z, this.StartPoint.y, this.EndPoint.x, this.EndPoint.z, this.EndPoint.y);
    } else if (this.plane === 'YZ') {
      this.vertices2d.push(this.StartPoint.x, this.StartPoint.y,0, this.EndPoint.x, this.EndPoint.y,0);
      this.vertices3d.push(this.StartPoint.z, this.StartPoint.x, this.StartPoint.y, this.EndPoint.z, this.EndPoint.x, this.EndPoint.y);
    }
  }

  public Draw2D(scene: THREE.Scene): void {
    // Create geometry for the line using Vector3 points
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(this.vertices2d);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // Create material for the line
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Blue color

    // Create the line object
    const line = new THREE.Line(geometry, material);

    // Add the line to the scene
    scene.add(line);
  }

  public Draw3D(scene: THREE.Scene): void {
    // Create geometry for the line using Vector3 points
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(this.vertices3d);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // Create material for the line
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Blue color

    // Create the line object
    const line = new THREE.Line(geometry, material);

    // Add the line to the scene
    scene.add(line);
  }

  public IsPointOnPerimeter(x: number, y: number): boolean {
    // Calculate the distance from the point to the line using the formula for the distance between a point and a line
    // Here, we use the formula for the distance between a point (x0, y0) and a line Ax + By + C = 0, which is given by:
    // distance = |Ax0 + By0 + C| / sqrt(A^2 + B^2)
    
    // Get the coordinates of the start and end points of the line
    const x1 = this.StartPoint.x;
    const y1 = this.StartPoint.y;
    const x2 = this.EndPoint.x;
    const y2 = this.EndPoint.y;
    
    // Calculate A, B, and C coefficients of the line equation Ax + By + C = 0
    const A = y2 - y1;
    const B = x1 - x2;
    const C = (x2 - x1) * y1 - (y2 - y1) * x1;
    
    // Calculate the numerator and denominator of the distance formula
    const numerator = Math.abs(A * x + B * y + C);
    const denominator = Math.sqrt(A * A + B * B);
    
    // Calculate the distance from the point to the line
    const distance = numerator / denominator;

    // Set a threshold for considering a point to be on the line
    const threshold = 0.1; // Adjust as needed

    // If the distance is within the threshold, consider the point to be on the line
    return distance < threshold;
  }

}

export default Line;
