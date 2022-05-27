import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.setScalar(25);

let renderer = new THREE.WebGLRenderer({
antialias: true,
powerPreference: 'high-performance', 
});
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

const geometry = new THREE.BoxGeometry( 5,5,5 );
const material = new  THREE.MeshNormalMaterial({wireframe: true});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);



camera.position.z = 20;
const clock = new THREE.Clock();

const animate = function () {
     requestAnimationFrame( animate );
     // controls.update();
     // mesh.rotation.y += 0.01;
     renderer.render( scene, camera );
};

animate();
