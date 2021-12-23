import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import anime from 'animejs/lib/anime.es.js';

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera( -1, 1 , 1, -1, 0.1, 100 );
// let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 100);

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xECF0F1);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});



import fragmentShader from '../shaders/fragment.glsl';
import  vertexShader from '../shaders/vertex.glsl';


let controls = new  OrbitControls(camera,renderer.domElement);

const manager = new THREE.LoadingManager();

let tLoader = new THREE.TextureLoader(manager);
let textures = [
     tLoader.load("./img/8.jpg"),
     tLoader.load("./img/9.jpg"),
     tLoader.load("./img/10.jpg"),
];
let g  = new THREE.PlaneGeometry( 0.8,1 );
let m  = new  THREE.ShaderMaterial({
          fragmentShader,
          vertexShader,
     uniforms: {
          t1: {value: null},
          t2: {value: null},
          transition: {value: 0}
     },
     });
const mesh = new THREE.Mesh(g,m);
scene.add(mesh);

anime({
     targets:m.uniforms.transition,
     value:[0,1],
     easing:'linear',
     loop:true,
     duration:3000,
     loopBegin: function() {
          let idx1 = counter % textures.length;
          let idx2 = (idx1 + 1) === textures.length ? 0 : idx1 + 1;
          console.log(counter, idx1, idx2);
          counter++;
          m.uniforms.t1.value = textures[idx1];
          m.uniforms.t2.value = textures[idx2];
     }
});

camera.position.z = 20;

let counter = 0;
const animate = function () {
     requestAnimationFrame( animate );

     renderer.render( scene, camera );
};

animate();

