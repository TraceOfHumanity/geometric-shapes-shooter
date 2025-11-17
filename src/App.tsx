import { Canvas } from "@react-three/fiber";
import Experience from "./components/experience/experience";

function App() {
  return (
    <>
      <Canvas className="w-full! h-screen! fixed! top-0! left-0!" camera={{ position: [0, 2, 10] }}>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
