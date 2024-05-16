import React from 'react';
import EditForm from '../forms/EditForm';
import Point3D from '../Shapes/Point3D';
import { Shape } from '../interfaces/Shape';
import { Planes } from '../interfaces/Planes';
const EditFunction: React.FC<{
    clickedPosition: Point3D | null;
    planes: Planes;
    setPlanes: React.Dispatch<any>;
    handleShapeSelected: (shape: Shape, properties: { [propertyName: string]: any }) => void; // Define handleShapeSelected prop
  }> = ({ clickedPosition, planes, setPlanes, handleShapeSelected }) => {
    if (!clickedPosition) return null;
  
    let shapeToEdit: Shape | null = null;
    let properties: { [propertyName: string]: any } = {};
  
    // Find the shape to edit
    for (const planeShapes of Object.values(planes)) {
      for (const shape of planeShapes) {
        if (shape.IsPointOnPerimeter && shape.IsPointOnPerimeter(clickedPosition.x, clickedPosition.y)) {
          shapeToEdit = shape;
          break;
        }
      }
      if (shapeToEdit) break;
    }
  
    if (!shapeToEdit) return null;
  
    if (shapeToEdit.getProperties) {
      properties = shapeToEdit.getProperties();
    }
  
    // Call handleShapeSelected to update the selected shape and its properties
    handleShapeSelected(shapeToEdit, properties);
  
    return null; // EditFunction doesn't render anything directly
  };
  export default EditFunction;
  