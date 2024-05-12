import React, { useState } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Canvas from './components/Canvas/Canvas';

import './App.css';

const App: React.FC = () => {
  const [selectedPrimitive, setSelectedPrimitive] = useState<string | null>(null);
  const [selectedPlane, setSelectedPlane] = useState<string >('XY'); // Initialize selected plane to null
  const [Eraseclicked,setErase] = useState<string>('No');
  const [ViewClicked,SetView] = useState<boolean>(false);

  const handlePrimitiveSelection = (primitive: string) => 
  {
    if (primitive === 'Erase') 
    {
      setSelectedPrimitive(null);
    } else 
    {
      setSelectedPrimitive(primitive);
    }
  };

  const handlePlaneSelection = (plane: string) => {
    setSelectedPlane(plane);
  };
  
  const HandleViewClick = (clicked :boolean) =>
  {
      SetView(clicked);
  };

  return (
    <div>
      <Toolbar OnSelectPrimitive={handlePrimitiveSelection}  OnSelectPlane={handlePlaneSelection } OnViewClick={HandleViewClick} /> {/* Pass onSelectPlane callback */}
      <Canvas selectedPrimitive={selectedPrimitive} selectedPlane={selectedPlane}  View = {ViewClicked} /> {/* Pass selectedPlane to Canvas */}
    </div>
  );
};

export default App;
