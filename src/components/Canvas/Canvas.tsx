import React, { useRef, useEffect, useState } from 'react';
import { initWebGL, createShader, createProgram } from './WebGlUtils'; // Import WebGL utility functions
import Circle from './Shapes/Circle'; // Import the Circle class
import Ellipse from './Shapes/Ellipse'; // Import the Ellipse class
import Point from './Shapes/Point'; // Import the Point class
import Line from './Shapes/Line'; // Import the Line class
import Arc from './Shapes/Arc'; // Import the Arc class
import './Canvas.css'; // Import the CSS file
import {Shape} from './Shape';
import {Planes} from './Planes';

const Canvas: React.FC<{ selectedPrimitive: string | null; selectedPlane: string; View: boolean }> = ({ selectedPrimitive: SelectedPrimitive, selectedPlane: SelectedPlane, View: Viewstatus }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [planes, setPlanes] = useState<Planes>({});
  const prevSelectedPlaneRef = useRef<string | null>(null);
  const prevSelectedPrimitiveRef = useRef<string | null>(null);

  useEffect(() => 
  {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = initWebGL(canvas);
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec3 a_position;
      void main() {
        gl_Position = vec4(a_position, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    gl.useProgram(program);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Create and add new shape to the corresponding plane based on selectedPrimitive
    const addShapeToPlane = (shape: Shape, plane: string) => 
      {
      setPlanes(prevPlanes => ({
        ...prevPlanes,
        [plane]: [...(prevPlanes[plane] || []), shape]
      }));
    };

    let planechanged: Boolean;
    planechanged = SelectedPlane !== prevSelectedPlaneRef.current;

    if (!planechanged) {
      switch (SelectedPrimitive) {
        case 'Circle':
          addShapeToPlane(new Circle(gl, SelectedPlane), SelectedPlane);
          break;
        case 'Ellipse':
          addShapeToPlane(new Ellipse(gl, SelectedPlane), SelectedPlane);
          break;
        case 'Point':
          addShapeToPlane(new Point(gl, SelectedPlane), SelectedPlane);
          break;
        case 'Line':
          addShapeToPlane(new Line(gl, SelectedPlane), SelectedPlane);
          break;
        case 'Arc':
          addShapeToPlane(new Arc(gl, SelectedPlane), SelectedPlane);
          break;
        default:
          console.error('Unknown primitive:', SelectedPrimitive);
      }
      prevSelectedPrimitiveRef.current = SelectedPrimitive;
      
      
    }
  }, [SelectedPrimitive, SelectedPlane]); // Keep both SelectedPrimitive and SelectedPlane in the dependency array

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = initWebGL(canvas);
    if (!gl) return;

    const drawSelectedPlaneShapes = () => {
      gl.clear(gl.COLOR_BUFFER_BIT); // Clear the canvas before rendering
      const selectedPlaneShapes = planes[SelectedPlane] || [];
      selectedPlaneShapes.forEach(shape => shape.draw());
    };
    prevSelectedPlaneRef.current = SelectedPlane; // Update the previous selected plane
    drawSelectedPlaneShapes(); // Render all shapes on the selected plane
  }, [SelectedPlane, planes]);
  
  useEffect(() => {
    if(Viewstatus)
    { 
      const canvas = canvasRef.current;
      if (!canvas) return;

      const gl = initWebGL(canvas);
      if (!gl) return;
     //Call view function 
    }
    
  }, [Viewstatus, planes]);

  return (<canvas ref={canvasRef} className="canvas" />);
};

export default Canvas;
