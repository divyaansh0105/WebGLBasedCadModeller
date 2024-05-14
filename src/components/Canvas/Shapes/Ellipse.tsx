import * as THREE from 'three';
import { Shape } from '../Shape';

class Ellipse implements Shape {
  private centerX: number;
  private centerY: number;
  private centerZ: number;
  private radiusX: number;
  private radiusY: number;
  private radiusZ: number;
  private plane: string;

  constructor(centerX: number, centerY: number, centerZ: number, radiusX: number, radiusY: number, radiusZ: number, plane: string) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.centerZ = centerZ;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.radiusZ = radiusZ;
    this.plane = plane;
  }

  public draw(scene: THREE.Scene): void {
    const segments = 50; // Number of line segments to approximate the ellipse
    const anglePerSegment = (Math.PI * 2) / segments;

    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];

    for (let i = 0; i <= segments; i++) {
      const angle = i * anglePerSegment;
      let x = 0, y = 0, z = 0;

      switch (this.plane) {
        case 'XY':
          x = this.centerX + Math.cos(angle) * this.radiusX;
          y = this.centerY + Math.sin(angle) * this.radiusY;
          z = this.centerZ;
          vertices.push(x, y, z);
          break;
        case 'YZ':
          x = this.centerX + Math.cos(angle) * this.radiusX;
          y = this.centerY + Math.sin(angle) * this.radiusY;
          z = this.centerZ ;
          vertices.push(x, y, z);
          break;
        case 'ZX':
          x = this.centerX + Math.cos(angle) * this.radiusX;
          y = this.centerY + Math.sin(angle) * this.radiusY;
          z = this.centerZ ;
          vertices.push(x, y ,z);
          break;
        default:
          console.error('Invalid plane:', this.plane);
          return;
      }

     
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.LineBasicMaterial({ color: 0xff00ff }); // Purple color
    const ellipse = new THREE.LineLoop(geometry, material);
    

    scene.add(ellipse);
  }
}

export default Ellipse;
