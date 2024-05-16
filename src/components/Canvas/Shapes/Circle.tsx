import { Shape } from '../Shape';
import * as THREE from 'three';

class Circle implements Shape {
  private centerX: number;
  private centerY: number;
  private centerZ: number;
  private radius: number;
  private plane: string;

  constructor(centerX: number, centerY: number, centerZ: number, radius: number, plane: string) 
  { 
    console.log(centerX + " " + centerY + " " + centerZ );
    this.centerX = centerX;
    this.centerY = centerY;
    this.centerZ = centerZ;
    this.radius = radius;
    this.plane = plane;
  }

  public draw(scene: THREE.Scene): void {
    const segments = 100; // Number of line segments to approximate the circle
    const anglePerSegment = (Math.PI * 2) / segments;

    const geometry = new THREE.BufferGeometry(); // Create a buffer geometry
    const vertices: number[] = [];

    // Generate vertices for the circle based on the selected plane
    for (let i = 0; i <= segments; i++) {
      const angle = i * anglePerSegment;
      let x = 0, y = 0, z = 0;

      switch (this.plane) {
        case 'XY':
          x = this.centerX + Math.cos(angle) * this.radius;
          y = this.centerY + Math.sin(angle) * this.radius;
          z = this.centerZ;
          break;
        case 'YZ':
          y = this.centerY + Math.cos(angle) * this.radius;
          z = this.centerZ + Math.sin(angle) * this.radius;
          x = this.centerX;
          break;
        case 'ZX':
          x = this.centerX + Math.cos(angle) * this.radius;
          z = this.centerZ + Math.sin(angle) * this.radius;
          y = this.centerY;
          break;
        default:
          console.error('Unknown plane:', this.plane);
          break;
      }

      vertices.push(x, y, z);
    }

    // Add vertices to the buffer geometry
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // Create a line loop from the geometry
    const material = new THREE.LineBasicMaterial({ color: 0xff00ff }); // Red color
    const circle = new THREE.LineLoop(geometry, material);
    
    // Add the circle to the scene
    scene.add(circle);
  
  }
}

export default Circle;
