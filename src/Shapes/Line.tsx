import * as THREE from 'three';
import { Shape } from '../interfaces/Shape';
import Point3D from './Point3D'
class Line implements Shape {
  private StartPoint : Point3D = new Point3D(0,0,0);
  private EndPoint : Point3D = new Point3D(0,0,0);
  private plane: string;
  private vertices2d: number[] = [];
  private vertices3d: number[] = [];

  constructor(StartPoint: Point3D,Endpoint: Point3D, plane: string) {
    this.StartPoint.x = StartPoint.x;
    this.StartPoint.y = StartPoint.y;
    this.StartPoint.z = StartPoint.z;
    this.EndPoint.x = Endpoint.x ;
    this.EndPoint.y = Endpoint.y ;
    this.EndPoint.z = Endpoint.z ;
    this.plane = plane;

    this.convert2dto3d();
    this.initializeVertices();
  }

  private convert2dto3d()
  {
    if(this.plane === 'YZ')
      {
        let temp1 = this.EndPoint.x;
        let temp2 = this.EndPoint.y;
        let temp3 = this.EndPoint.z;
        
        this.EndPoint.x = temp3;
        this.EndPoint.y = temp1;
        this.EndPoint.z = temp2;
      }
      
    if(this.plane === 'ZX')
      {
        let temp1 = this.EndPoint.x;
        let temp2 = this.EndPoint.y;
        let temp3 = this.EndPoint.z;
        
        this.EndPoint.x = temp1;
        this.EndPoint.y = temp3;
        this.EndPoint.z = temp2;
      }
  }
  private initializeVertices(): void {
    if (this.plane === 'XY') 
    {
      this.vertices2d.push(this.StartPoint.x, this.StartPoint.y,this.StartPoint.z, this.EndPoint.x, this.EndPoint.y,this.EndPoint.z);
      this.vertices3d.push(this.StartPoint.x, this.StartPoint.y, this.StartPoint.z, this.EndPoint.x, this.EndPoint.y, this.EndPoint.z);
    } else if (this.plane === 'ZX') {
      this.vertices2d.push(this.StartPoint.x, this.StartPoint.y,this.StartPoint.z, this.EndPoint.x, this.EndPoint.z,this.EndPoint.y);
      this.vertices3d.push(this.StartPoint.x, this.StartPoint.y, this.StartPoint.z, this.EndPoint.x, this.EndPoint.y, this.EndPoint.z);
    } else if (this.plane === 'YZ') {
      this.vertices2d.push(this.StartPoint.x, this.StartPoint.y,this.StartPoint.z, this.EndPoint.y, this.EndPoint.z,this.EndPoint.x);
      this.vertices3d.push(this.StartPoint.x, this.StartPoint.y, this.StartPoint.z, this.EndPoint.x, this.EndPoint.y, this.EndPoint.z);
    }
  }

  public Draw2D(scene: THREE.Scene): void {
    // Create geometry for the line using Vector3 points
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(this.vertices2d);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // Create material for the line
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Blue color

    // Create the line object
    const line = new THREE.Line(geometry, material);

    // Add the line to the scene
    scene.add(line);
  }

  public Draw3D(scene: THREE.Scene): void {
    // Create geometry for the line using Vector3 points
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(this.vertices3d);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // Create material for the line
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Blue color

    // Create the line object
    const line = new THREE.Line(geometry, material);

    // Add the line to the scene
    scene.add(line);
  }

  public IsPointOnPerimeter(x: number, y: number): boolean {
    // Calculate the distance from the point to the line using the formula for the distance between a point and a line
    // Here, we use the formula for the distance between a point (x0, y0) and a line Ax + By + C = 0, which is given by:
    // distance = |Ax0 + By0 + C| / sqrt(A^2 + B^2)
    
    // Get the coordinates of the start and end points of the line
    const x1 = this.StartPoint.x;
    const y1 = this.StartPoint.y;
    const x2 = this.EndPoint.x;
    const y2 = this.EndPoint.y;
    
    // Calculate A, B, and C coefficients of the line equation Ax + By + C = 0
    const A = y2 - y1;
    const B = x1 - x2;
    const C = (x2 - x1) * y1 - (y2 - y1) * x1;
    
    // Calculate the numerator and denominator of the distance formula
    const numerator = Math.abs(A * x + B * y + C);
    const denominator = Math.sqrt(A * A + B * B);
    
    // Calculate the distance from the point to the line
    const distance = numerator / denominator;

    // Set a threshold for considering a point to be on the line
    const threshold = 0.1; // Adjust as needed

    // If the distance is within the threshold, consider the point to be on the line
    return distance < threshold;
  }

  
  public getProperties(): { [key: string]: number } {
    return {
      start_point_x: this.StartPoint.x,
      start_point_y: this.StartPoint.y,
      start_point_z: this.StartPoint.z,
      end_point_x: this.EndPoint.x,
      end_point_y: this.EndPoint.y,
      end_point_z: this.EndPoint.z,
    };
  }

  public updateProperties(properties: { [propertyName: string]: number }): void {
    if ('start_point_x' in properties) {
      this.StartPoint.x = properties.start_point_x;
    }
    if ('start_point_y' in properties) {
      this.StartPoint.y = properties.start_point_y;
    }
    if ('start_point_z' in properties) {
      this.StartPoint.z = properties.start_point_z;
    }
    if ('end_point_x' in properties) {
      this.EndPoint.x = properties.end_point_x;
    }
    if ('end_point_y' in properties) {
      this.EndPoint.y = properties.end_point_y;
    }
    if ('end_point_z' in properties) {
      this.EndPoint.z = properties.end_point_z;
    }

    this.vertices2d =[];
    this.vertices3d =[];
    this.convert2dto3d();
    this.initializeVertices();
  }
}

export default Line;
