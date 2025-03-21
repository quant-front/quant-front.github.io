import React, { useRef } from 'react';
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Scene = ({ progress, rotate }) => {
     const gltf = useLoader(GLTFLoader, './model/Heart.glb');
     const modelRef = useRef(null);
     const cameraRef = useRef(null);

     useFrame(() => {
          cameraRef.current.lookAt(0, 0, 0);
     });

     return (
          <>
               <PerspectiveCamera
                    ref={cameraRef}
                    fov={45}
                    near={0.1}
                    far={10000}
                    makeDefault
                    position={[0, 2.5, 5]}
               />
               <Environment preset="city" />
               <primitive
                    ref={modelRef}
                    scale={2.0}
                    object={gltf.scene}
                    position={[0, 0.8, 0]}
                    rotation={[rotate.x, rotate.y, rotate.z]}
                    children-0-castShadow
               />
          </>
     );
};

export default Scene;
