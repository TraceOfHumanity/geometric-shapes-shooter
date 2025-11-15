import { OrbitControls } from "@react-three/drei";
import Light from "./light";
import Shape from "./shape";

const Experience = () => {
  return (
    <>
      <Light />
      <OrbitControls />
      <Shape
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        color="red"
        shape="box"
      />
      <Shape
        position={[2, 0, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        color="blue"
        shape="sphere"
      />
      <Shape
        position={[4, 0, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        color="green"
        shape="cylinder"
      />
      <Shape
        position={[-2, 0, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        color="yellow"
        shape="cone"
      />
      <Shape
        position={[-4, 0, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        color="purple"
        shape="capsule"
      />
      <Shape
        position={[0, 2, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        color="orange"
        shape="torus"
      />
      <Shape
        position={[0, -2, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        color="pink"
        shape="torusKnot"
      />
      <Shape
        position={[2, 2, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        color="brown"
        shape="dodecahedron"
      />
      <Shape
        position={[-2, -2, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        color="gray"
        shape="icosahedron"
      />
      <Shape
        position={[2, -2, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        color="black"
        shape="octahedron"
      />
      <Shape
        position={[-2, 2, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        color="white"
        shape="tetrahedron"
      />
    </>
  );
};

export default Experience;
