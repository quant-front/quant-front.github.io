
import React, {useEffect, useRef, useState} from 'react'
import { useGLTF } from '@react-three/drei'
import { Color } from 'three'
import {useControls} from "leva";


export function Model(props) {
     const { nodes, materials } = useGLTF('./model/1shoes.gltf');
     const [hovered, setHovered] = useState(false);

     const meshRef = useRef(null);

     useEffect(() => {
          document.body.style.cursor = hovered ? 'pointer' : 'auto'
     }, [hovered])



     useEffect(() => {
          if (meshRef.current) {
               // console.log(meshRef.current.children[0]);
          }

     }, [meshRef]);

     useControls('Shoes', () => {
          // console.log('creating color pickers')

          // using reduce
          return Object.keys(materials).reduce(
               (acc, m) =>
                    Object.assign(acc, {
                         [m]: {
                              value:
                                   '#' +
                                   ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),

                              onChange: (v) => {
                                   materials[m].color = new Color(v);
                                   // console.log( materials[m].color);
                              },
                         },
                    }),
               {}
          )
     })


     return (
          <group {...props} dispose={null}
                 onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById('Shoes.' + e.object.material.name).focus()
                 }}
                 onPointerOver={() => setHovered(true)}
                 onPointerOut={() => setHovered(false)}
          >
               <group rotation={[-Math.PI / 2, 0, 0]} scale={0.001} position={[0,0.5,0]} >
                    <group rotation={[Math.PI / 2, 0, 0]}>
                         <group rotation={[Math.PI, 0, 0]} scale={100} ref={meshRef}>
                              <mesh geometry={nodes['Shoes-0'].geometry} material={materials['Shoes-0']} />
                              <mesh geometry={nodes['Shoes-10'].geometry} material={materials['Shoes-10']} />
                              <mesh geometry={nodes['Shoes-1'].geometry} material={materials['Shoes-1']} />
                              <mesh geometry={nodes['Shoes-2'].geometry} material={materials['Shoes-2']} />
                              <mesh geometry={nodes['Shoes-3'].geometry} material={materials['Shoes-3']} />
                              <mesh geometry={nodes['Shoes-4'].geometry} material={materials['Shoes-4']} />
                              <mesh geometry={nodes['Shoes-5'].geometry} material={materials['Shoes-7']} />
                              <mesh geometry={nodes['Shoes-6'].geometry} material={materials['Shoes-6']} />
                              <mesh geometry={nodes['Shoes-7'].geometry} material={materials['Shoes-7']} />
                              <mesh geometry={nodes['Shoes-8'].geometry} material={materials['Shoes-8']} />
                              <mesh geometry={nodes['Shoes-9'].geometry} material={materials['Shoes-9']} />
                         </group>
                    </group>
               </group>
          </group>
     )
}

useGLTF.preload('./model/1shoes.gltf');
