
import './App.css'
import { OrbitControls, Stage, MeshReflectorMaterial} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {Model} from "./model.jsx";
import But from "./but.jsx";

function App() {
  return (
       <div className="App" style={{height: '100vh'}}>

            <Canvas camera={{position: [0, 2, 4]}} style={{background: '#0f0f0f'}}
                    gl={{antialias: true, alpha: true, powerPreference: 'high-performance'}}>

                 <color attach="background" args={["#101010"]}/>
                 <fog attach="fog" args={["#101010", 10, 20]}/>

                 <Stage environment="city" intensity={0.6} castShadow={false} />
                 <Model />
                 <But />
                  <mesh rotation={[-Math.PI / 2, 0, 0]}>
                      <planeGeometry args={[170, 170]}/>
                      <MeshReflectorMaterial
                           blur={[300, 100]}
                           resolution={2048}
                           mixBlur={1}
                           mixStrength={40}
                           roughness={1}
                           depthScale={1.2}
                           minDepthThreshold={0.4}
                           maxDepthThreshold={1.4}
                           color="#101010"
                           metalness={0.5}
                      />
                 </mesh>
                      <OrbitControls
                           autoRotate
                           minPolarAngle={Math.PI / 3.1}
                           maxPolarAngle={Math.PI / 2.3}
                           rotateSpeed={0.35}
                           panSpeed={0.1}
                           dampingFactor={0.5}
                           minDistance={4}
                           maxDistance={5}
                      />

            </Canvas>
       </div>
  )
}

export default App
