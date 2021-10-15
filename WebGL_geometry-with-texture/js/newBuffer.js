import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );




let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xECF0F1);
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


let controls = new  OrbitControls(camera,renderer.domElement);


let quad_vertices =
     [
          -50.0,  70.0, 0.0,
          60.0,  30.0, 0.0,
          30.0, -30.0, -40.0,
          -30.0, -60.0, 0.0
     ];

let quad_uvs =
     [
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0
     ];

let quad_indices =
     [
          0, 2, 1, 0, 3, 2,3,4
     ];

let geometry = new THREE.BufferGeometry();

let vertices = new Float32Array( quad_vertices );
// Each vertex has one uv coordinate for texture mapping
let uvs = new Float32Array( quad_uvs);
// Use the four vertices to draw the two triangles that make up the square.
let indices = new Uint32Array( quad_indices )

// itemSize = 3 because there are 3 values (components) per vertex
geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );


let material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("https://threejs.org/examples/textures/brick_diffuse.jpg", tex => {
          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
     })});
let mesh = new THREE.Mesh( geometry, material );
mesh.position.z = -100;


scene.add(mesh);

camera.position.z = 40;

const animate = function () {
     requestAnimationFrame( animate );

     renderer.render( scene, camera );
};

animate();
