import { Shape } from '../interfaces/Shape';
import * as THREE from 'three';
import Point3D from './Point3D';

class Circle implements Shape {
  private center: Point3D;
  private radius: number;
  private plane: string;
  private vertices2d: number[] = [];
  private vertices3d: number[] = [];

  constructor(center: Point3D, radius: number, plane: string) {
    this.center = center;
    this.radius = radius;
    this.plane = plane;
    this.initializeVertices();
  }

  private initializeVertices(): void {
    const segments = 100; // Number of line segments to approximate the circle
    const anglePerSegment = (Math.PI * 2) / segments;

    for (let i = 0; i <= segments; i++) {
      const angle = i * anglePerSegment;
      let x = 0, y = 0, z = 0;

      switch (this.plane) {
        case 'XY':
          x = this.center.x + Math.cos(angle) * this.radius;
          y = this.center.y + Math.sin(angle) * this.radius;
          z = this.center.z;
          this.vertices2d.push(x, y,0);
          this.vertices3d.push(x, y, z);
          break;
        case 'YZ':
          x = this.center.x + Math.cos(angle) * this.radius;
          y = this.center.y + Math.sin(angle) * this.radius;
          z = this.center.z ;
          this.vertices2d.push(x, y,0);
          this.vertices3d.push(z, x, y);
          break;
        case 'ZX':
          x = this.center.x + Math.sin(angle) * this.radius;
          y = this.center.y + Math.cos(angle) * this.radius;
          z = this.center.z ;
          this.vertices2d.push(x, y,0);
          this.vertices3d.push(x, z, y);
          break;
        default:
          console.error('Unknown plane:', this.plane);
          break;
      }
    }
  }

  public Draw2D(scene: THREE.Scene): void {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices2d, 3));
  
    const material = new THREE.LineBasicMaterial({ color: 0xff00ff }); // Purple color
    const circle = new THREE.LineLoop(geometry, material);
  
    scene.add(circle);
  }
  

  public Draw3D(scene: THREE.Scene): void {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices3d, 3));

    const material = new THREE.LineBasicMaterial({ color: 0xff00ff }); // Purple color
    const circle = new THREE.LineLoop(geometry, material);

    scene.add(circle);
  }

  public IsPointOnPerimeter(x: number, y: number): boolean {
    // Calculate the distance between the point (x, y) and the center of the circle
    const distance = Math.sqrt(Math.pow(x - this.center.x, 2) + Math.pow(y - this.center.y, 2));
    
    // Check if the distance is approximately equal to the radius of the circle
    return Math.abs(distance - this.radius) < 0.1; // You can adjust the threshold as needed
  }

}

export default Circle;
