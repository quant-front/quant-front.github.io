import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {Color} from "three/build/three.module.js";

const scene = new THREE.Scene({antialias:true});
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.setScalar(25);

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
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

const geometry = new THREE.BoxGeometry( 1,1,1 );
const material = new  THREE.MeshStandardMaterial({
     color: 0x25004D,
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);
mesh.position.y =1.5;
mesh.position.z =1.5;
mesh.position.x =2;




light1.position.x =-19.555867167754048;
light1.position.z = 6.753437764804387;

camera.position.z = 20;
const clock = new THREE.Clock();
camera.position.set(5.971076987476761,1.9626171298120065,3.912526978100047);
camera.rotation.y = 0.9382224751108402;
camera.rotation.z = 0.3844346044105473;
camera.rotation.x = -0.46494590297417704;

const time = Date.now() * 0.0005;
const animate = function () {
     requestAnimationFrame( animate );
     console.log(camera.position.z);
     // console.log(camera.position.y);
     // console.log(camera.position.z);
     // controls.update();
     // mesh.rotation.y = clock.getElapsedTime();
    // += clock.getElapsedTime();



     // light1.position.x =  Math.sin(time * 0.7) * 20;
     // light1.position.z = Math.abs( Math.cos(time * 0.7) ) * 20;
     renderer.render( scene, camera );
};

animate();
