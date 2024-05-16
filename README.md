# WebGLBasedCAD Modeller

WebGLBasedCAD Modeller is a web-based computer-aided design (CAD) modeller built using WebGL, React, and TypeScript. It allows users to create fundamental geometric shapes like points, lines, circles, ellipses, and arcs on a chosen plane in a virtual environment.

## Getting Started

### Prerequisites

- A modern web browser with WebGL support (most modern browsers support WebGL).
- Node.js and npm (or yarn) installed on your system. You can verify their versions by running `node -v` and `npm -v` (or `yarn -v`) in your terminal.

### Installation

1. Clone or download the project repository.
2. Navigate to the project directory: `cd path/to/your/project`
3. Install dependencies: `npm install` (or `yarn install`)

### Running the Project

1. Start the development server: `npm start` (or `yarn start`)
2. Open [http://localhost:3000](http://localhost:3000) (or the specified development port) in your web browser.
3. The CAD modeller should launch and allow you to create shapes.

## Using the Project

The project offers functionalities for creating and editing shapes in a 3D environment:

### Entering Sketch Mode

- Press the "Sketch" button to enter the shape creation mode.
- The interface might transition to provide options for selecting the plane where you want to draw the shape.

### Plane Selection (If applicable)

- Choose the desired plane (e.g., XY, XZ, YZ) where you want to create the shape. This might involve selecting from a menu or using visual cues.

### Shape Creation

- Select the desired primitive shape from the provided interface elements (buttons, menus, etc.).
- Set the shape's parameters (e.g., coordinates, lengths for lines, radii, angles, directions) using input fields or sliders.
- Once the parameters are set, click on the 3D canvas where you want to create the shape.

### Shape Editing (Note that this functionality might be under development)

- You can edit the shapes you create using the "Edit" function. This functionality might involve:
  - Dragging the shape's vertices or control points directly on the canvas.
  - Adjusting the shape's parameters through input fields or sliders.
  - Using specific editing tools provided by the interface (if available).

### Viewing Created Shapes

- All the shapes you create and edit will be visible in the 3D scene, allowing you to visualize your design.

## Features

The project boasts the following features:

- **Primitive Shape Generation:** Users can create essential building blocks for geometric constructions on a chosen plane.
  - **Points:** Represent a specific location on the selected plane.
  - **Lines:** Connect two points on the plane, creating a straight path.
  - **Circles:** Create flat, circular shapes on the chosen plane.
  - **Ellipses:** Create oval shapes on the plane with customizable dimensions.
  - **Arcs:** Generate curved segments of circles on the plane, defining by start and end angles, radius, and direction. (If applicable based on your implementation)
- **Shape Parameterization:** Users can set properties for each primitive (e.g., coordinates, lengths for lines, radii, angles, directions) to achieve desired geometries.
- **React-based Frontend:** The user interface is built with React for component-based development and efficient rendering.
- **TypeScript for Type Safety:** TypeScript provides type annotations for improved code maintainability and reduced runtime errors.
- **WebGL Rendering:** The project utilizes WebGL and three.js to render the shapes and scene with clear visualization.

## Technical Details

Here's a breakdown of the technologies used in the project:

- **Frontend:** [React](https://react.dev/)
- **Type Safety:** [TypeScript](https://www.typescriptlang.org/)
- **3D Rendering:** WebGL with [three.js](https://threejs.org/)
- **Other Technologies:** HTML, CSS

## Contributing

We welcome contributions to this project! Please see the `CONTRIBUTING.md` file (if it exists) for details on how to contribute code, report issues, or suggest improvements.

## Snapshots

![Screenshot (166)](https://github.com/divyaansh0105/WebGLBasedCadModeller/assets/158050858/c053a917-90b4-40d8-a6bd-7f943bfbb056)
![Screenshot (165)](https://github.com/divyaansh0105/WebGLBasedCadModeller/assets/158050858/7bbe18c0-6a1c-478e-99b3-ee83687631b8)
![Screenshot (164)](https://github.com/divyaansh0105/WebGLBasedCadModeller/assets/158050858/828e197c-6aef-4970-9a94-8a460b35e300)
![Screenshot (163)](https://github.com/divyaansh0105/WebGLBasedCadModeller/assets/158050858/15e5b651-6fea-4c69-a5f7-a0f5cbcc3682)
![Screenshot (160)](https://github.com/divyaansh0105/WebGLBasedCadModeller/assets/158050858/f0b1e4dd-2461-4894-8775-7545ec6fb3c1)

