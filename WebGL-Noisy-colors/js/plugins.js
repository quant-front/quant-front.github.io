import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import  {ImprovedNoise} from "three/examples/jsm/math/ImprovedNoise";

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

let Noise = new ImprovedNoise();
// sim.noise()

let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));



let controls = new  OrbitControls(camera,renderer.domElement);


const coords = [];
let colors = [];
let x = 0;
let y = 0;
let z = 0;
let r;
let g;
let b;
let numCols = 10;
let numRows = 10;
let ns;
let col;
const points = [];
let point = {
     position: {},
     rate: 0.0,
};

const geo = new THREE.BufferGeometry();
for (let i = 0; i < numCols ; i+= 0.1) {
     for (let j = 0; j < numRows; j+= 0.1) {
          x = i;
          y = j;
          ns = Noise.noise(x,y,0);
          z = ns;
          r = ns / 20;
          g = 0;
          b = 0;
          colors.push(r,g,b);
          coords.push(x,y,z);
          col = new THREE.Color(r,g,b);
          point = {
               position: {
                    x,
                    y,
                    z,
               },
               color: new THREE.Color(r, g, b),
          };

          points.push(point);

     }
}



geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
geo.setAttribute("position", new THREE.Float32BufferAttribute(coords, 3));
const mat = new THREE.PointsMaterial({ size: 0.2, vertexColors:true });
const pointsObj = new THREE.Points(geo, mat);
scene.add(pointsObj);
pointsObj.position.x = -5;
pointsObj.position.y = -5;



function updatePoints(t) {
     const coords = [];
     const cols = [];

     points.forEach((p, i) => {
          let {x, y, z } = p.position;
          ns = Noise.noise(p.position.x , p.position.y, t);
              //  r = Math.sin((ns * t /2)-0.1);
               r =  THREE.MathUtils.lerp(ns,ns,t)
               g = 0;
               b = 0;
          cols.push(r, g, b);

          coords.push(x, y, z);
     });
     geo.setAttribute("position", new THREE.Float32BufferAttribute(coords, 3));
     geo.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
}




camera.position.z = 20;
const clock = new THREE.Clock();

const timeMult = 0.0005;

function animation( timeStep ) {
     controls.update();
     updatePoints(timeStep * timeMult);

     renderer.render( scene, camera );
}

//https://www.youtube.com/watch?v=w2ljEVh3i5w&ab_channel=RobotBobby
//https://github.com/bobbyroe/noise-grid/blob/master/index.js
