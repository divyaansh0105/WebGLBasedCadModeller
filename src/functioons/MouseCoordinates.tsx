import * as THREE from 'three';
import Point3D  from '../Shapes/Point3D';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const handleMouseClick = (event: MouseEvent, canvasRef: React.RefObject<HTMLCanvasElement>, controlsRef: React.RefObject<OrbitControls>, setClickedPosition: React.Dispatch<React.SetStateAction<Point3D | null>>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
    const mouseY = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

    if (mouseX >= -1 && mouseX <= 1 && mouseY >= -1 && mouseY <= 1) {
        // Store the clicked position
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(mouseX, mouseY);

        const camera = controlsRef.current?.object;
        if (!camera) return;
        raycaster.setFromCamera(mouse, camera);

        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const intersectionPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersectionPoint);

        console.log(intersectionPoint);
        setClickedPosition(new Point3D(intersectionPoint.x, intersectionPoint.y, intersectionPoint.z));
    }
};
