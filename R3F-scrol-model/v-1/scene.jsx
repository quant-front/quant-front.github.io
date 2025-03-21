import React, {useEffect, useRef} from 'react';
import  gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Environment, PerspectiveCamera} from "@react-three/drei";
gsap.registerPlugin(ScrollTrigger)
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {useFrame, useLoader} from "@react-three/fiber";

const Scene = ({progress}) => {

     const gltf = useLoader(GLTFLoader, './model/Heart.glb');

     const cameraRef = useRef(null);

     useFrame(() => {
          cameraRef.current.lookAt(0,0,0)
     })
     useEffect(() => {
          const updateCamPos =() => {
               const positions = [
                    [3.5,2.17,3.7],
                    [3.7,0.6,0.7],
                    [2.3,0.87,3.7],
                    [0,2.5,3.6],
               ]

               if (progress >= 1) {
                    gsap.to(cameraRef.current.position, {
                         x:0,
                         y:2.5,
                         z:3.6,
                         duration:0.5,
                         ease:'power1.out'
                    })

               }else {
                    const segmentProgress =  1/3;
                    const segmentIndex = Math.floor(progress / segmentProgress)
                    const percent  = (progress % segmentProgress) /segmentProgress;
                    const [startX,startY,startZ] = positions[segmentIndex];
                    const [endX,endY,endZ] = positions[segmentIndex+1];
                    const x = startX + (endX - startX) * percent;
                    const y = startY + (endY - startY) * percent;
                    const z = startZ + (endZ - startZ) * percent;

                    gsap.to(cameraRef.current.position,{
                         x:x,
                         y:y,
                         z:z,
                         duration:.1,
                         ease:'power1.out'
                    })
               }


          };
          updateCamPos()
     }, [progress,cameraRef.current]);




     return (
          <>
               <PerspectiveCamera ref={cameraRef} fov={45} near={0.1} far={10000} makeDefault position={[3.5,2.17,3.7]} />
               <Environment preset="city"/>
               <primitive
                    scale={2.0}
                    object={gltf.scene}
                    position={[0, 0.8, 0]}
                    children-0-castShadow
               />
          </>
     );
};

export default Scene;
