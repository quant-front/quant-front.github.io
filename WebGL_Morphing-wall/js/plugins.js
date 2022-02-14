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

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});



var light = new THREE.SpotLight("#fff", 0.7);
light.position.y = 10;
light.position.z = 30;
light.decacy = 2;
light.penumbra = 1;

light.shadow.camera.near = 10;
light.shadow.camera.far = 1000;
light.shadow.camera.fov = 30;
scene.add(light);


let controls = new  OrbitControls(camera,renderer.domElement);


const planeGeo = new THREE.PlaneBufferGeometry(20, 10,10,10);
const planeMat = new THREE.MeshPhongMaterial({
     color: 'blue',
     side: THREE.DoubleSide,
     flatShading:THREE.FlatShading,
});
const Plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(Plane);
Plane.rotation.x = 2.5;

let {array} = Plane.geometry.attributes.position;
// console.log(Plane.geometry.attributes.position.array);

// for (let i = 0; i < array.length; i += 3) {
//      let x = array[i];
//      let y = array[i+1];
//      let z = array[i+2];
//      array[i+2] = z + Math.random();
// }
// planeGeo.computeVertexNormals();
// planeGeo.attributes.position.needsUpdate = true;


camera.position.z = 22;
const clock = new THREE.Clock();
let time = 0
const animate = function () {
     requestAnimationFrame( animate );
     time++;
     light.position.x = Math.sin(time*0.01)*20;
     const now = Date.now() / 900;
     controls.update();
     for (let i = 0; i < array.length; i += 3) {
          let x = array[i];
          let y = array[i+1];
          let z = array[i+2];
          array[i+2] = y + Math.sin(i + clock.getElapsedTime());
          // array[i+2] = z + Math.sin(i+2 + clock.getElapsedTime()/100);
     }
     planeGeo.computeVertexNormals();
     planeGeo.attributes.position.needsUpdate = true;

     renderer.render( scene, camera );
};

animate();
