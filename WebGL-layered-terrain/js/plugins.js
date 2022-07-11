import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {SimplexNoise} from "three/examples/jsm/math/SimplexNoise";
// import {SimplexNoise} from "three/examples/jsm/math/SimplexNoise";
// import  {SimplexNoise} from "three/examples/jsm/math/SimplexNoise.js";


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


let simplex = new SimplexNoise();


let controls = new  OrbitControls(camera,renderer.domElement);

const light = new THREE.DirectionalLight( 0xffffff, 1.3 );
light.position.set(0,1,0);
scene.add(light);

const size = 32;
const flatShading = false;

const geometry = new THREE.PlaneGeometry( size, size, size, size ).toNonIndexed()

//Add code here

geometry.colorsNeedUpdate = true
geometry.verticesNeedUpdate = true

const v1 = new THREE.Vector3();
const v2 = new THREE.Vector3();
const v3 = new THREE.Vector3();
for(let i = 0; i < geometry.attributes.position.count; i++){
     let an =  v2.fromBufferAttribute(geometry.attributes.uv, i);
     let v  = layeredNoise(v2.x,v2.y, 8);
     let z = map(v,0,1,-10,10);
     z *= z < 0 ? 0 : z > 2.5 ?  1.3 : 1;
     geometry.attributes.position.setZ(i, z);
     console.log( v2.fromBufferAttribute(geometry.attributes.uv, i));
}



const colors = [];

const c1 = new THREE.Color(0xffffff);
const c2 = new THREE.Color(0x44ccff);
const c3 = new THREE.Color(0x228800);
const c4 = new THREE.Color(0xeecc44);

for (let i = 0; i < geometry.attributes.position.count; i += 3) {
     v1.fromBufferAttribute(geometry.attributes.position, i );
     v2.fromBufferAttribute(geometry.attributes.position, i + 1);
     v3.fromBufferAttribute(geometry.attributes.position, i + 2);

     const max = Math.max(v1.z, Math.max(v2.z, v3.z));

     let color = c1;

     if (max <= 0) {

          color = c2;
     } else if (max <= 1.5) {
          color = c3;
     } else if (max <= 3.5) {
          color = c4;
     }

     colors.push(color.r, color.g, color.b);
     colors.push(color.r, color.g, color.b);
     colors.push(color.r, color.g, color.b);

}

geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));



const material = new THREE.MeshStandardMaterial({
     color: 0x00aaff,
     metalness: 0,
     roughness: 1,
     flatShading: false,
     vertexColors: true,
});
const mesh = new THREE.Mesh( geometry, material );
mesh.rotateX( -Math.PI/2 );
mesh.position.y = 0.3;
scene.add(mesh);

mesh.geometry.computeVertexNormals();

function map(val, smin, smax, emin, emax) {
     const t =  (val-smin)/(smax-smin)
     return (emax-emin)*t + emin
}

function noise(nx, ny) {
     // Re-map from -1.0:+1.0 to 0.0:1.0
     return map(simplex.noise(nx,ny),-1,1,0,1)
}

//stack some noisefields together
function layeredNoise(nx, ny, layers) {
     let val = 0;
     let freq = 1;
     let max = 0;
     let amp = 1;
     for(let i=0; i<layers; i++) {
          val += noise(nx*freq, ny*freq) * amp;
          max += amp;
          amp /= 2;
          freq  *= 2;
     }
     return val/max;
}


camera.position.z = 20;
const clock = new THREE.Clock();
camera.position.set(0, 20, 20);


function animation( time = 0 ) {
     controls.update();

     renderer.render( scene, camera );
}


//https://codepen.io/Lighty/pen/qBobzWN
