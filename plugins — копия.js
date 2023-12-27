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




let controls = new  OrbitControls(camera,renderer.domElement);
let geometry = new THREE.IcosahedronGeometry(30, 5);
let material = new THREE.MeshStandardMaterial({ color: "#444", transparent: true, side: THREE.DoubleSide, alphaTest: 0.5, opacity: 1, roughness: 1 });
let sprite = new THREE.TextureLoader().load('img/out-img.png');
material.alphaMap = sprite;
material.alphaMap.magFilter = THREE.NearestFilter;
material.alphaMap.wrapT = THREE.RepeatWrapping;
material.alphaMap.repeat.y = 1;

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.z = -Math.PI/4;
scene.add(mesh);

const geometry1 = new THREE.SphereGeometry( 2, 32, 16 );
const material1 = new  THREE.MeshStandardMaterial({color: "#444"});

const mesh1 = new THREE.Mesh(geometry1,material1);
mesh1.scale.multiplyScalar(3.0)
scene.add(mesh1);




controls.update();

let time = 0

camera.position.z = 180;
const clock = new THREE.Clock();
let counter = 0;

const animate = function () {
     requestAnimationFrame( animate );
     time++;


     light.position.x = Math.sin(time*0.01)*200;
     mesh.material.alphaMap.offset.y = clock.getElapsedTime()*0.0255;
     mesh1.position.y = 2 +( 4*Math.abs(Math.sin(time*0.01)));

     if (counter <=500){
          mesh1.scale.z += 0.005
          mesh1.scale.x += 0.005
          mesh1.scale.y += 0.005
          counter++;
     }
     if (counter > 500){
          mesh1.scale.z -= 0.005
          mesh1.scale.x -= 0.005
          mesh1.scale.y -= 0.005
          counter++;
     }

     if (counter > 1000){
          counter = 0;
     }

     renderer.render( scene, camera );
};

animate();
