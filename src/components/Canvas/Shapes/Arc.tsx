import * as THREE from 'three';
import { Shape } from '../Shape';

class Arc implements Shape {
  private centerX: number;
  private centerY: number;
  private centerZ: number;
  private radius: number;
  private startAngle: number;
  private endAngle: number;

  constructor(centerX: number, centerY: number, centerZ: number, radius: number, startAngle: number, endAngle: number) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.centerZ = centerZ;
    this.radius = radius;
    this.startAngle = startAngle * 0.0174533;
    this.endAngle = endAngle * 0.0174533;
  }

  public draw(scene: THREE.Scene): void 
  {
    const segments = 50; // Number of line segments to approximate the arc
    const anglePerSegment = (this.endAngle - this.startAngle) / segments;
   
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const angle = this.startAngle + i * anglePerSegment;
      const x = this.centerX + Math.cos(angle) * this.radius;
      const y = this.centerY + Math.sin(angle) * this.radius;
      const z = this.centerZ; // Assuming it's a 2D arc
      points.push(new THREE.Vector3(x, y, z));
    }

    // Create a path using the points
    const arcPath = new THREE.CatmullRomCurve3(points);

    // Create a geometry based on the path
    const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPath.getPoints(segments));

    // Create a material for the arc
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red color

    // Create the line object
    const arcLine = new THREE.Line(arcGeometry, material);

    
    // Add the arc to the scene
    scene.add(arcLine);
  }
}

export default Arc;
