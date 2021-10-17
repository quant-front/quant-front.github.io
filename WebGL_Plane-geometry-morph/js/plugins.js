import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );


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
const helper = new THREE.GridHelper(20, 20);
helper.rotation.x = Math.PI * .072;
scene.add(helper);



let controls = new  OrbitControls(camera,renderer.domElement);


const planeGeo = new THREE.PlaneBufferGeometry(12, 10,200,200);
const planeMat = new THREE.MeshPhongMaterial({
     color: 0x25004D,
     side: THREE.DoubleSide,
});
const Plane = new THREE.Mesh(planeGeo, planeMat);
Plane.rotation.x = Math.PI * 0.7;
Plane.position.y = 3;
Plane.position.z = 5;
Plane.position.x = 5;
scene.add(Plane);
const count = planeGeo.attributes.position.count;

const planeGeo1 = new THREE.PlaneBufferGeometry(12, 10,200,200);
const planeMat1 = new THREE.MeshPhongMaterial({
     color: 0x25004D,
     side: THREE.DoubleSide,
});
const Plane1 = new THREE.Mesh(planeGeo1, planeMat1);
Plane1.rotation.x = Math.PI * 0.7;
Plane1.position.y = 3;
Plane1.position.z = 5;
Plane1.position.x = -7.5;
scene.add(Plane1);
//
const count1 = planeGeo.attributes.position.count;




camera.position.z = 25;
const clock = new THREE.Clock();

const animate = function () {

     const now = Date.now() / 300;
     for (let i = 0; i < count; i++) {
          const x = planeGeo.attributes.position.getX(i);
          const xsin = Math.sin(x + now);
          planeGeo.attributes.position.setZ(i, xsin)
     }
     planeGeo.computeVertexNormals();
     planeGeo.attributes.position.needsUpdate = true;

     for (let i = 0; i < count1; i++) {
          const x = planeGeo1.attributes.position.getX(i);
          const y = planeGeo1.attributes.position.getY(i);
          const xsin = Math.sin(x + now);
          const ycos = Math.sin(y + now);
          planeGeo1.attributes.position.setZ(i, xsin + ycos)
     }
     planeGeo1.computeVertexNormals();
     planeGeo1.attributes.position.needsUpdate = true;

     renderer.render( scene, camera );
     requestAnimationFrame( animate );
};

animate();
