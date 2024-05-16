import * as THREE from 'three';

export interface Shape 
{
  Draw2D : (scene: THREE.Scene) => void; // Define a common draw method for all shapes
  Draw3D :(scene: THREE.Scene) => void;
  IsPointOnPerimeter : (x: number, y: number) => boolean ;
  //vertices : number[]
}