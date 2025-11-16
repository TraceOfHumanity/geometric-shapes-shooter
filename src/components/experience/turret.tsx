import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

const Turret = () => {
  const { nodes } = useGLTF("/turret.glb");
  const turretRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (turretRef.current) {
      const { x, y } = state.pointer;
      const angle = Math.atan2(x, y);
      turretRef.current.rotation.z = angle;
    }
  });
  return (
    <group dispose={null}>
      <mesh geometry={nodes.stand.geometry} material={nodes.stand.material} />
      <mesh
        geometry={nodes.turret.geometry}
        material={nodes.turret.material}
        position={[0, 2.3, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.3}
        ref={turretRef}
      />
    </group>
  );
};

export default Turret;
