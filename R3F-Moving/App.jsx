
import './App.css'
import {Environment, OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import Scene from "./scene.jsx";
import {useRef} from "react";
function App() {
     const ref = useRef();

     return (
       <div style={{width: '100vw', height: '100vh'}}>
            <Canvas camera={{position: [0, 17, 45], fov: 30}}>
                 <OrbitControls ref={ref}   />
                 <gridHelper args={[30, 30, 'red', 'black']}/>
                 <Environment preset="forest" background blur={0.4}/>
                 <Scene controls={ref} />
            </Canvas>
       </div>
  )
}

export default App
