import React from 'react';
import anime from'animejs/lib/anime.es.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {useFrame, useLoader, useThree} from "@react-three/fiber";
import * as THREE from "three";
const Scene = ({controls}) => {


     const heart = useLoader(GLTFLoader, './models/Heart.glb');
     const star = useLoader(GLTFLoader, './models/Star.glb');
     const brain = useLoader(GLTFLoader, './models/Brain.glb');


     const { camera } = useThree();



     useFrame(() => {

     })

     const pathToBrain = () => {

          anime({
               targets:controls.current.target,
               y:3,
               x:12,
               z:-5,
               easing:'easeOutExpo',
               loop:false,
               duration:5,
               complete:function(){
                    anime({
                         targets:camera.position,
                         y:13.6,
                         x:22.5,
                         z:-10.1,
                         easing:'easeOutExpo',
                         loop:false,
                         duration:2500,
                    });

               }
          });

     };

     const pathToHeart = () => {
          anime({
               targets:camera.position,
               y:3,
               x:0,
               z:12,
               easing:'easeOutExpo',
               loop:false,
               duration:2500,
          });


          anime({
               targets:controls.current.target,
               y:1,
               x:0,
               z:6,
               easing:'easeOutExpo',
               loop:false,
               duration:2500,
          });

     };

     const pathToStar = () => {
          anime({
               targets:camera.position,
               y:6,
               x:-8,
               z:-25,
               easing:'easeOutExpo',
               loop:false,
               duration:2500,
          });


          anime({
               targets:controls.current.target,
               y:1,
               x:-12,
               z:-13,
               easing:'easeOutExpo',
               loop:false,
               duration:2500,
          });
     };


     return (
          <>

               <primitive onClick={pathToStar}
                    onPointerOver={() => (document.body.style.cursor = "pointer")}
                    onPointerOut={() => (document.body.style.cursor = "auto")}
                    object={star.scene}
                    position={[-12, 1, -13]}
                    children-0-castShadow
               />
               <primitive onClick={pathToBrain}
                          onPointerOver={() => (document.body.style.cursor = "pointer")}
                          onPointerOut={() => (document.body.style.cursor = "auto")}
                          object={brain.scene}
                          position={[12, 3, -5]}
                          scale={0.01}
                          children-0-castShadow
               />
               <primitive onClick={pathToHeart}
                    onPointerOver={() => (document.body.style.cursor = "pointer")}
                    onPointerOut={() => (document.body.style.cursor = "auto")}
                    object={heart.scene}
                    position={[0, 0.7, 6]}
                    children-0-castShadow
               />
          </>
     );
};

export default Scene;
