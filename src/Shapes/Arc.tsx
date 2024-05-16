import * as THREE from 'three';
import { Shape } from '../interfaces/Shape';
import Point3D from './Point3D';

class Arc implements Shape {
  private Center: Point3D = new Point3D(0, 0, 0);
  private Radius: number;
  private StartAngle: number;
  private EndAngle: number;
  private plane: string;
  private Vertices2D: number[] = [];
  private Vertices3D: number[] = [];

  constructor(Center: Point3D, radius: number, startAngle: number, endAngle: number, plane: string) {
    this.Center.x = Center.x;
    this.Center.y = Center.y;
    this.Center.z = Center.z;
    this.Radius = radius;
    this.StartAngle = startAngle * 0.0174533;
    this.EndAngle = endAngle * 0.0174533;
    this.plane = plane;

    // Initialize Vertices2D and Vertices3D based on the plane
    this.initializeVertices();
  }

  private initializeVertices(): void {
    const segments = 50; // Number of line segments to approximate the arc
    const anglePerSegment = (this.EndAngle - this.StartAngle) / segments;

    for (let i = 0; i <= segments; i++) {
      const angle = this.StartAngle + i * anglePerSegment;
      let x = 0, y = 0, z = 0;

      switch (this.plane) {
        case 'XY':
          x = this.Center.x + Math.cos(angle) * this.Radius;
          y = this.Center.y + Math.sin(angle) * this.Radius;
          z = this.Center.z;
          this.Vertices2D.push(x, y,0);
          this.Vertices3D.push(x, y, z);    
          break;
        
          case 'YZ':
          x = this.Center.x + Math.cos(angle) * this.Radius;
          y = this.Center.y + Math.sin(angle) * this.Radius;
          z = this.Center.z ;
          this.Vertices2D.push(x, y,0);
          this.Vertices3D.push(z, x, y);
          break;
        
        case 'ZX':
          x = this.Center.x + Math.cos(angle) * this.Radius;
          y = this.Center.y + Math.sin(angle) * this.Radius;
          z = this.Center.z ;
          this.Vertices2D.push(x, y,0);
          this.Vertices3D.push(x, z, y);
          break;
        
          default:
          console.error('Invalid plane:', this.plane);
          break;
      }

    }
  }

  public Draw2D(scene: THREE.Scene): void {
    // Create a geometry for the arc in 2D space
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.Vertices2D, 3));

    // Create a material for the arc
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red color

    // Create the line object
    const arcLine = new THREE.Line(geometry, material);

    // Add the arc to the scene
    scene.add(arcLine);
  }

  public Draw3D(scene: THREE.Scene): void {
    // Create a geometry for the arc in 3D space
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.Vertices3D, 3));

    // Create a material for the arc
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red color

    // Create the line object
    const arcLine = new THREE.Line(geometry, material);

    // Add the arc to the scene
    scene.add(arcLine);
  }

  public IsPointOnPerimeter(x: number, y: number): boolean {
    // Iterate through each point on the arc and check if the distance between the point and (x, y) is within a threshold
    for (let i = 0; i < this.Vertices2D.length; i += 3) {
      const arcX = this.Vertices2D[i];
      const arcY = this.Vertices2D[i + 1];

      // Calculate the distance between the point and the current point on the arc
      const distance = Math.sqrt(Math.pow(x - arcX, 2) + Math.pow(y - arcY, 2));

      // If the distance is within a threshold, consider the point to be on the perimeter of the arc
      if (Math.abs(distance - this.Radius) < 0.1) {
        return true;
      }
    }

    return false; // The point is not on the perimeter of the arc
  }

}

export default Arc;
