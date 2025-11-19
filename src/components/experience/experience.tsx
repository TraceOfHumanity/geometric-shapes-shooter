import Light from "./light";
import Turret from "./turret";
import { useState, useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";
import Camera from "./camera";
import Bullet from "./bullet";
import Enemy from "./enemy";

type BulletData = {
  id: string;
  position: Vector3;
  direction: Vector3;
};

type EnemyData = {
  id: string;
  startPosition: Vector3;
  currentPosition: Vector3;
  shape: "box" | "sphere" | "cylinder" | "cone" | "capsule" | "torus" | "torusKnot" | "dodecahedron" | "icosahedron" | "octahedron" | "tetrahedron";
  color: string;
};

const shapes: EnemyData["shape"][] = [
  "box", "sphere", "cylinder", "cone", "capsule",
  "torus", "torusKnot", "dodecahedron", "icosahedron",
  "octahedron", "tetrahedron"
];

const colors = [
  "red", "blue", "green", "yellow", "purple",
  "orange", "pink", "brown", "gray", "cyan", "magenta"
];

const SPAWN_DISTANCE = 30;
const SPAWN_INTERVAL = 2;
const COLLISION_DISTANCE = 2.5;

const Experience = () => {
  const [pointPosition, setPointPosition] = useState<Vector2>(
    new Vector2(0, 0),
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [bullets, setBullets] = useState<BulletData[]>([]);
  const [enemies, setEnemies] = useState<EnemyData[]>([]);
  const lastSpawnTime = useRef(0);
  const bulletIdCounter = useRef(0);
  const enemyIdCounter = useRef(0);

  const handleShoot = useCallback((position: Vector3, direction: Vector3) => {
    setBullets((prev) => [
      ...prev,
      {
        id: `bullet-${bulletIdCounter.current++}`,
        position: position.clone(),
        direction: direction.clone(),
      },
    ]);
  }, []);

  const handleBulletDestroy = useCallback((id: string) => {
    setBullets((prev) => prev.filter((bullet) => bullet.id !== id));
  }, []);

  const handleBulletPositionUpdate = useCallback((id: string, position: Vector3) => {
    setBullets((prev) =>
      prev.map((bullet) =>
        bullet.id === id ? { ...bullet, position } : bullet
      )
    );
  }, []);

  const handleEnemyDestroy = useCallback((id: string) => {
    setEnemies((prev) => prev.filter((enemy) => enemy.id !== id));
  }, []);

  const handleEnemyReachCenter = useCallback((id: string) => {
    console.log(`Enemy ${id} reached center!`);
    handleEnemyDestroy(id);
  }, [handleEnemyDestroy]);

  const spawnEnemy = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const startPosition = new Vector3(
      Math.cos(angle) * SPAWN_DISTANCE,
      1,
      Math.sin(angle) * SPAWN_DISTANCE
    );

    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    setEnemies((prev) => [
      ...prev,
      {
        id: `enemy-${enemyIdCounter.current++}`,
        startPosition,
        currentPosition: startPosition.clone(),
        shape,
        color,
      },
    ]);
  }, []);

  const handleEnemyPositionUpdate = useCallback((id: string, position: Vector3) => {
    setEnemies((prev) =>
      prev.map((enemy) =>
        enemy.id === id ? { ...enemy, currentPosition: position } : enemy
      )
    );
  }, []);

  const checkCollisions = useCallback(() => {
    setBullets((prevBullets) => {
      const bulletsToRemove = new Set<string>();
      
      setEnemies((prevEnemies) => {
        const enemiesToRemove = new Set<string>();

        prevBullets.forEach((bullet) => {
          prevEnemies.forEach((enemy) => {
            const distance = bullet.position.distanceTo(enemy.currentPosition);
            
            if (distance < COLLISION_DISTANCE) {
              bulletsToRemove.add(bullet.id);
              enemiesToRemove.add(enemy.id);
            }
          });
        });

        enemiesToRemove.forEach((id) => handleEnemyDestroy(id));
        return prevEnemies.filter((enemy) => !enemiesToRemove.has(enemy.id));
      });
      
      return prevBullets.filter((bullet) => !bulletsToRemove.has(bullet.id));
    });
  }, [handleEnemyDestroy]);

  useFrame((state) => {
    const currentTime = state.clock.elapsedTime;
    
    if (currentTime - lastSpawnTime.current >= SPAWN_INTERVAL) {
      spawnEnemy();
      lastSpawnTime.current = currentTime;
    }

    checkCollisions();
  });

  return (
    <>
      <Light />
      <Turret pointPosition={pointPosition} onShoot={handleShoot} isShooting={isMouseDown} />
      <Camera pointPosition={pointPosition} />
      
      {bullets.map((bullet) => (
        <Bullet
          key={bullet.id}
          position={bullet.position}
          direction={bullet.direction}
          onDestroy={() => handleBulletDestroy(bullet.id)}
          onPositionUpdate={(position) => handleBulletPositionUpdate(bullet.id, position)}
        />
      ))}

      {enemies.map((enemy) => (
        <Enemy
          key={enemy.id}
          id={enemy.id}
          startPosition={enemy.startPosition}
          targetPosition={new Vector3(0, 1, 0)}
          shape={enemy.shape}
          color={enemy.color}
          onReachCenter={handleEnemyReachCenter}
          onDestroy={handleEnemyDestroy}
          onPositionUpdate={handleEnemyPositionUpdate}
        />
      ))}

      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[100, 100, 100]}
        onPointerMove={(event) => {
          setPointPosition(new Vector2(event.point.x, event.point.z));
        }}
        onPointerDown={(event) => {
          if (event.button === 0) {
            setIsMouseDown(true);
          }
        }}
        onPointerUp={(event) => {
          if (event.button === 0) {
            setIsMouseDown(false);
          }
        }}
        onPointerLeave={() => {
          setIsMouseDown(false);
        }}
      >
        <planeGeometry />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default Experience;
