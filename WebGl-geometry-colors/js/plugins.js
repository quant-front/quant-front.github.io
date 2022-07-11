import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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


let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

// scene.add(new THREE.GridHelper(20, 20));



let controls = new  OrbitControls(camera,renderer.domElement);

const colors = [];
const verts = [];
let col;

const planeGeo = new THREE.PlaneBufferGeometry(5, 5,30,30);
const planeMat = new THREE.MeshPhongMaterial({
     // color: 0x25004D,
     side: THREE.DoubleSide,
     vertexColors: true
     // wireframe:true,
});
const Plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(Plane);
let v2 = new THREE.Vector3();
for (let i = 0; i < planeGeo.attributes.position.count; i++) {
     let p = v2.fromBufferAttribute(planeGeo.attributes.position, i);
     col = new THREE.Color().setHSL(0.5 - p.x * 0.025, 1.0, 0.5);
     verts.push(p.x, p.y, p.z);
     colors.push(col.r, col.g, col.b);
}
planeGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
planeGeo.computeVertexNormals();



camera.position.z = 10;
const clock = new THREE.Clock();

function animation( time = 0 ) {
     controls.update();

     renderer.render( scene, camera );
}

