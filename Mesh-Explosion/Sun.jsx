
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Sun(props) {
  const { nodes, materials } = useGLTF('/models/full-sun.glb')

    const group = useRef();


    useEffect(() => {
        const groupWorldPosition = new THREE.Vector3();
        group.current.getWorldPosition(groupWorldPosition);

        group.current.children.forEach((mesh) => {
            mesh.originalPosition = mesh.position.clone();
            const meshWorldPosition = new THREE.Vector3();
            mesh.getWorldPosition(meshWorldPosition);

            mesh.directionVector = meshWorldPosition
                 .clone()
                 .sub(groupWorldPosition)
                 .normalize();
            mesh.targetPosition = mesh.originalPosition
                 .clone()
                 .add(mesh.directionVector.clone().multiplyScalar(1.5));
        });
    }, []);


    const scrollData = useScroll();

    useFrame(() => {
        group.current.children.forEach((mesh) => {
            if (scrollData.offset < 0.0001) {
                if (mesh.name === "origin") {
                    mesh.visible = true;
                } else {
                    mesh.visible = false;
                }
            } else {
                if (mesh.name === "origin") {
                    mesh.visible = false;
                } else {
                    mesh.visible = true;
                }
            }

            mesh.position.x = THREE.MathUtils.lerp(
                 mesh.originalPosition.x,
                 mesh.targetPosition.x,
                 scrollData.offset // 0 at the beginning and 1 after scroll
            );
            mesh.position.y = THREE.MathUtils.lerp(
                 mesh.originalPosition.y,
                 mesh.targetPosition.y,
                 scrollData.offset // 0 at the beginning and 1 after scroll
            );
            mesh.position.z = THREE.MathUtils.lerp(
                 mesh.originalPosition.z,
                 mesh.targetPosition.z,
                 scrollData.offset // 0 at the beginning and 1 after scroll
            );
        });
    });



    return (
    <group {...props} dispose={null} ref={group}>
      <mesh name="origin" geometry={nodes.origin.geometry} material={materials.sun} />
      <mesh name="sun_cell" geometry={nodes.sun_cell.geometry} material={materials.sun} position={[-0.408, 0.055, -0.3]} />
      <mesh name="sun_cell001" geometry={nodes.sun_cell001.geometry} material={materials.sun} position={[0.042, -0.265, -0.409]} />
      <mesh name="sun_cell002" geometry={nodes.sun_cell002.geometry} material={materials.sun} position={[-0.238, 0.101, 0.422]} />
      <mesh name="sun_cell003" geometry={nodes.sun_cell003.geometry} material={materials.sun} position={[-0.28, -0.415, 0.17]} />
      <mesh name="sun_cell004" geometry={nodes.sun_cell004.geometry} material={materials.sun} position={[-0.228, -0.291, -0.348]} />
      <mesh name="sun_cell005" geometry={nodes.sun_cell005.geometry} material={materials.sun} position={[-0.073, -0.142, 0.473]} />
      <mesh name="sun_cell006" geometry={nodes.sun_cell006.geometry} material={materials.sun} position={[-0.148, -0.301, 0.449]} />
      <mesh name="sun_cell007" geometry={nodes.sun_cell007.geometry} material={materials.sun} position={[-0.025, -0.401, -0.274]} />
      <mesh name="sun_cell008" geometry={nodes.sun_cell008.geometry} material={materials.sun} position={[0.33, 0.1, 0.367]} />
      <mesh name="sun_cell009" geometry={nodes.sun_cell009.geometry} material={materials.sun} position={[0.421, -0.106, -0.166]} />
      <mesh name="sun_cell010" geometry={nodes.sun_cell010.geometry} material={materials.sun} position={[0.454, 0.268, 0.02]} />
      <mesh name="sun_cell011" geometry={nodes.sun_cell011.geometry} material={materials.sun} position={[-0.088, -0.445, 0.222]} />
      <mesh name="sun_cell012" geometry={nodes.sun_cell012.geometry} material={materials.sun} position={[0.03, -0.519, -0.066]} />
      <mesh name="sun_cell013" geometry={nodes.sun_cell013.geometry} material={materials.sun} position={[0.235, -0.064, 0.438]} />
      <mesh name="sun_cell014" geometry={nodes.sun_cell014.geometry} material={materials.sun} position={[-0.175, 0.373, 0.255]} />
      <mesh name="sun_cell015" geometry={nodes.sun_cell015.geometry} material={materials.sun} position={[-0.102, 0.466, 0.045]} />
      <mesh name="sun_cell016" geometry={nodes.sun_cell016.geometry} material={materials.sun} position={[-0.527, 0.027, 0.108]} />
      <mesh name="sun_cell017" geometry={nodes.sun_cell017.geometry} material={materials.sun} position={[-0.465, -0.131, 0.066]} />
      <mesh name="sun_cell018" geometry={nodes.sun_cell018.geometry} material={materials.sun} position={[0.442, 0.085, -0.222]} />
      <mesh name="sun_cell019" geometry={nodes.sun_cell019.geometry} material={materials.sun} position={[-0.319, 0.023, -0.451]} />
      <mesh name="sun_cell020" geometry={nodes.sun_cell020.geometry} material={materials.sun} position={[0.245, 0.391, -0.175]} />
      <mesh name="sun_cell021" geometry={nodes.sun_cell021.geometry} material={materials.sun} position={[0.154, 0.303, -0.448]} />
      <mesh name="sun_cell022" geometry={nodes.sun_cell022.geometry} material={materials.sun} position={[-0.325, 0.141, 0.315]} />
      <mesh name="sun_cell023" geometry={nodes.sun_cell023.geometry} material={materials.sun} position={[-0.044, -0.353, 0.346]} />
      <mesh name="sun_cell024" geometry={nodes.sun_cell024.geometry} material={materials.sun} position={[0.415, 0.255, -0.301]} />
      <mesh name="sun_cell025" geometry={nodes.sun_cell025.geometry} material={materials.sun} position={[0.052, 0.386, -0.276]} />
      <mesh name="sun_cell026" geometry={nodes.sun_cell026.geometry} material={materials.sun} position={[0.407, -0.215, -0.1]} />
      <mesh name="sun_cell027" geometry={nodes.sun_cell027.geometry} material={materials.sun} position={[-0.059, 0.165, 0.447]} />
      <mesh name="sun_cell028" geometry={nodes.sun_cell028.geometry} material={materials.sun} position={[-0.327, -0.091, 0.361]} />
      <mesh name="sun_cell029" geometry={nodes.sun_cell029.geometry} material={materials.sun} position={[-0.292, -0.389, -0.028]} />
      <mesh name="sun_cell030" geometry={nodes.sun_cell030.geometry} material={materials.sun} position={[0.207, 0.28, 0.36]} />
      <mesh name="sun_cell031" geometry={nodes.sun_cell031.geometry} material={materials.sun} position={[-0.147, 0.445, -0.124]} />
      <mesh name="sun_cell032" geometry={nodes.sun_cell032.geometry} material={materials.sun} position={[0.229, -0.383, -0.169]} />
      <mesh name="sun_cell033" geometry={nodes.sun_cell033.geometry} material={materials.sun} position={[-0.483, -0.082, -0.21]} />
      <mesh name="sun_cell034" geometry={nodes.sun_cell034.geometry} material={materials.sun} position={[-0.319, -0.107, -0.366]} />
      <mesh name="sun_cell035" geometry={nodes.sun_cell035.geometry} material={materials.sun} position={[0.413, 0.259, 0.303]} />
      <mesh name="sun_cell036" geometry={nodes.sun_cell036.geometry} material={materials.sun} position={[0, 0, 0.564]} />
      <mesh name="sun_cell037" geometry={nodes.sun_cell037.geometry} material={materials.sun} position={[0.174, 0.459, 0.124]} />
      <mesh name="sun_cell038" geometry={nodes.sun_cell038.geometry} material={materials.sun} position={[0.086, -0.462, 0.069]} />
      <mesh name="sun_cell039" geometry={nodes.sun_cell039.geometry} material={materials.sun} position={[0.383, -0.29, 0.072]} />
      <mesh name="sun_cell040" geometry={nodes.sun_cell040.geometry} material={materials.sun} position={[0.397, -0.24, 0.231]} />
      <mesh name="sun_cell041" geometry={nodes.sun_cell041.geometry} material={materials.sun} position={[0.258, 0.217, -0.383]} />
      <mesh name="sun_cell042" geometry={nodes.sun_cell042.geometry} material={materials.sun} position={[-0.118, -0.465, 0.005]} />
      <mesh name="sun_cell043" geometry={nodes.sun_cell043.geometry} material={materials.sun} position={[-0.41, 0.003, 0.29]} />
      <mesh name="sun_cell044" geometry={nodes.sun_cell044.geometry} material={materials.sun} position={[0.102, -0.088, -0.468]} />
      <mesh name="sun_cell045" geometry={nodes.sun_cell045.geometry} material={materials.sun} position={[0.263, 0.338, 0.171]} />
      <mesh name="sun_cell046" geometry={nodes.sun_cell046.geometry} material={materials.sun} position={[0.303, -0.138, -0.375]} />
      <mesh name="sun_cell047" geometry={nodes.sun_cell047.geometry} material={materials.sun} position={[0.411, 0.253, -0.113]} />
      <mesh name="sun_cell048" geometry={nodes.sun_cell048.geometry} material={materials.sun} position={[-0.05, 0.482, -0.249]} />
      <mesh name="sun_cell049" geometry={nodes.sun_cell049.geometry} material={materials.sun} position={[-0.41, -0.268, -0.106]} />
      <mesh name="sun_cell050" geometry={nodes.sun_cell050.geometry} material={materials.sun} position={[0.064, 0.511, -0.031]} />
      <mesh name="sun_cell051" geometry={nodes.sun_cell051.geometry} material={materials.sun} position={[-0.144, -0.005, 0.485]} />
      <mesh name="sun_cell052" geometry={nodes.sun_cell052.geometry} material={materials.sun} position={[0.282, -0.244, 0.305]} />
      <mesh name="sun_cell053" geometry={nodes.sun_cell053.geometry} material={materials.sun} position={[0.105, -0.474, 0.273]} />
      <mesh name="sun_cell054" geometry={nodes.sun_cell054.geometry} material={materials.sun} position={[-0.393, -0.146, 0.193]} />
      <mesh name="sun_cell055" geometry={nodes.sun_cell055.geometry} material={materials.sun} position={[0.241, -0.472, 0.003]} />
      <mesh name="sun_cell056" geometry={nodes.sun_cell056.geometry} material={materials.sun} position={[-0.437, 0.114, 0.17]} />
      <mesh name="sun_cell057" geometry={nodes.sun_cell057.geometry} material={materials.sun} position={[-0.435, 0.212, -0.12]} />
      <mesh name="sun_cell058" geometry={nodes.sun_cell058.geometry} material={materials.sun} position={[0.099, 0.156, 0.439]} />
      <mesh name="sun_cell059" geometry={nodes.sun_cell059.geometry} material={materials.sun} position={[-0.179, -0.03, -0.466]} />
      <mesh name="sun_cell060" geometry={nodes.sun_cell060.geometry} material={materials.sun} position={[0.098, -0.438, -0.227]} />
      <mesh name="sun_cell061" geometry={nodes.sun_cell061.geometry} material={materials.sun} position={[0.324, -0.002, 0.436]} />
      <mesh name="sun_cell062" geometry={nodes.sun_cell062.geometry} material={materials.sun} position={[-0.068, 0.108, -0.479]} />
      <mesh name="sun_cell063" geometry={nodes.sun_cell063.geometry} material={materials.sun} position={[0.34, -0.304, -0.293]} />
      <mesh name="sun_cell064" geometry={nodes.sun_cell064.geometry} material={materials.sun} position={[0.122, -0.356, 0.323]} />
      <mesh name="sun_cell065" geometry={nodes.sun_cell065.geometry} material={materials.sun} position={[-0.009, 0.421, 0.277]} />
      <mesh name="sun_cell066" geometry={nodes.sun_cell066.geometry} material={materials.sun} position={[-0.226, 0.361, -0.259]} />
      <mesh name="sun_cell067" geometry={nodes.sun_cell067.geometry} material={materials.sun} position={[-0.241, -0.286, 0.28]} />
      <mesh name="sun_cell068" geometry={nodes.sun_cell068.geometry} material={materials.sun} position={[-0.39, 0.296, 0.273]} />
      <mesh name="sun_cell069" geometry={nodes.sun_cell069.geometry} material={materials.sun} position={[0.123, 0.111, -0.447]} />
      <mesh name="sun_cell070" geometry={nodes.sun_cell070.geometry} material={materials.sun} position={[-0.215, -0.148, 0.433]} />
      <mesh name="sun_cell071" geometry={nodes.sun_cell071.geometry} material={materials.sun} position={[0.064, -0.081, 0.467]} />
      <mesh name="sun_cell072" geometry={nodes.sun_cell072.geometry} material={materials.sun} position={[-0.372, 0.246, 0.092]} />
      <mesh name="sun_cell073" geometry={nodes.sun_cell073.geometry} material={materials.sun} position={[-0.286, 0.204, -0.374]} />
      <mesh name="sun_cell074" geometry={nodes.sun_cell074.geometry} material={materials.sun} position={[-0.503, -0.054, -0.068]} />
      <mesh name="sun_cell075" geometry={nodes.sun_cell075.geometry} material={materials.sun} position={[0.447, 0.083, 0.17]} />
    </group>
  )
}

useGLTF.preload('./models/full-sun.glb')
