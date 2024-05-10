import React, { useEffect, useRef } from 'react';
import { initWebGL, createShader, createProgram } from './WebGlUtils'; // Import WebGL utility functions
import drawCircle from './DrawCircle'; // Import drawCircle function
import './Canvas.css';

interface CanvasProps {
  selectedPrimitive: string | null;
}

const Canvas: React.FC<CanvasProps> = ({ selectedPrimitive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = initWebGL(canvas);
    if (!gl) return;

    glRef.current = gl;

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0, 1);
      }
    `;
    const fragmentShaderSource = `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(1, 0, 0, 1); // Red color
      }
    `;
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    if (!vertexShader) return;
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!fragmentShader) return;
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;
    gl.useProgram(program);

    // Draw based on selected primitive
    switch (selectedPrimitive) {
      case 'Circle':
        drawCircle(gl, 0, 0, 0.1); // Example parameters for circle: centerX, centerY, radius
        break;
      // Add cases for other primitives here
      default:
        break;
    }
  }, [selectedPrimitive]);

  return <canvas ref={canvasRef} className="canvas" />;
};

export default Canvas;
