import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";
import type { Mesh, Vector2 } from "three";

type TurretProps = {
  pointPosition: Vector2;
  onShoot?: (position: Vector3, direction: Vector3) => void;
  shootInterval?: number;
  isShooting?: boolean;
};

const Turret = ({ pointPosition, onShoot, shootInterval = 0.5, isShooting = false }: TurretProps) => {
  const { nodes } = useGLTF("/turret.glb");
  const turretRef = useRef<Mesh>(null);
  const lastShootTime = useRef(0);

  useFrame((state) => {
    if (turretRef.current) {
      const { x, y } = pointPosition;
      const angle = Math.atan2(x, y);
      turretRef.current.rotation.y = angle;

      if (isShooting) {
        const currentTime = state.clock.elapsedTime;
        if (currentTime - lastShootTime.current >= shootInterval && onShoot) {
          const shootPosition = new Vector3(0, 2.3, 0);
          const direction = new Vector3(
            Math.sin(angle),
            0,
            Math.cos(angle)
          ).normalize();
          
          onShoot(shootPosition, direction);
          lastShootTime.current = currentTime;
        }
      }
    }
  });
  return (
    <group dispose={null}>
      {/* @ts-expect-error - useGLTF nodes type inference issue */}
      <mesh geometry={nodes.stand.geometry} material={nodes.stand.material} />
      <mesh
      // @ts-expect-error - useGLTF nodes type inference issue
        geometry={nodes.turret.geometry}
        // @ts-expect-error - useGLTF nodes type inference issue
        material={nodes.turret.material}
        position={[0, 2.3, 0]}
        ref={turretRef}
      />
    </group>
  );
};

export default Turret;
