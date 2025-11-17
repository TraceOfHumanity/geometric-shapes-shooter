import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, Vector2 } from "three";

const Turret = ({ pointPosition }: { pointPosition: Vector2 }) => {
  const { nodes } = useGLTF("/turret.glb");
  const turretRef = useRef<Mesh>(null);

  useFrame(() => {
    if (turretRef.current) {
      const { x, y } = pointPosition;
      const angle = Math.atan2(x, y);
      turretRef.current.rotation.y = angle;
    }
  });
  return (
    <group dispose={null}>
      <mesh geometry={nodes.stand.geometry} material={nodes.stand.material} />
      <mesh
        geometry={nodes.turret.geometry}
        material={nodes.turret.material}
        position={[0, 2.3, 0]}
        ref={turretRef}
      />
    </group>
  );
};

export default Turret;
