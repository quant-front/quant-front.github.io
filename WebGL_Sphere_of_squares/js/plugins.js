import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.setScalar(25);

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

// scene.add(new THREE.GridHelper(20, 20));




let controls = new  OrbitControls(camera,renderer.domElement);


// Create a shape
var colors = ['#D94A64', '#5E6A8C', '#CDD876', '#7A946E', '#2C3143'];
var numBoxes = 200;
var boxes = [];

var container = new THREE.Object3D();

var boxGeom = new THREE.BoxBufferGeometry(5,5,5);
for (var i = 0; i < numBoxes; i++) {

     var colorIndex = Math.ceil(Math.random() * colors.length - 1);
     var material = new THREE.MeshLambertMaterial({ color: colors[colorIndex] });

     var box = new THREE.Mesh(boxGeom, material);
     box.rotation.x = Math.random() * Math.PI;
     box.rotation.y = Math.random() * Math.PI;
     box.rotation.z = Math.random() * Math.PI;
     box.speedX = Math.random() * 0.02 - 0.01;
     box.speedY = Math.random() * 0.02 - 0.01;
     box.speedZ = Math.random() * 0.02 - 0.01;
     box.castShadow = true;
     box.receiveShadow = true;

     boxes.push(box);
     container.add(box);
     // scene.add(box)
}

scene.add(container);



camera.position.z = 20;
const clock = new THREE.Clock();

const animate = function () {
     requestAnimationFrame( animate );
     for (var i = 0; i < numBoxes; i++) {
          boxes[i].rotation.x += boxes[i].speedX;
          boxes[i].rotation.y += boxes[i].speedY;
          boxes[i].rotation.z += boxes[i].speedZ;
     }

     container.rotation.y += .02;

     renderer.render( scene, camera );
};

animate();
