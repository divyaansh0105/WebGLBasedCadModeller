import Point3D from "../Shapes/Point3D";
import {Planes} from "../interfaces/Planes"

export const Erasefun = (clickedPosition: Point3D | null, planes: Planes, setPlanes: React.Dispatch<React.SetStateAction<Planes>>) => {
    if (clickedPosition) {
        const clickedX = clickedPosition.x;
        const clickedY = clickedPosition.y;

        // Iterate through the planes and check if the clicked position is inside any shape's boundary
        const updatedPlanes = Object.keys(planes).reduce((updated, plane) => {
            const updatedShapes = planes[plane].filter(shape => {
                // Check if the clicked position is inside the area of the shape
                if (shape.IsPointOnPerimeter) {
                    return !shape.IsPointOnPerimeter(clickedX, clickedY);
                } else {
                    return true; // If the shape doesn't have the IsPointInside method, keep it
                }
            });
            return { ...updated, [plane]: updatedShapes };
        }, {});

        // Update the state with the filtered array, removing the shapes that were clicked on
        setPlanes(updatedPlanes);
    } 
}