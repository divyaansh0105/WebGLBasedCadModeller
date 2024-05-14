import * as THREE from 'three';
import { Shape } from '../Shape';

class Line implements Shape {
  private x1: number;
  private y1: number;
  private z1: number;
  private x2: number;
  private y2: number;
  private z2: number;

  constructor(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.z1 = z1;
    this.x2 = x2;
    this.y2 = y2;
    this.z2 = z2;
  }

  public draw(scene: THREE.Scene): void {
    // Create geometry for the line using Vector3 points
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([this.x1, this.y1, this.z1, this.x2, this.y2, this.z2]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // Create material for the line
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Blue color

    // Create the line object
    const line = new THREE.Line(geometry, material);

    // Add the line to the scene
    scene.add(line);
  }
}

export default Line;
