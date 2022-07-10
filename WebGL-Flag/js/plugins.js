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

let ball = {
     rotationY:0,
}

const  fragmentShader = `
varying vec2 vUv;
void main() {
vec3 color = vec3(1.0);
gl_FragColor = vec4(vec3(vUv.x ),1.0);

}
`;

const  vertexShader  = `
varying vec2 vUv;
uniform float time;
void main() {
vUv = uv;
vec3 pos = position.xyz * sin(time);
gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
}
`;




let controls = new  OrbitControls(camera,renderer.domElement);


const planeGeo = new THREE.PlaneBufferGeometry(5, 3,50,30);
const planeMat = new THREE.MeshPhongMaterial({
     side: THREE.DoubleSide,
     map:new  THREE.TextureLoader().load('img/tex.png')
});
const Plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(Plane);
Plane.scale.multiplyScalar(0.5);
Plane.position.y  = 2.2;

const planeGeo1 = new THREE.PlaneBufferGeometry(5, 3,50,30);
const planeMat1 = new THREE.MeshPhongMaterial({
     side: THREE.DoubleSide,
     map:new  THREE.TextureLoader().load('img/tex.png')
});
const Plane1 = new THREE.Mesh(planeGeo1, planeMat1);
scene.add(Plane1);
Plane1.scale.multiplyScalar(0.7);
// Plane1.position.x  = -3.2;







camera.position.z = 10;
const clock = new THREE.Clock();
const position_clone = JSON.parse(JSON.stringify(planeGeo.attributes.position.array));
function animation( time = 0 ) {
     const  t = clock.getElapsedTime() * 2.5 ;
     controls.update();
     let v3 = new THREE.Vector3();
     let v4 = new THREE.Vector3();
     for(let i = 0; i < planeGeo.attributes.position.count; i++){

          v3.fromBufferAttribute(planeGeo.attributes.uv, i);
          v4.fromBufferAttribute(planeGeo1.attributes.uv, i);
          v3.z = (0.5 * Math.sin(v3.x * 6 + t*1.2)) * ((v3.x + 4.5) /2 )  * (v3.x -1);
          v4.z = (0.5 * Math.sin(v4.x * 6 + t)) * ((v4.x + 4.5) /2 )  * (v4.x - 3);
          planeGeo.attributes.position.setZ(i,v3.z);
          planeGeo1.attributes.position.setZ(i,v4.z);


          // planeGeo.attributes.position.setY(i,v3);

     }
     planeGeo.computeVertexNormals();
     planeGeo.attributes.position.needsUpdate = true;
     planeGeo1.computeVertexNormals();
     planeGeo1.attributes.position.needsUpdate = true;
     renderer.render( scene, camera );
}

// v3.z = (0.5 * Math.sin(v3.x * 6 + t)) * ((v3.x + 4.5) /2 )  * (v3.x - 3);
