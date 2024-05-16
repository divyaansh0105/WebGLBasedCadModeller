import React, { useState } from 'react';
import './Toolbar.css'; 
import circleIcon from './icons/circle.png'; 
import ellipseIcon from './icons/ellipse.png'; 
import pointIcon from './icons/point.png'; 
import lineIcon from './icons/line.png'; 
import arcIcon from './icons/arc.png'; 


interface ToolbarProps {
  OnSelectPrimitive: (primitive: string) => void;
  OnSelectPlane: (plane: string) => void;
  OnErase : (erase : boolean) => void;
  OnViewClick: (clicked: boolean) => void; 
  OnFinishSketchClick: (finishclicked : boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ OnSelectPrimitive, OnSelectPlane, OnErase, OnViewClick ,OnFinishSketchClick}) => {
  const [showPlanes, setShowPlanes] = useState(false);
  const [showShapes, setShowShapes] = useState(false);
  const [showSketchButtons, setShowSketchButtons] = useState(false);
  const [showSketchAndView, setShowSketchAndView] = useState(true);
  const [Viewbutton, setView] = useState(false);
  const [Finishbuton,SetFinish] = useState(false);
  const [EraseButton,SetErase] = useState(true);

  const handleSketchClick = () => {
    setShowPlanes(true);
    setShowShapes(false);
    setShowSketchButtons(true);
    setShowSketchAndView(false);
    SetFinish(!Finishbuton); 
    OnFinishSketchClick(Finishbuton);
    console.log("finsha =" + Finishbuton);
   
  };

  const handleViewClick = () => {
    console.log('View button clicked');
    // Toggle the boolean value
    setView(!Viewbutton);
    OnViewClick(Viewbutton); 
    setShowSketchButtons(false);
  };

  const handlePlaneButtonClick = (plane: string) => {
    setShowShapes(true);
    console.log(`Plane ${plane} choosen`);
    OnSelectPlane(plane);
  };

  const handleShapeButtonClick = (shape: string) =>
  {
    console.log(`Shape ${shape} clicked`);
    OnSelectPrimitive(shape); 
   
  };

  const handleEraseClick = () => 
  {

    SetErase(!EraseButton);
    OnErase(EraseButton);
      
  };

  const handleFinishSketchingClick = () => {
    console.log('Finish sketching button clicked');
    
    SetFinish(!Finishbuton);
    OnFinishSketchClick(Finishbuton);
    setShowSketchButtons(false);
    setShowPlanes(false);
    setShowShapes(false);
    setShowSketchAndView(true); 
  };

  return (
    <div className="toolbar flex bg-blue-500">
      {showSketchAndView && (
        <>
          <button className="button sketch-view" onClick={handleSketchClick} title="Start Sketching">✏️</button>
          <button className="button sketch-view" onClick={handleViewClick} title="View the sketch">👁️</button>
        </>
      )}
      {showPlanes && (
        <>
          <button className="button plane" onClick={() => handlePlaneButtonClick('XY')} title="Sketch on the XY Plane">XY-Plane</button>
          <button className="button plane" onClick={() => handlePlaneButtonClick('YZ')} title="Sketch on the YZ Plane">YZ-Plane</button>
          <button className="button plane" onClick={() => handlePlaneButtonClick('ZX')} title="Sketch on the ZX Plane">XZ-Plane</button>
        </>
      )}
      {showShapes && (
        <>
          <button className="button shape" onClick={() => handleShapeButtonClick('Point')} style={{ backgroundImage: `url(${pointIcon})` }} title="Point"></button>
          <button className="button shape" onClick={() => handleShapeButtonClick('Circle')} style={{ backgroundImage: `url(${circleIcon})` }} title="Circle"></button>
          <button className="button shape ellipse" onClick={() => handleShapeButtonClick('Ellipse')} style={{ backgroundImage: `url(${ellipseIcon})` }} title="Ellipse"></button>
          <button className="button shape" onClick={() => handleShapeButtonClick('Arc')} style={{ backgroundImage: `url(${arcIcon})` }} title="Arc"></button>
          <button className="button shape" onClick={() => handleShapeButtonClick('Line')} style={{ backgroundImage: `url(${lineIcon})` }} title="Line"></button>
        </>
      )}
      {showSketchButtons && (
        <>
          <button className="button erase-finish" onClick={handleEraseClick} title="Erase">Erase</button>
          <button className="button erase-finish" onClick={handleFinishSketchingClick} title="Finish Sketch">✅</button>
        </>
      )}
    </div>
  );
};

export default Toolbar;
