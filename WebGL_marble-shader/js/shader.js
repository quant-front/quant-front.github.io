import * as THREE from 'three/build/three.module.js';
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera( -1, 1 , 1, -1, 0.1, 100 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xFFFCFF);
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


const  uniforms = {
     color_a: { value: new THREE.Color(0xff0000) },
     color_b: { value: new THREE.Color(0x00ffff) },
     time: { value: 0.0 },
     u_mouse: { value:{ x:0.0, y:0.0 }},
     u_resolution: { value:{ x:innerWidth, y:window.innerHeight }},
     u_duration: { value: 2.0 },
     u_LightColor: { value: new THREE.Color(0xbb905d) },
     u_DarkColor: { value: new THREE.Color(0x7d490b) },
     u_Frequency : { value: 2.0 },
     u_NoiseScale : { value: 6.0 },
     u_RingScale : { value: 0.6 },
     u_Contrast : { value: 4.0 },
};


const geometry = new THREE.PlaneGeometry( 2,2 );
const material = new  THREE.ShaderMaterial({
          fragmentShader,
          vertexShader,
          uniforms: uniforms
     });
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


camera.position.z = 20;

const animate = function () {
     requestAnimationFrame( animate );
     uniforms.time.value += 0.004;
     renderer.render( scene, camera );
};

animate();
