import React, { useState } from 'react';
import { Shape } from '../interfaces/Shape';
import { Planes } from '../interfaces/Planes';

interface EditFormProps {
  shape: Shape | null;
  properties: { [propertyName: string]: any };
  setPlanes: React.Dispatch<any>;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditForm: React.FC<EditFormProps> = ({ shape, properties, setPlanes,setShowEditForm }) => {
  // State to manage form inputs
  const [formData, setFormData] = useState<{ [propertyName: string]: any }>(properties);

  // Function to handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  // Function to handle form submission
// Function to handle form submission
const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  if (!shape) return; // Ensure shape is not null

  // Update shape properties based on formData
  console.log(formData);
  shape.updateProperties(formData);

  // Then update the state with the modified planes
  setPlanes((prevPlanes: Planes) => {
    const updatedPlanes = { ...prevPlanes };

    // Iterate through all plane shapes to find and update the specific shape
    for (const planeShapes of Object.values(updatedPlanes)) {
      for (const s of planeShapes) {
        if (s === shape) {
          // Update the properties of the found shape
          Object.assign(s, formData);
          break; // Stop iterating once the shape is found and updated
        }
      }
    }
    
    return updatedPlanes;
  });

  // Hide the edit form after saving changes
  setShowEditForm(false);
  
};


  // Render the form only if shape is not null
  if (!shape) {
    return null;
  }
  return (
    <div style={{ backgroundColor: 'rgb(127, 31, 113)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>Edit Shape</h2>
      <form onSubmit={handleSubmit}>
        {/* Dynamically generate form fields based on shape properties */}
        {Object.entries(properties).map(([propertyName, propertyValue]) => (
          <div key={propertyName} style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', marginRight: '10px' }}>{propertyName}:</label>
            <input
              type="text"
              name={propertyName}
              value={formData[propertyName] || ''}
              onChange={handleChange}
              style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditForm;