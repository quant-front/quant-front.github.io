import './App.css';
import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls, ScrollControls} from "@react-three/drei";
import {Sun} from "./components/Sun";

function App() {
  return (
    <div style={{height: "100vh"}}>
         <Canvas camera={{position: [0,0,5], fov:30}}>
              <ScrollControls pages={1}>
                   <Sun scale={0.5} />
              </ScrollControls>
              <OrbitControls enableZoom={false} />
              <Environment preset="forest" background blur={0.4}/>
         </Canvas>
    </div>
  );
}

export default App;
