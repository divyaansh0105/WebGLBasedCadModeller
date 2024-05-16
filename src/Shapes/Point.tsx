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
    
    this.convert2dto3d();    
    this.initializeVertices();
    
  }

  
  private convert2dto3d()
  {
    if(this.plane === 'YZ')
      {
        let temp1 = this.Point.x;
        let temp2 = this.Point.y;
        let temp3 = this.Point.z;
        
        this.Point.x = temp3;
        this.Point.y = temp1;
        this.Point.z = temp2;
      }
      
    if(this.plane === 'ZX')
      {
        let temp1 = this.Point.x;
        let temp2 = this.Point.y;
        let temp3 =this.Point.z;
        
        this.Point.x = temp1;
        this.Point.y = temp3;
        this.Point.z = temp2;
      }
  }

  private initializeVertices(): void {
    if (this.plane === 'XY') 
    {
      this.vertices2d.push(this.Point.x,this.Point.y,0);
      this.vertices3d.push(this.Point.x,this.Point.y,this.Point.z);
    } 
    else if (this.plane === 'ZX') 
    {
      this.vertices2d.push(this.Point.x,this.Point.z,0);
      this.vertices3d.push(this.Point.x,this.Point.y,this.Point.z);
    } 
     else if (this.plane === 'YZ') 
    {
      this.vertices2d.push(this.Point.y,this.Point.z,0);
      this.vertices3d.push(this.Point.x,this.Point.y,this.Point.z);
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
    point.position.set(this.vertices2d[0], this.vertices2d[1], this.vertices2d[2]);

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

  public getProperties(): { [key: string]: number } {
    return {
      x: this.Point.x,
      y: this.Point.y,
      z: this.Point.z,
    };
  }

  public updateProperties(properties: { [propertyName: string]: number }): void {
    if ('x' in properties) {
      this.Point.x = properties.x;
    }
    if ('y' in properties) {
      this.Point.y = properties.y;
    }
    if ('z' in properties) {
      this.Point.z = properties.z;
    }

    this.initializeVertices();
  }
}



export default Point;
