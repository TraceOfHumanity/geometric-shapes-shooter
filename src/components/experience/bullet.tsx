import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";

type BulletProps = {
  position: Vector3;
  direction: Vector3;
  speed?: number;
  onDestroy?: () => void;
};

const Bullet = ({ position, direction, speed = 10, onDestroy }: BulletProps) => {
  const bulletRef = useRef<Mesh>(null);
  const distanceTraveled = useRef(0);
  const maxDistance = 50;

  useFrame((_, delta) => {
    if (bulletRef.current) {
      const moveDistance = speed * delta;
      bulletRef.current.position.add(
        direction.clone().multiplyScalar(moveDistance)
      );
      distanceTraveled.current += moveDistance;

      if (distanceTraveled.current >= maxDistance) {
        onDestroy?.();
      }
    }
  });

  return (
    <mesh ref={bulletRef} position={position}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.5} />
    </mesh>
  );
};

export default Bullet;
