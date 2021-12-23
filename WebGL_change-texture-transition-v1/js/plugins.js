import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import anime from 'animejs/lib/anime.es.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.setScalar(25);

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


let hlight = new THREE.AmbientLight (0x404040,3);
scene.add(hlight);

// scene.add(new THREE.GridHelper(20, 20));


let controls = new  OrbitControls(camera,renderer.domElement);

let material;
let mesh;

let loader = new THREE.TextureLoader();
let sprite = loader.load('./img/1.jpg', handle_load);
function handle_load(){
     material = new THREE.MeshStandardMaterial( {
          map: sprite,
     } );

     const geometry = new THREE.PlaneGeometry( 10,10,5 );
     mesh = new THREE.Mesh(geometry,material);
     scene.add(mesh);
}
let gallery = ['./img/1.jpg','./img/2.jpg'];
let current = 0;
let btn2 = document.querySelector('.btn--next');
btn2.addEventListener('click', function () {

     setTimeout(function () {
          anime({
               targets:mesh.material,
               metalness:[0,1],
               easing:'linear',
               loop:false,
               duration:200,
               complete:function(anim){
                    current++
                    current = current % gallery.length;
                    sprite = loader.load(gallery[current],handle_load);
                    setTimeout(function () {
                         mesh.material.metalness = 1.0;
                         anime({
                              targets:mesh.material,
                              metalness:[1,0],
                              easing:'easeOutExpo',
                              loop:false,
                              duration:1500,
                    });
                    },1)

               }
          });
     },1)

});

camera.position.z = 20;
const clock = new THREE.Clock();

const animate = function () {
     requestAnimationFrame( animate );

     renderer.render( scene, camera );
};

animate();


// const geometry = new THREE.BoxGeometry( 5,5,5 );
// const material = new  THREE.MeshPhongMaterial({
//      // specular: 0x000000,
//      shininess:100,
//      // roughness:0.4,
//      // metalness:0.0,
//      // emissive: '#000121',
//      map:new  THREE.TextureLoader().load('../assets/img/1.jpg')
// });
//
// const mesh = new THREE.Mesh(geometry,material);
// scene.add(mesh);

// mesh.material.opacity -=0.01;
// mesh.material.metalness += 0.01;
