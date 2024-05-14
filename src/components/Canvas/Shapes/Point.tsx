import * as THREE from 'three';
import { Shape } from '../Shape';

class Point implements Shape {
  private x: number;
  private y: number;
  private z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public draw(scene: THREE.Scene): void {
    // Create a sphere geometry for the point
    const geometry = new THREE.SphereGeometry(0.1, 16, 16); // Adjust the size and detail as needed

    // Create a material for the point
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color

    // Create a mesh with the geometry and material
    const point = new THREE.Mesh(geometry, material);

    // Set the position of the point mesh
    point.position.set(this.x, this.y, this.z);

    // Add the point to the scene
    scene.add(point);
  }
}

export default Point;
