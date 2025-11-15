import type { Euler, Vector3 } from "@react-three/fiber";

type BoxProps = {
  position: Vector3;
  scale: Vector3;
  rotation: Euler;
  color: string;
};

const Box = ({ position, scale, rotation, color }: BoxProps) => {
  return (
    <mesh position={position} scale={scale} rotation={rotation}>
      <boxGeometry />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

export default Box;
