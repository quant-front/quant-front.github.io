import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {Color} from "three/build/three.module.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';

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

let color1 = new Color(239,35,15);
const light = new THREE.SpotLight(color1, 0.05);
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



let afterimagePass;

const textureLoader = new THREE.TextureLoader();
const waterNormalMap = textureLoader.load("img/Water_002_NORM.jpg");
const waterRoughness = textureLoader.load("img/Water_002_ROUGH.jpg");
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
let loader = new GLTFLoader();
loader.load('img/hell.glb', handle_load);

let Model;

function handle_load(gltf){
     Model = gltf.scene;
     Model.material = new THREE.MeshStandardMaterial({
          normalMap: waterNormalMap,
          roughnessMap: waterRoughness, roughness: 0.7,
          emissive: 0x000000,
     });
     scene.add( Model);
     Model.scale.multiplyScalar(0.4);
     Model.position.x = 1;
     Model.position.z = 1.9;
}
loader.load('img/2/scene.gltf', handle_load1);

let Ring;

function handle_load1(gltf){
     Ring = gltf.scene;
     Ring.material = new THREE.MeshNormalMaterial();
     scene.add(Ring);
     Ring.scale.multiplyScalar(0.2);
     Ring.position.z = 2.2;
     Ring.position.x = -2;
     Ring.position.y = 0.1;
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

let  composer;
composer = new EffectComposer( renderer );
composer.addPass( new RenderPass( scene, camera ) );

afterimagePass = new AfterimagePass();
composer.addPass( afterimagePass );
afterimagePass.uniforms.damp.value = 0.84;
scene.fog = new THREE.Fog( 0x000000, 1, 1000 );


var angle = 0;

const animate = function () {
     requestAnimationFrame( animate );
     angle+=Math.PI/180*2;
     if( Ring) {
          Ring.position.x+=0.09*Math.sin(angle);
          Ring.position.z+=0.09*Math.cos(angle);

     }
    if (Model){
         Model.rotation.y += 0.06;
    }
     composer.render();
};

animate();
