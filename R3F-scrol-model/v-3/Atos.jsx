import React, {useEffect, useRef, useState} from 'react';
import {Canvas, useFrame, useLoader,} from "@react-three/fiber";
import { TextureLoader } from 'three';
import * as THREE from "three";

import anime from'animejs/lib/anime.es.js';
import {Environment, ScrollControls, useScroll} from "@react-three/drei";

const ScrollAnimation = () => {
     return (
          <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
               <Canvas>
                    <ScrollControls pages={4} damping={0.2}> {/* 3 pages = 300vh */}
                         <Scene/>
                    </ScrollControls>
                    <gridHelper args={[20, 20, 'red', 'black']}/>
                    <Environment preset="forest" background blur={0.2}/>
               </Canvas>

          </div>
     );
};

// Scene component
const Scene = () => {
     return (
          <>
               <ambientLight intensity={0.5} />
               <pointLight position={[10, 10, 10]} />
               <ScrollableMesh />
          </>
     );
};

// The mesh that will animate based on scroll position
const ScrollableMesh = () => {
     const meshRef = useRef();
     const materialRef = useRef();

     // Use drei's useScroll hook to get scroll data
     const data = useScroll();

     // Set up anime.js animation target
     const animeValues = useRef({
          posX: 0,
          posY: 0,
          opacity: 0.2
     });

     // Create anime.js timeline once
     const timeline = useRef(null);

     useEffect(() => {
          // Initialize the timeline
          timeline.current = anime.timeline({
               autoplay: false,
               duration: 100, // Full scroll range is 0-100%
               easing: 'easeOutQuad',
               update: function() {
                    // Update happens in useFrame
               }
          });

          // Add animation steps
          timeline.current
               // First animation: move down (0-25%)
               .add({
                    targets: animeValues.current,
                    posY: 2,
                    opacity: 0.4,
                    duration: 25
               })
               // Second animation: move left (25-50%)
               .add({
                    targets: animeValues.current,
                    posX: -2,
                    opacity: 0.6,
                    duration: 25
               })
               // Third animation: move down more (50-75%)
               .add({
                    targets: animeValues.current,
                    posY: -4,
                    opacity: 0.8,
                    duration: 25
               })
               // Fourth animation: move left more (75-100%)
               .add({
                    targets: animeValues.current,
                    posX: -4,
                    opacity: 1.0,
                    duration: 25
               });
     }, []);

     // Use useFrame to update on each frame based on scroll position
     useFrame(() => {
          if (timeline.current && meshRef.current && materialRef.current) {
               // Get scroll position (0-1)
               const scrollY = data.offset;

               // Convert to percentage (0-100) for anime.js timeline
               const scrollProgress = scrollY * 100;

               // Seek the animation timeline to the current scroll position
               timeline.current.seek(scrollProgress);

               // Apply values directly from animeValues to mesh
               meshRef.current.position.x = animeValues.current.posX;
               meshRef.current.position.y = animeValues.current.posY;
               materialRef.current.opacity = animeValues.current.opacity;
          }
     });

     return (
          <mesh ref={meshRef}>
               <boxGeometry args={[1, 1, 1]} />
               <meshStandardMaterial
                    ref={materialRef}
                    color="hotpink"
                    opacity={0.2}
                    transparent
               />
          </mesh>
     );
};

export default ScrollAnimation;
