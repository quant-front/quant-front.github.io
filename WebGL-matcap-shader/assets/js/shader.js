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

const loader = new GLTFLoader();

loader.load('img/untitled.glb', handle_load);

let Model;
let myMaterial;
myMaterial = new   THREE.ShaderMaterial({
     fragmentShader,
     vertexShader,
     color:0x000000,
     uniforms: {
          time: { value: 0},
          sky: { value: new THREE.TextureLoader().setPath().load('img/sky1.jpg')},
          matcap1:{ value: new THREE.TextureLoader().setPath().load('img/1.jpg')},
          progress: { value: -100.2},
     },
});

function handle_load( object) {
     Model = object.scene;
     Model.traverse( function ( child ) {
          if ( child.isMesh ) {
               child.castShadow = true;
               child.receiveShadow = true;
               child.material = myMaterial;

          }
     } );
     scene.add(Model);
     Model.scale.multiplyScalar(0.083);
     Model.position.y = -4.5;
     Model.position.x = -1;
     Model.rotation.x = -0.3;
     // Model.rotation.y = 0.1;

}

camera.position.z = 20;
const clock = new THREE.Clock();

function animation( time = 0 ) {
     controls.update();
     myMaterial.uniforms.time.value += 0.02;
     // mesh.rotation.y = clock.getElapsedTime() * 2;

     renderer.render( scene, camera );
}

