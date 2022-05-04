import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

// scene.background = new THREE.Color( 0xefd1b5 );
// scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );

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

let ops = 1;
const myGroup = new THREE.Object3D();

function setOpacity( obj, alphaTest ) {
     obj.children.forEach((child)=>{
          setOpacity( child, alphaTest );
     })
     if ( obj.material ) {
          obj.material.alphaTest = alphaTest ;
     }
}
let start;
const manager = new THREE.LoadingManager();
const loader = new GLTFLoader(manager);

// let loader = new GLTFLoader();
loader.load('img/1scene.gltf', handle_load);
manager.onLoad = function ( ) {
start = true;
};

let car;
let myMaterial;
myMaterial = new THREE.MeshMatcapMaterial({
     matcap:new  THREE.TextureLoader().load('../assets/img/green.jpg'),
     side: THREE.DoubleSide,
     alphaMap:new  THREE.TextureLoader().load('../assets/img/bg-2.png'),
     alphaTest:1,
});

function handle_load( object) {
     car = object.scene;
     car.traverse( function ( child ) {
          if ( child.isMesh ) {
               child.castShadow = true;
               child.receiveShadow = true;
               child.material = myMaterial;

          }
     } );
     scene.add(car);
     car.position.y = 1.3;
     myGroup.add(car);
}
scene.add(myGroup);



camera.updateProjectionMatrix();
const clock = new THREE.Clock();

camera.position.set(0,3,7);

let opsSpeed = 0.0050;
const animate = function () {
     requestAnimationFrame( animate );
     camera.updateProjectionMatrix();
     controls.update();
     if (start){
          setOpacity( myGroup, ops );
          ops -= opsSpeed;
     }

     // console.log(ops);
     // if (ops <= 0) {
     //      ops = 0;
     // }
     // console.log(ops);

     renderer.render( scene, camera );
};

animate();
