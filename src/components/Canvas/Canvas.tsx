import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Circle from '../../Shapes/Circle';
import Ellipse from '../../Shapes/Ellipse';
import Point from '../../Shapes/Point';
import Line from '../../Shapes/Line';
import Arc from '../../Shapes/Arc';
import Point3D from '../../Shapes/Point3D';

import { handleMouseClick } from '../../functioons/MouseCoordinates';
import {Erasefun} from '../../functioons/EraseFun';
import EditFunction from '../../functioons/EditFunction';
import EditForm from '../../forms/EditForm';

import { Planes } from '../../interfaces/Planes'; // Import the Planes interface
import { Shape } from '../../interfaces/Shape';

const Canvas: React.FC<{ selectedPrimitive: string | null; selectedPlane: string; View: boolean ; FinishSketch : boolean ;Erase : boolean }> = ({
  selectedPrimitive: SelectedPrimitive,
  selectedPlane: SelectedPlane,
  View: Viewstatus,
  FinishSketch :FinsishSketchButton, 
  Erase : EraseButton
}) => 
  {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [planes, setPlanes] = useState<Planes>({});
  const [currentPlaneShapes, setCurrentPlaneShapes] = useState<Shape[]>([]);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [clickedPosition, setClickedPosition] = useState<Point3D | null>(null);
  const [GetMouseClick,SetMouseClick] = useState<string | null>("no");
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [selectedShapeProperties, setSelectedShapeProperties] = useState<{ [propertyName: string]: any }>({});
  const [showEditForm, setShowEditForm] = useState(false);
  
  const scene = new THREE.Scene();


  const handleShapeSelected = (shape: Shape, properties: { [propertyName: string]: any }) => {
    // Update state with the selected shape and its properties
    setSelectedShape(shape);
    setSelectedShapeProperties(properties);
  };

useEffect(() => {
    const handleCanvasClick = (event: MouseEvent) => 
    {   
      if(GetMouseClick==="yes") 
      {
        console.log("mouselclick registered");
        handleMouseClick(event, canvasRef, controlsRef, setClickedPosition);
      }
    };

    window.addEventListener('click', handleCanvasClick);

    return () => {
        window.removeEventListener('click', handleCanvasClick);
    };
}, [GetMouseClick]);

  useEffect(()=>
  {
   
     if(SelectedPrimitive){SetMouseClick("yes");}
     if(FinsishSketchButton)SetMouseClick("no");
     
      
  },[FinsishSketchButton,SelectedPrimitive]);

  useEffect(() => {
    if (!clickedPosition) return;
    if(EraseButton)return;
    if(FinsishSketchButton)return ;
    const addShapeToPlane = (shape: Shape, plane: string) => {
      setPlanes((prevPlanes) => ({
        ...prevPlanes,
        [plane]: [...(prevPlanes[plane] || []), shape],
      }));
    };

    switch (SelectedPrimitive) 
    {
      case 'Circle':
        const circle = new Circle(clickedPosition, 2, SelectedPlane);
        addShapeToPlane(circle, SelectedPlane);
        break;
      case 'Ellipse':
        const ellipse = new Ellipse(clickedPosition, 1, 3, 0, SelectedPlane);
        addShapeToPlane(ellipse, SelectedPlane);
        break;
      case 'Point':
        const point = new Point(clickedPosition, SelectedPlane);
        addShapeToPlane(point, SelectedPlane);
        break;
      case 'Line':
        const line = new Line(new Point3D(0, 0, 0), clickedPosition, SelectedPlane);
        addShapeToPlane(line, SelectedPlane);
        break;
      case 'Arc':
        const arc = new Arc(clickedPosition, 1.7, 35, 195, SelectedPlane);
        addShapeToPlane(arc, SelectedPlane);
        break;
      case 'Erase':
        Erasefun(clickedPosition, planes, setPlanes);
        break;
      case 'Edit':
          EditFunction({clickedPosition, planes, setPlanes,handleShapeSelected});
          break;
        default:
        console.error('Unknown primitive:', SelectedPrimitive);
    }
  }, [clickedPosition]);

  useEffect(() => {
    if (selectedShape && Object.keys(selectedShapeProperties).length > 0) {
      setShowEditForm(true);
  } 
  else 
  {
    setShowEditForm(false);
  } 
  }, [selectedShape, selectedShapeProperties]);

  useEffect(() => 
  {
    setCurrentPlaneShapes(planes[SelectedPlane] || []);
  }, [planes, SelectedPlane]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight); // Set renderer size to fit the screen
  
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
  
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controlsRef.current = controls;
  
    const renderShapes = () => {
      scene.clear(); // Clear the scene before rendering
      currentPlaneShapes.forEach((shape) => shape.Draw2D(scene)); // Render shapes of the selected plane
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
  }, [currentPlaneShapes]); // Include SelectedPlane in the dependencies
  
  

  useEffect(() => {
    // Action  when viewstatus changes
   
    if(Viewstatus)
      {
        const canvas = canvasRef.current;
        if (!canvas) return;
    
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight); // Set renderer size to fit the screen
    
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
    
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;
        controlsRef.current = controls;
    
        const renderShapes = () => {
          scene.clear();   // Clear the scene before rendering
          
          // Iterate through all planes
          console.log(planes);
          Object.values(planes).forEach((shapes: Shape[]) => 
            {
            // Render shapes of the current plane
            shapes.forEach((shape) => shape.Draw3D(scene));
          });
        
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
              
      }
  }, [Viewstatus]);





  

  return (
    <div>
      
      {showEditForm && <EditForm shape={selectedShape} properties={selectedShapeProperties} setPlanes={setPlanes} setShowEditForm={setShowEditForm} />}

      <canvas ref={canvasRef} style={{ width: '100%', height: 'calc(100% - 60px)' }} />
    </div>
  );};

export default Canvas;
