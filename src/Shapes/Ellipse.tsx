import * as THREE from 'three';
import { Shape } from '../interfaces/Shape';
import  Point3D  from './Point3D';

class Ellipse implements Shape {
  private center: Point3D;
  private radiusX: number;
  private radiusY: number;
  private radiusZ: number;
  private plane: string;
  private vertices2d: number[] = [];
  private vertices3d: number[] = [];

  constructor(center: Point3D, radiusX: number, radiusY: number, radiusZ: number, plane: string) {
    this.center = center;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.radiusZ = radiusZ;
    this.plane = plane;

    this.initializeVertices();
  }

  private initializeVertices(): void {
    const segments = 50;
    const anglePerSegment = (Math.PI * 2) / segments;

    for (let i = 0; i <= segments; i++) {
      const angle = i * anglePerSegment;
      let x = 0, y = 0, z = 0;

      switch (this.plane) {
        case 'XY':
          x = this.center.x + Math.cos(angle) * this.radiusX;
          y = this.center.y + Math.sin(angle) * this.radiusY;
          z = this.center.z;
          this.vertices2d.push(x, y,0);
          this.vertices3d.push(x, y, z);
          break;
        case 'YZ':
          x = this.center.x+ Math.cos(angle) * this.radiusX;
          y = this.center.y + Math.sin(angle) * this.radiusY;
          z = this.center.z ;
          this.vertices2d.push(x, y,0);
          this.vertices3d.push(z, x, y);
          break;
        case 'ZX':
          x = this.center.x + Math.sin(angle) * this.radiusX;
          y = this.center.y+ Math.cos(angle) * this.radiusY;
          z = this.center.z ;
          this.vertices2d.push(x, y,0);
          this.vertices3d.push(x, z, y);
          break;
        default:
          console.error('Invalid plane:', this.plane);
          return;
      }
    }
  }

  public Draw2D(scene: THREE.Scene): void {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices2d, 3));

    const material = new THREE.LineBasicMaterial({ color: 0xff00ff });
    const ellipse = new THREE.LineLoop(geometry, material);

    scene.add(ellipse);
  }

  public Draw3D(scene: THREE.Scene): void {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices3d, 3));

    const material = new THREE.LineBasicMaterial({ color: 0xff00ff });
    const ellipse = new THREE.LineLoop(geometry, material);

    scene.add(ellipse);
  }

  public IsPointOnPerimeter(x: number, y: number): boolean {
    // Calculate the normalized coordinates of the point relative to the center of the ellipse
    const dx = x - this.center.x;
    const dy = y - this.center.y;
    const normalizedX = dx / this.radiusX;
    const normalizedY = dy / this.radiusY;

    // Check if the normalized coordinates satisfy the equation of the ellipse
    return Math.pow(normalizedX, 2) + Math.pow(normalizedY, 2) - 1 < 0.1; // You can adjust the threshold as needed
  }

}

export default Ellipse;
