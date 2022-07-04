import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

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

let grid = new THREE.GridHelper(30, 5, "yellow", "yellow");
grid.position.y = 0.5;
scene.add(grid);

let g = new THREE.PlaneGeometry(30, 30, 100, 100);
g.rotateX(-Math.PI * 0.5);
let m = new THREE.MeshBasicMaterial({color: "aqua", wireframe: true});
let o = new THREE.Mesh(g, m);
scene.add(o);

let randoms = [];
let counter = 0;
const MAX_COUNT = THREE.MathUtils.randInt(5, 10);
while(counter < MAX_COUNT){
     let rnd = THREE.MathUtils.randInt(0, 24);
     if (!randoms.includes(rnd)){
          randoms.push(rnd);
          counter++;
     }
}

let pos = g.attributes.position;
randoms.forEach( rnd => {
     let itemX = rnd % 5;
     let itemY = Math.floor(rnd / 5);
     console.log(rnd, itemX, itemY);
     let itemStep = 30 / 5;
     let centerX = -15 + (itemX + 0.5) * itemStep;
     let centerY = 15 - (itemY + 0.5) * itemStep;


     let rndHeight = THREE.MathUtils.randInt(5, 10);

     for(let i = 0; i < pos.count; i++){
          let currentX = pos.getX(i);
          let currentY = pos.getZ(i);
          let diffX = currentX - centerX;
          let diffY = currentY - centerY;
          let dist = Math.hypot(diffX, diffY);
          if (dist <= itemStep * 0.5){
               let currentHeight = smoothstep(itemStep * 0.5, 0, dist) * rndHeight;
               pos.setY(i, currentHeight);
          }
     }
})
g.computeVertexNormals();

let controls = new  OrbitControls(camera,renderer.domElement);

camera.position.z = 20;
const clock = new THREE.Clock();

function animation( time = 0 ) {
     controls.update();



     renderer.render( scene, camera );
}

function smoothstep (min, max, value) {
     var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
     return x*x*(3 - 2*x);
};
