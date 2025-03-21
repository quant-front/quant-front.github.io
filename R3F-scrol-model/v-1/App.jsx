
import './App.css'
import {Environment, OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import Scene from "./scene.jsx";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useEffect, useRef, useState} from "react";
import  gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger)

function App() {
     const mainRef = useRef(null);
     const sceneRef = useRef(null);
     const [progress, setProgress] = useState(0);

     useEffect(() => {
     gsap.timeline({
          scrollTrigger:{
               trigger:mainRef.current,
               start:'top top',
               end:'bottom bottom',
               scrub:1,
               onUpdate:(self) => {
                  setProgress(self.progress)
               }
          }
     })
          .to(sceneRef.current, {
               ease:'none',
               x:'-25vw',
               y:'100vh'
          })
          .to(sceneRef.current, {
               ease:'none',
               x:'25vw',
               y:'200vh',
          })
          .to(sceneRef.current, {
               ease:'none',
               x:'-25vw',
               y:'300vh'
          })
     }, []);



     return (
          <main ref={mainRef}>
               <section style={{width: '99vw', height: '100vh'}}>
                    <div>
                         <p className="text-white text-center absolute top-[5%] mx-4 w-fit text-8xl font-bold" style={{fontSize:'150px', textAlign:'center', fontWeight:'bold'}}>
                              Make  impressive
                         </p>
                    </div>
                    <div ref={sceneRef} style={{width: '99vw', height: '100vh'}}>
                         <Canvas camera={{position: [0, 17, 35], fov: 30}}>
                              <Scene progress={progress}/>
                         </Canvas>
                    </div>

               </section>
               <section className={'sect-1'} style={{width: '99vw', height: '100vh'}}>
                    <p className="w-[50%] border-0 border-red-700"></p>

                    <p className="text-white w-[50%] text-center px-4 text-4xl font-semibold">
                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet aperiam aspernatur assumenda at blanditiis commodi earum eveniet excepturi fuga fugit impedit incidunt iste laborum magnam nemo non officia placeat quaerat, quas quo ratione recusandae reiciendis rerum sapiente sequi similique sunt veritatis voluptas
                    </p>
               </section>
               <section className={'sect-1'} style={{width: '99vw', height: '100vh'}}>
                    <p className="text-white order-1 w-[50%] text-center px-4 text-4xl font-semibold">
                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet aperiam aspernatur assumenda at blanditiis commodi earum eveniet excepturi fuga fugit impedit incidunt iste laborum magnam nemo non officia placeat quaerat, quas quo ratione recusandae reiciendis rerum sapiente sequi similique sunt veritatis voluptas
                    </p>
                    <p className="w-[50%] order-2"></p>
               </section>
               <section className={'sect-1'} style={{width: '99vw', height: '100vh'}}>
                    <p className="w-[50%] border-0 border-red-700"></p>

                    <p className="text-white w-[50%] text-center px-4 text-4xl font-semibold">
                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet aperiam aspernatur assumenda at blanditiis commodi earum eveniet excepturi fuga fugit impedit incidunt iste laborum magnam nemo non officia placeat quaerat, quas quo ratione recusandae reiciendis rerum sapiente sequi similique sunt veritatis voluptas voluptate. Amet!
                    </p>
               </section>
          </main>
     )
}

export default App
