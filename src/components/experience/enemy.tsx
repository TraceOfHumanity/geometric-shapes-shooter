import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Vector3 } from "three";
import Shape from "./shape";

type EnemyProps = {
  id: string;
  startPosition: Vector3;
  targetPosition: Vector3;
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
  color: string;
  speed?: number;
  onReachCenter?: (id: string) => void;
  onDestroy?: (id: string) => void;
};

const Enemy = ({
  id,
  startPosition,
  targetPosition,
  shape,
  color,
  speed = 2,
  onReachCenter,
  onDestroy,
}: EnemyProps) => {
  const enemyRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (enemyRef.current) {
      const currentPos = enemyRef.current.position;
      const direction = new Vector3()
        .subVectors(targetPosition, currentPos)
        .normalize();

      const moveDistance = speed * delta;
      const newPosition = currentPos
        .clone()
        .add(direction.multiplyScalar(moveDistance));

      const distanceToTarget = newPosition.distanceTo(targetPosition);

      if (distanceToTarget < 0.5) {
        onReachCenter?.(id);
        onDestroy?.(id);
      } else {
        enemyRef.current.position.copy(newPosition);

        const rotationSpeed = 2;
        enemyRef.current.rotation.x += rotationSpeed * delta;
        enemyRef.current.rotation.y += rotationSpeed * delta;
      }
    }
  });

  return (
    <group ref={enemyRef} position={startPosition}>
      <Shape
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        color={color}
        shape={shape}
      />
    </group>
  );
};

export default Enemy;
