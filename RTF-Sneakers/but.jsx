import React from 'react';
import {useControls} from "leva";
import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

const But = () => {

     const gltf = useLoader(GLTFLoader, './model/xxl.glb');

     const vis = useControls('footbed',{
          visible: false,
     })

     return (
          <>
               <primitive
                    object={gltf.scene}
                    visible={vis.visible}
                    position={[0, 0.5, 1.5]}
                    scale={[0.1, 0.1, 0.1]}
                    children-0-castShadow={true}
               />
          </>
     );
};

export default But;
