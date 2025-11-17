import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { PerspectiveCamera as PerspectiveCameraType, Vector2 } from "three";

const Camera = ({ pointPosition }: { pointPosition: Vector2 }) => {
  const cameraRef = useRef<PerspectiveCameraType>(null);

  useFrame(() => {
    if (cameraRef.current) {
      // const [x, y, z] = cameraPosition;
      // cameraRef.current.position.set(x, y, z);
      cameraRef.current.position.set(0, 40, 40);
      cameraRef.current.lookAt(pointPosition.x/30, 0, pointPosition.y/30);
    }
  });

  return <PerspectiveCamera makeDefault fov={50} ref={cameraRef} />;
};

export default Camera;
