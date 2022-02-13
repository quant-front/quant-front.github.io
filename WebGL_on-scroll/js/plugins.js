import * as THREE from 'three/build/three.module.js';

const scene = new THREE.Scene();
const sizes = {
     width: window.innerWidth,
     height: window.innerHeight
}


const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)

const canvas = document.querySelector('canvas.webgl')
let renderer = new THREE.WebGLRenderer({  alpha: true, canvas: canvas});
renderer.setSize( window.innerWidth, window.innerHeight );



window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});




const geometry = new THREE.SphereGeometry(2, 64, 64);
const material = new  THREE.MeshNormalMaterial({color: "#444", transparent: true, side: THREE.DoubleSide, alphaTest: 0.9, opacity: 1, roughness: 0.7});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

let mesh1 = new THREE.Mesh(geometry,material);
scene.add(mesh1)
mesh1.position.y = -10;

let mesh2 = new THREE.Mesh(geometry,material);
scene.add(mesh2)
mesh2.position.y = -20;

let scrollY = window.scrollY;
window.addEventListener('scroll', () =>
{
     scrollY = window.scrollY

     console.log(scrollY)
})


camera.position.z = 20;
const clock = new THREE.Clock();

const animate = function () {
     requestAnimationFrame( animate );
     camera.position.y = - scrollY / sizes.height * 10;

     renderer.render( scene, camera );
};

animate();
