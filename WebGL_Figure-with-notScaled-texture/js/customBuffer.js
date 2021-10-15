import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

let g = new THREE.PlaneGeometry(5, 5);
let m = new THREE.MeshBasicMaterial({
     map: new THREE.TextureLoader().load("https://threejs.org/examples/textures/brick_diffuse.jpg", tex => {
          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
     })
})
let o = new THREE.Mesh(g, m);
scene.add(o);



camera.position.z = 20;
let clock = new THREE.Clock();
const animate = function () {
     requestAnimationFrame( animate );
     // let t = clock.getElapsedTime() * 0.5;
     // let x = 2.5 + Math.cos(t) * 1.5;
     // let y = 2.5 + Math.sin(t) * 1.5;
     // let t = clock.getElapsedTime() * 0.5;
     let x = -4.5 * 1.5 ;
     let y = 2.5 + Math.sin(0.3) * 1.5;
     g.attributes.position.setXY(1, x, y);
     g.attributes.position.needsUpdate = true;
     let u = (x - (-2.5)) / 5;
     let v = (y - (-2.5)) / 5;
     g.attributes.uv.setXY(1, u, v);
     g.attributes.uv.needsUpdate = true;

     renderer.render( scene, camera );
};

animate();
