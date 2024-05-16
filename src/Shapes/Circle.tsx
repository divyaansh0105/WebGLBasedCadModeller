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
    this.convert2dto3d();
    this.initializeVertices();
    
  }


  private convert2dto3d()
  {
    if(this.plane === 'YZ')
      {
        let temp1 = this.center.x;
        let temp2 = this.center.y;
        let temp3 =this.center.z;
        
        this.center.x = temp3;
        this.center.y = temp1;
        this.center.z = temp2;
      }
      
    if(this.plane === 'ZX')
      {
        let temp1 = this.center.x;
        let temp2 = this.center.y;
        let temp3 =this.center.z;
        
        this.center.x = temp1;
        this.center.y = temp3;
        this.center.z = temp2;
      }
  }
  
  private initializeVertices(): void 
  {
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
          this.vertices2d.push(x,y,z);
          this.vertices3d.push(x, y,z);
          break;
        case 'YZ':
          x = this.center.x;
          y = this.center.y + Math.cos(angle) * this.radius;
          z = this.center.z + Math.sin(angle) * this.radius ;
          this.vertices2d.push(y,z,0);
          this.vertices3d.push(x, y,z);
          break;
        case 'ZX':
          x = this.center.x + Math.sin(angle) * this.radius;
          y = this.center.y;
          z = this.center.z + Math.cos(angle) * this.radius ;
          this.vertices2d.push(x,z,0);
          this.vertices3d.push(x, y,z);
          
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
  public getProperties(): { [key: string]: number } {
    return {
      center_x: this.center.x,
      center_y: this.center.y,
      center_z: this.center.z,
      radius: this.radius,
    };
  }

  public updateProperties(properties: { [propertyName: string]: number }): void {
    // Update properties based on the provided data
    if ('center_x' in properties) 
    {
      this.center.x = properties.center_x;
    }
    if ('center_y' in properties) {
      this.center.y = properties.center_y;
    }
    if ('center_z' in properties) {
      this.center.z = properties.center_z;
    }
    if ('radius' in properties) {
      this.radius = properties.radius;
    }

    // Reinitialize vertices after updating properties
    this.vertices2d = [];
    this.vertices3d = [];
    this.convert2dto3d();
    this.initializeVertices();
    console.log("Updated");
  }
}

export default Circle;
