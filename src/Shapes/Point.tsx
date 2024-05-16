import * as THREE from 'three';
import { Shape } from '../interfaces/Shape';
import Point3D from './Point3D';
class Point implements Shape {
  private Point : Point3D ;
  private plane: string;
  private vertices2d: number[] = []; // 1D array for 2D coordinates [x, y]
  private vertices3d: number[] = []; // 1D array for 3D coordinates [x, y, z]

  constructor(point : Point3D , plane: string) {
    
    this.Point = point ;
    this.plane = plane;
    
    
    this.initializeVertices();
    
  }

  private initializeVertices(): void {
    if (this.plane === 'XY') 
    {
      this.vertices2d.push(this.Point.x,this.Point.y);
      this.vertices3d.push(this.Point.x,this.Point.y,this.Point.z);
    } 
    else if (this.plane === 'ZX') 
    {
      this.vertices2d.push(this.Point.x,this.Point.y);
      this.vertices3d.push(this.Point.x,this.Point.z,this.Point.y);
    } 
     else if (this.plane === 'YZ') 
    {
      this.vertices2d.push(this.Point.x,this.Point.y);
      this.vertices3d.push(this.Point.z,this.Point.x,this.Point.y);
    }
    
  }

  public Draw2D(scene: THREE.Scene): void 
  {
    // Create a sphere geometry for the point
    const geometry = new THREE.SphereGeometry(0.1, 16, 16); // Adjust the size and detail as needed

    // Create a material for the point
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color

    // Create a mesh with the geometry and material
    const point = new THREE.Mesh(geometry, material);

    // Set the position of the point mesh
    point.position.set(this.vertices3d[0], this.vertices3d[1], this.vertices3d[2]);

    // Add the point to the scene
    scene.add(point);
  }

  public Draw3D(scene: THREE.Scene): void {
    // Create a sphere geometry for the point
    const geometry = new THREE.SphereGeometry(0.1, 16, 16); // Adjust the size and detail as needed

    // Create a material for the point
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color

    // Create a mesh with the geometry and material
    const point = new THREE.Mesh(geometry, material);

    // Set the position of the point mesh
    point.position.set(this.vertices3d[0], this.vertices3d[1], this.vertices3d[2]);

    // Add the point to the scene
    scene.add(point);
  }

  public IsPointOnPerimeter(x: number, y: number): boolean {
    // Check if the given coordinates (x, y) are the same as the coordinates of the point
    return this.Point.x === x && this.Point.y === y;
  }

}

export default Point;
