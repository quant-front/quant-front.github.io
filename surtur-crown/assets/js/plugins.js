import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {Color} from "three/build/three.module.js";
import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer({
antialias: true,
powerPreference: 'high-performance', 
});
renderer.setSize( window.innerWidth, window.innerHeight );
let doc = document.querySelector('.main');
renderer.setAnimationLoop( animation );
doc.appendChild( renderer.domElement );


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});

let color1 = new Color(1,0.25,0.7);
const light = new THREE.SpotLight(color1, 1.5);
light.position.set( 5, 5, 0 );
light.angle = 0.6;
light.penumbra = 0.5;
light.shadow.bias = -0.0001;
light.castShadow = true;
scene.add(light);
scene.add(light.target);

let color2 = new Color(0.14,0.5,1.0);
const light1 = new THREE.SpotLight(color2, 2);
light1.angle = 0.6;
light1.penumbra = 0.5;
light.position.set( -5, 5, 0 );
light1.shadow.bias = -0.0001;
light1.castShadow = true;


scene.add(light1);
scene.add(light1.target);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.x += 20
directionalLight.position.y += 20
directionalLight.position.z += 20
scene.add(directionalLight);


let controls = new  OrbitControls(camera,renderer.domElement);

let color3 = new Color(0.015,0.015,0.015);
const planeGeo = new THREE.PlaneBufferGeometry(30, 30);
const planeMat = new THREE.MeshStandardMaterial({
     color:color3,
     side: THREE.DoubleSide,
     envMapIntensity:0,
     roughnessMap:new  THREE.TextureLoader().load('../assets/img/terrain-roughness.jpg'),
     roughness:0.7,
     normalMap: new  THREE.TextureLoader().load('../assets/img/terrain-normal.jpg'),
});
planeMat.normalMap.wrapT = THREE.RepeatWrapping;
planeMat.normalMap.wrapS =  THREE.RepeatWrapping;
planeMat.normalMap.repeat.set(5,5);
const Plane = new THREE.Mesh(planeGeo, planeMat);
Plane.rotation.x = Math.PI * -.5;
scene.add(Plane);
Plane.castShadow = true;
Plane.receiveShadow = true;

const geometry = new THREE.PlaneGeometry( 1.4,2 );
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
mesh.position.y = 1.7;
mesh.rotation.y = 1;
mesh.position.z = 0.9;
mesh.position.x = 0.9;



let loader = new GLTFLoader();
loader.load('img/surt.glb', handle_load);
let Model;

let  myMaterial = new THREE.MeshPhongMaterial({
     color:"red",
     specular: 0x000000,
     shininess:0.9,
     flatShading:false,
     clipShadows: true,
     side: THREE.DoubleSide
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
     Model.position.y = 0.0;
     Model.position.x = 1.0;
     Model.position.z = 1.0;
     Model.rotation.y = 1;
     Model.scale.multiplyScalar(0.6);
}



light1.position.x =-19.555867167754048;
light1.position.z = 6.753437764804387;

camera.position.z = 20;
const clock = new THREE.Clock();
camera.position.set(5.971076987476761,1.9626171298120065,3.912526978100047);
camera.rotation.y = 0.9382224751108402;
camera.rotation.z = 0.3844346044105473;
camera.rotation.x = -0.46494590297417704;

const time = Date.now() * 0.0005;


function animation( time = 0 ) {
     controls.update();
     material.uniforms.time.value += 0.02;
     renderer.clear();
     renderer.render( scene, camera );
}

