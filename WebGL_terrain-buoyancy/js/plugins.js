import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import  {SimplexNoise} from "three/examples/jsm/math/SimplexNoise.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
let simplex = new SimplexNoise();

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


let controls = new  OrbitControls(camera,renderer.domElement);

let light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

let v3 = new THREE.Vector3();
let v2 = new THREE.Vector2();

let g = new THREE.PlaneGeometry(200, 200, 100, 100);
g.rotateX(-Math.PI *0.5);
let m = new THREE.MeshLambertMaterial({color: "aqua", wireframe: false});
let o = new THREE.Mesh(g, m);
scene.add(o);

let clock = new THREE.Clock();

camera.position.z = 20;

function animation( time = 0 ) {
     controls.update();

     let t = clock.getElapsedTime();

     for(let i = 0; i < g.attributes.position.count; i++){
          v2.fromBufferAttribute(g.attributes.uv, i).addScalar(t * 0.01).multiplyScalar(20);
          let h = simplex.noise3d(v2.x, v2.y, t * 0.1);
          g.attributes.position.setY(i, h);
     }
     g.computeVertexNormals();
     g.attributes.position.needsUpdate = true;

     renderer.render( scene, camera );
}

