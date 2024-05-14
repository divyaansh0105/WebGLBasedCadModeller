import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Shape } from './Shape';
import Circle from './Shapes/Circle';
import Ellipse from './Shapes/Ellipse';
import Point from './Shapes/Point';
import Line from './Shapes/Line';
import Arc from './Shapes/Arc';
import ViewButton from './ViewButton';
import { Planes } from './Planes'; // Import the Planes interface

const Canvas: React.FC<{ selectedPrimitive: string | null; selectedPlane: string; View: boolean }> = ({
  selectedPrimitive: SelectedPrimitive,
  selectedPlane: SelectedPlane,
  View: Viewstatus,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [planes, setPlanes] = useState<Planes>({});
  const [currentPlaneShapes, setCurrentPlaneShapes] = useState<Shape[]>([]);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const addShapeToPlane = (shape: Shape, plane: string) => {
      setPlanes((prevPlanes) => ({
        ...prevPlanes,
        [plane]: [...(prevPlanes[plane] || []), shape],
      }));
    };

    switch (SelectedPrimitive) {
      case 'Circle':
        //y = 3.84 + x = 6
        const circle = new Circle(0, 0, 0, 2, SelectedPlane);
        addShapeToPlane(circle, SelectedPlane);
        break;
      case 'Ellipse':
        const ellipse = new Ellipse(0, 0, 0, 1, 3, 0, SelectedPlane);
        addShapeToPlane(ellipse, SelectedPlane);
        break;
      case 'Point':
        const point = new Point(0, 0, 0);
        addShapeToPlane(point, SelectedPlane);
        break;
      case 'Line':
        const line = new Line(0, 0, 0, 1, 1, 1);
        addShapeToPlane(line, SelectedPlane);
        break;
      case 'Arc':
        const arc = new Arc(0, 0, 0, 2, 70, 125);
        addShapeToPlane(arc, SelectedPlane);
        break;
      default:
        console.error('Unknown primitive:', SelectedPrimitive);
    }

    return () => {};
  }, [SelectedPrimitive]);

  useEffect(() => {
    setCurrentPlaneShapes(planes[SelectedPlane] || []);
  }, [planes, SelectedPlane]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight); // Set renderer size to fit the screen

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controlsRef.current = controls;

    const renderShapes = () => {
      scene.clear(); // Clear the scene before rendering
      currentPlaneShapes.forEach((shape) => shape.draw(scene)); // Render shapes of the selected plane
      renderer.render(scene, camera); // Render the scene
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controlsRef.current?.update(); // Update mouse controls
      renderShapes();
    };

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderShapes();
    });

    return () => {
      scene.clear();
      renderer.dispose();
    };
  }, [currentPlaneShapes]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default Canvas;
