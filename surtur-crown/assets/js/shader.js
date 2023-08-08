import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer({
antialias: true,
powerPreference: 'high-performance', 
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xFFFCFF);
let doc = document.querySelector('.main');
renderer.setAnimationLoop( animation );
doc.appendChild( renderer.domElement );


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});



import fragmentShader from '../shaders/fragment.glsl';
import  vertexShader from '../shaders/vertex.glsl';



let controls = new  OrbitControls(camera,renderer.domElement);


const geometry = new THREE.PlaneGeometry( 2,2 );
// const material = new  THREE.MeshNormalMaterial({wireframe: true});
const material = new  THREE.ShaderMaterial({
          fragmentShader,
          vertexShader,
          uniforms: {
            time: { value: 0}
          },
     transparent:true,
     opacity:0.5,
     });
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


camera.position.z = 3;
const clock = new THREE.Clock();

function animation( time = 0 ) {
     controls.update();
     // mesh.rotation.y = clock.getElapsedTime() * 2;
      material.uniforms.time.value += 0.02;
     renderer.render( scene, camera );
}

