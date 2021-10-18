import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {KeyDisplay} from "./keyutils";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {CharacterControls} from "./charControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );


let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x202020);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;


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


let controls = new  OrbitControls(camera,renderer.domElement);

let sprite = new THREE.TextureLoader().load('img/checker.png');
const planeGeo = new THREE.PlaneGeometry( 4, 4);
const planeMat = new THREE.MeshPhongMaterial({
     // color: 'black',
     map:sprite
     // side: THREE.DoubleSide,
});
for (let i = 0; i < 15; i++) {
     for (let j = 0; j < 15; j++) {
          const Plane = new THREE.Mesh(planeGeo, planeMat);
          Plane.rotation.x = -Math.PI / 2;
          //
          Plane.position.x = i*4-(15/2)*4;
          Plane.position.z = j*4-(15/2)*4;
          scene.add(Plane);

     }
}

//Control keys
const keysPressed = {};
const keyDisplayQueue = new KeyDisplay();
document.addEventListener('keydown', (event) => {
     keyDisplayQueue.down(event.key)
     if(event.shiftKey && charasterControls) {
         //toggle
          charasterControls.switchRunToggle();
     } else {
          (keysPressed)[event.key.toLowerCase()] = true;
     }

},false);

document.addEventListener('keyup', (event) => {
     keyDisplayQueue.up(event.key);
     (keysPressed)[event.key.toLowerCase()] = false;
},false);

let charasterControls;
const loader = new GLTFLoader();

loader.load('../assets/img/Soldier.glb', handle_load);

function handle_load(gltf){
    const mesh = gltf.scene;
     mesh.material = new THREE.MeshStandardMaterial( { color: 0x606060 } );
     mesh.castShadow = true;
     mesh.receiveShadow = true;
     scene.add(mesh);
     const gltfAnimations = gltf.animations;
     const mixer = new THREE.AnimationMixer(mesh);
     const animationsMap  = new Map();
     gltfAnimations.filter(a => a.name !== 'TPose').forEach((a) => {
          animationsMap.set(a.name, mixer.clipAction(a))
     })
     charasterControls = new CharacterControls(mesh,mixer,animationsMap,controls,camera, 'Idle')
}




camera.position.z = 0;
camera.position.y = 3;
const clock = new THREE.Clock();

const animate = function () {
     let mixerUpdateDelta = clock.getDelta();
     if (charasterControls) {
          charasterControls.update(mixerUpdateDelta,keysPressed)
     }

     controls.update();
     renderer.render( scene, camera );
     requestAnimationFrame( animate );
};

animate();
