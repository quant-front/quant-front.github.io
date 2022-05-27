import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer({
antialias: true,
powerPreference: 'high-performance', 
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xFFFCFF);
let doc = document.querySelector('.main');
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


const geometry = new THREE.BoxGeometry( 2,2,2,200,1,200 );
// const material = new  THREE.MeshNormalMaterial({wireframe: true});
const material = new  THREE.ShaderMaterial({
          fragmentShader,
          vertexShader,
          uniforms: {
            time: { value: 0},
            t2: { value: new THREE.TextureLoader().setPath().load('img/1.jpg')},
            t1: { value: new THREE.TextureLoader().setPath().load('img/2.jpg')},
          },
     });
material.uniforms.t1.value.wrapS = THREE.MirroredRepeatWrapping;
material.uniforms.t1.value.wrapT = THREE.MirroredRepeatWrapping;
material.uniforms.t2.value.wrapS = THREE.MirroredRepeatWrapping;
material.uniforms.t2.value.wrapT = THREE.MirroredRepeatWrapping;

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


camera.position.z = 10;

const animate = function () {
     requestAnimationFrame( animate );
     // mesh.rotation.x += 0.01;
     // mesh.rotation.y += 0.01;
     material.uniforms.time.value += 0.05;
     renderer.render( scene, camera );
};

animate();
