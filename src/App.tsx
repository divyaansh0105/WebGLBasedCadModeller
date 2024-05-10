import React, { useState } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Canvas from './components/Canvas/Canvas';

import './App.css';

const App: React.FC = () => {
  const [selectedPrimitive, setSelectedPrimitive] = useState<string | null>(null);

  const handlePrimitiveSelection = (primitive: string) => {
    if (primitive === 'Erase') {
      // If erase button is clicked, reset selectedPrimitive to null
      setSelectedPrimitive(null);
    } else {
      setSelectedPrimitive(primitive);
    }
  };
//
  return (
    <div>
      <Toolbar onSelectPrimitive={handlePrimitiveSelection} />
      <Canvas selectedPrimitive={selectedPrimitive} /> {/* Pass selectedPrimitive as a prop */}
    </div>
  );
};

export default App;
