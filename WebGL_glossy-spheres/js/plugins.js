import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.setScalar(25);

let renderer = new THREE.WebGLRenderer({antialias:true});
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

var light = new THREE.SpotLight("#fff", 0.8);
light.position.y = 100;

light.angle = 1.05;

light.decacy = 2;
light.penumbra = 1;

light.shadow.camera.near = 10;
light.shadow.camera.far = 1000;
light.shadow.camera.fov = 30;

scene.add(light);

let hlight = new THREE.AmbientLight (0x404040,1);
scene.add(hlight);

let controls = new  OrbitControls(camera,renderer.domElement);

// const geometry = new THREE.SphereGeometry(30, 64, 64);
// const material = new THREE.MeshStandardMaterial({ color: "red", roughness: 1 });
//
// let envMap = new THREE.TextureLoader().load('img/env-maps.png');
// material.envMap = envMap;
//
// let roughnessMap = new THREE.TextureLoader().load('img/out-img.png');
// roughnessMap.magFilter = THREE.NearestFilter;
// material.alphaMap = roughnessMap;
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const geometry = new THREE.SphereGeometry(30, 64, 64);

let roughnessMap = new THREE.TextureLoader().load('img/out-img.png');
const material = new THREE.MeshStandardMaterial({ color: "#444", transparent: true, side: THREE.DoubleSide, alphaTest: 0.9, opacity: 1, roughness: 0.7 });
let envMap = new THREE.TextureLoader().load('img/env-maps.png');
material.envMap = envMap;
// envMap.mapping = THREE.SphericalReflectionMapping;
material.envMap = envMap;
roughnessMap.magFilter = THREE.NearestFilter;
material.roughnessMap = roughnessMap;
envMap.encoding = THREE.sRGBEncoding;

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);




camera.position.z = 180;
let time = 0;

const animate = function () {
     requestAnimationFrame( animate );
     time++;

     // move the light
     light.position.x = Math.sin(time*0.01)*200;

     mesh.rotation.x += 0.001;
     mesh.rotation.y += 0.001;
     mesh.rotation.z += 0.001;

     renderer.clear();


     renderer.render( scene, camera );
};

animate();
