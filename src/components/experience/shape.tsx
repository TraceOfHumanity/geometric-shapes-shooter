import type { Euler, Vector3 } from "@react-three/fiber";

type ShapeProps = {
  position: Vector3;
  scale: Vector3;
  rotation: Euler;
  color: string;
  shape:
    | "box"
    | "sphere"
    | "cylinder"
    | "cone"
    | "capsule"
    | "torus"
    | "torusKnot"
    | "dodecahedron"
    | "icosahedron"
    | "octahedron"
    | "tetrahedron";
};

const Shape = ({ position, scale, rotation, color, shape }: ShapeProps) => {
  return (
    <mesh position={position} scale={scale} rotation={rotation}>
      {shape === "box" && <boxGeometry />}
      {shape === "sphere" && <sphereGeometry />}
      {shape === "cylinder" && <cylinderGeometry />}
      {shape === "cone" && <coneGeometry />}
      {shape === "capsule" && <capsuleGeometry />}
      {shape === "torus" && <torusGeometry />}
      {shape === "torusKnot" && <torusKnotGeometry />}
      {shape === "dodecahedron" && <dodecahedronGeometry />}
      {shape === "icosahedron" && <icosahedronGeometry />}
      {shape === "octahedron" && <octahedronGeometry />}
      {shape === "tetrahedron" && <tetrahedronGeometry />}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Shape;
