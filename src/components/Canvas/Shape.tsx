import * as THREE from 'three';

export interface Shape 
{
  draw: (scene: THREE.Scene) => void; // Define a common draw method for all shapes
  //vertices : number[]
}