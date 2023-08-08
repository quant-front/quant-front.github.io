import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {Color} from "three/build/three.module.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer({
     antialias:true,
     powerPreference: 'high-performance',
});
renderer.setSize( window.innerWidth, window.innerHeight );
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );
renderer.autoClear = false;

window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});

let color1 = new Color(244,208,63);
const light = new THREE.SpotLight(color1, 0.5);
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
     roughnessMap:new  THREE.TextureLoader().load('../assets/img/scene-3/lava-and-rock_roughness.png'),
     roughness:0.7,
     normalMap: new  THREE.TextureLoader().load('../assets/img/scene-3/lava-and-rock_normal-ogl.png'),
     map:new  THREE.TextureLoader().load('../assets/img/scene-3/lava-and-rock_albedo.png'),
     aoMap:new  THREE.TextureLoader().load('../assets/img/scene-3/lava-and-rock_ao.png'),
     emissiveMap:new  THREE.TextureLoader().load('../assets/img/scene-3/lava-and-rock_emissive.png'),
     metalnessMap:new  THREE.TextureLoader().load('../assets/img/scene-3/lava-and-rock_metallic.png'),
});
planeMat.normalMap.wrapT = THREE.RepeatWrapping;
planeMat.normalMap.wrapS =  THREE.RepeatWrapping;
planeMat.normalMap.repeat.set(5,5);
const Plane = new THREE.Mesh(planeGeo, planeMat);
Plane.rotation.x = Math.PI * -.5;
scene.add(Plane);
Plane.castShadow = true;
Plane.receiveShadow = true;


const loader = new GLTFLoader();

loader.load('img/gate.glb', handle_load);

let ModeGate;
let myMaterial;
myMaterial = new THREE.MeshStandardMaterial({
     map:new  THREE.TextureLoader().load('../assets/img/1.jpg'),
     side: THREE.DoubleSide,
});

function handle_load( object) {
     ModeGate = object.scene;
     ModeGate.traverse( function ( child ) {
          if ( child.isMesh ) {
               child.castShadow = true;
               child.receiveShadow = true;
               child.material = myMaterial;

          }
     } );
     scene.add(ModeGate);
     ModeGate.position.y = 0.05;
     ModeGate.scale.multiplyScalar(0.07);
     ModeGate.rotation.y = 1;
}



let ModeGateKeeper;
loader.load('img/sculpture.glb', handle_load1);

function handle_load1( object) {
     ModeGateKeeper = object.scene;
     ModeGateKeeper.traverse( function ( child ) {
          if ( child.isMesh ) {
               child.castShadow = true;
               child.receiveShadow = true;
               child.material = myMaterial;

          }
     } );
     scene.add(ModeGateKeeper);
     ModeGateKeeper.position.y = 0.05;
     ModeGateKeeper.scale.multiplyScalar(0.07);
     ModeGateKeeper.rotation.y = 1;
     ModeGateKeeper.position.x = 3;
}

const planeGeo1 = new THREE.PlaneBufferGeometry(2, 7);
const planeMat1 = new  THREE.ShaderMaterial({
     fragmentShader,
     vertexShader,
     uniforms: {
          iTime: { value: 0},
          iMouse: { value:{ x:0.0, y:0.0 }},
          iResolution: { value:{ x:innerWidth, y:window.innerHeight }},
     },
});
const Plane1 = new THREE.Mesh(planeGeo1, planeMat1);
scene.add(Plane1);
Plane1.rotation.y = -3.7;
Plane1.position.x = 0.1;


light1.position.x =-19.555867167754048;
light1.position.z = 6.753437764804387;

camera.position.z = 20;
camera.position.set(10.674613630778909,6.897940632797762,-11.019784215927892);
camera.rotation.y = 0.687464443996199;
camera.rotation.z = 2.763484047351313;
camera.rotation.x = -2.582303526873327;

const animate = function () {
     requestAnimationFrame( animate );
     planeMat1.uniforms.iTime.value += 0.007;
     renderer.clear();

     renderer.render(scene, camera);
};

animate();

