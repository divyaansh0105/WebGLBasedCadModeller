import React, { useState } from 'react';
import './Toolbar.css'; 
import circleIcon from './icons/circle.png'; 
import ellipseIcon from './icons/ellipse.png'; 
import pointIcon from './icons/point.png'; 
import lineIcon from './icons/line.png'; 
import arcIcon from './icons/arc.png'; 

interface ToolbarProps {
  onSelectPrimitive: (primitive: string) => void; // Function to notify parent component of selected primitive
  onErase?: () => void; // Function to notify parent component of erase action (optional)
}

const Toolbar: React.FC<ToolbarProps> = ({ onSelectPrimitive, onErase }) => {
  const [showPlanes, setShowPlanes] = useState(false);
  const [showShapes, setShowShapes] = useState(false);
  const [showSketchButtons, setShowSketchButtons] = useState(false);
  const [showSketchAndView, setShowSketchAndView] = useState(true); // New state to control visibility of Sketch and View buttons

  const handleSketchClick = () => {
    // Reset state when Sketch button is clicked
    setShowPlanes(true);
    setShowShapes(false);
    setShowSketchButtons(true);
    // Hide Sketch and View buttons
    setShowSketchAndView(false); 
  };

  const handleViewClick = () => {
    // Logic for view button click
    console.log('View button clicked');
    // Hide sketch buttons when switching to view mode
    setShowSketchButtons(false);
  };

  const handlePlaneButtonClick = (plane: string) => {
    // Show the shape buttons
    setShowShapes(true);
  };

  const handleShapeButtonClick = (shape: string) => {
    // Logic to handle shape button click
    console.log(`Shape ${shape} clicked`);
    // Notify parent component of selected primitive
    onSelectPrimitive(shape); 
  };

  const handleEraseClick = () => {
    // Logic for erase button click
    console.log('Erase button clicked');
    // Notify parent component of erase action if provided
    if (onErase) {
      onErase();
    }
  };

  const handleFinishSketchingClick = () => {
    // Logic for finish sketching button click
    console.log('Finish sketching button clicked');
    // Reset state when finishing sketching
    setShowSketchButtons(false);
    setShowPlanes(false);
    setShowShapes(false);
    // Show Sketch and View buttons again
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
          <button className="button plane" onClick={() => handlePlaneButtonClick('ZX')} title="Sketch on the ZX Plane">ZX-Plane</button>
         
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
