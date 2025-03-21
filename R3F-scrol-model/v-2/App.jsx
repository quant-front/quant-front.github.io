
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
     const [rotate, setRotate] = useState({ x: 0, y: 0, z: 0 });
     const rotationObj = { y: 0 };

     useEffect(() => {
         
          const timeline = gsap.timeline({
               scrollTrigger: {
                    trigger: mainRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                    onUpdate: (self) => {
                         setProgress(self.progress)
                    }
               }
          });

          // Первое перемещение без вращения
          timeline.to(sceneRef.current, {
               ease: 'none',
               x: '-25vw',
               y: '100vh',
          });

          // Сохраняем позицию начала второго этапа
          const secondStagePosition = timeline.duration();

          // Второе перемещение с вращением
          timeline.to(sceneRef.current, {
               ease: 'none',
               x: '25vw',
               y: '200vh',
          });

          // Сохраняем позицию конца второго этапа / начала третьего
          const thirdStagePosition = timeline.duration();

          // Третье перемещение с вращением
          timeline.to(sceneRef.current, {
               ease: 'none',
               x: '-25vw',
               y: '300vh'
          });

          // Добавляем вращение на втором этапе (поворот на 180 градусов)
          timeline.to(rotationObj, {
               y: Math.PI, // половина оборота (180 градусов)
               ease: 'none',
               onUpdate: () => {
                    setRotate({ x: 0, y: rotationObj.y, z: 0 });
               }
          }, secondStagePosition); // начинается с началом второго этапа

          // Добавляем вращение на третьем этапе (еще 180 градусов)
          timeline.to(rotationObj, {
               y: Math.PI * 2, // полный оборот (от 180 до 360 градусов)
               ease: 'none',
               onUpdate: () => {
                    setRotate({ x: 0, y: rotationObj.y, z: 0 });
               }
          }, thirdStagePosition); // начинается с началом третьего этапа

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
                              <Scene progress={progress} rotate={rotate} />
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
