import React, { useState } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Canvas from './components/Canvas/Canvas';

import './App.css';

const App: React.FC = () => 
{
  const [selectedPrimitive, setSelectedPrimitive] = useState<string | null>(null);
  const [selectedPlane, setSelectedPlane] = useState<string >('XY'); // Initialize selected plane to null
  const [Eraseclicked,SetErase] = useState<boolean>(false);
  const [ViewClicked,SetView] = useState<boolean>(false);
  const [FinishSketchClicked,SetFinishSketch] = useState<boolean>(false);

  const handlePrimitiveSelection = (primitive: string) => 
  {
   
    
      setSelectedPrimitive(primitive);
    
  };

  const handlePlaneSelection = (plane: string) => {
    setSelectedPlane(plane);
  };
  
  const HandleViewClick = (clicked :boolean) =>
  {
      SetView(clicked);
  };

  const HandleFinishSketchClick = (clicked : boolean) =>
  {
        SetFinishSketch(clicked);
  };

  const HandleEraseClick = (clicked : boolean) =>
    {
      SetErase(clicked);
    };

  return (
    <div>
      <Toolbar OnSelectPrimitive={handlePrimitiveSelection}  OnSelectPlane={handlePlaneSelection } OnViewClick={HandleViewClick}  OnFinishSketchClick = {HandleFinishSketchClick} OnErase={HandleEraseClick} /> {/* Pass onSelectPlane callback */}
      <Canvas selectedPrimitive={selectedPrimitive} selectedPlane={selectedPlane}  View = {ViewClicked} FinishSketch = {FinishSketchClicked} Erase = {Eraseclicked}  /> {/* Pass selectedPlane to Canvas */}
    </div>
  );
};

export default App;
