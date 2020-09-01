const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

import getText from '../js/canv.js';


let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );

renderer.sortObjects = true;


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});





let light = new THREE.SpotLight();
light.position.set(-900,500,0);

light.castShadow = true;
scene.add(light);

let controls = new  THREE.OrbitControls(camera,renderer.domElement);


let TextCanvas = new getText();
TextCanvas.draw();


let cavasTexture = new THREE.Texture(TextCanvas.canvas);
cavasTexture.needsUpdate = true;

const geometry = new THREE.SphereGeometry( 3,25,25 );
const material = new  THREE.MeshBasicMaterial({
     // map:new  THREE.TextureLoader().load('../assets/img/1.jpg')
     transparent: true,
     side: THREE.FrontSide,
     flatShading:true,
     map:cavasTexture,
     cavasTexture,
});
const material1 = new  THREE.MeshBasicMaterial({
     // map:new  THREE.TextureLoader().load('../assets/img/1.jpg')
     transparent: true,
     side: THREE.BackSide,
     color:0xFFFFFFF,
     flatShading:true,
     map:cavasTexture,
     alphaMap:cavasTexture,
});


const mesh = new THREE.Mesh(geometry,material);
const mesh1 = new THREE.Mesh(geometry,material1);
mesh.position.z = -0.01;

mesh.renderOrder = 2;
mesh1.renderOrder = 1;
scene.add(mesh);
scene.add(mesh1);

const geometry1 = new THREE.SphereGeometry( 3,25,25 );
const material2 = new  THREE.MeshLambertMaterial({
     map:new  THREE.TextureLoader().load('img/2.jpg')
});
const mesh2 = new THREE.Mesh(geometry1,material2);
mesh2.scale.set(0.9,0.9,0.9);
scene.add(mesh2);



camera.position.z = 20;



const animate = function () {


     requestAnimationFrame( animate );
     mesh.rotation.y -= 0.01;
     mesh1.rotation.y -= 0.01;
     mesh2.rotation.y += 0.005;
     renderer.render( scene, camera );
};

animate();
