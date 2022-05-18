import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
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




const geometry = new THREE.BoxGeometry( 2,2 ,2);
// const material = new  THREE.MeshNormalMaterial({wireframe: true});
const material = new  THREE.ShaderMaterial({
          fragmentShader,
          vertexShader,
          uniforms: {
            time: { value: 0}
          },
     });
const mesh = new THREE.Mesh(geometry,material);
// scene.add(mesh);



const loader = new GLTFLoader();

loader.load('img/1/scene.gltf', handle_load);

let Model;
let myMaterial;
myMaterial = new   THREE.ShaderMaterial({
     fragmentShader,
     vertexShader,
     uniforms: {
          time: { value: 0},
          sky: { value: new THREE.TextureLoader().setPath().load('img/sky1.jpg')}
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
     Model.scale.multiplyScalar(0.05);
}

camera.position.z = 13;

const animate = function () {
     requestAnimationFrame( animate );

     myMaterial.uniforms.time.value += 0.07;
     renderer.render( scene, camera );
};

animate();
