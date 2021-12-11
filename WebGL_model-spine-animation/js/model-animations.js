import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x202020);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});


let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

scene.add(new THREE.GridHelper(20, 20));


let controls = new  OrbitControls(camera,renderer.domElement);

let loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/');
dracoLoader.preload();
dracoLoader.setDecoderConfig({type: 'js'});
loader.setDRACOLoader( dracoLoader );


loader.load('img/newchar.glb', handle_load);
let mixer = null;
function handle_load(gltf){

     mixer = new THREE.AnimationMixer(gltf.scene);
     const action = mixer.clipAction(gltf.animations[3]);
     action.play();
     scene.add(gltf.scene);
     console.log(gltf.animations);
     let gallery = [0,1,2,3,4];
     let current = 0;

     let AllBtn = document.querySelector('.btn-1');
     AllBtn.addEventListener('click', function () {
          current++
          current = current % gallery.length;
          for (let i = 0; i < gallery.length; i++) {
               const action1 = mixer.clipAction(gltf.animations[gallery[i]]);
               action1.stop();
               const action = mixer.clipAction(gltf.animations[gallery[current]]);
               action.play();
          }
     })

}



camera.position.set( 0, 3, 7 );
const clock = new THREE.Clock();


const animate = function () {
     requestAnimationFrame( animate );
     controls.update();

     const dt = clock.getDelta();
     if(mixer)
     {
          mixer.update( dt );
     }

     renderer.render( scene, camera );
};

animate();
