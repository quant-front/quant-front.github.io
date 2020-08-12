const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth/window.innerHeight, 45, 30000 );




let renderer = new THREE.WebGLRenderer({});
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
camera.position.set(-900,-200,-900);

let controls = new  THREE.OrbitControls(camera,renderer.domElement);
controls.minDistance = 500;
controls.maxDistance = 1500;

let materialArray = [];

let texture_ft = new THREE.TextureLoader().load('img/sky/arid_ft.jpg');
let texture_bk = new THREE.TextureLoader().load('img/sky/arid_bk.jpg');
let texture_up = new THREE.TextureLoader().load('img/sky/arid_up.jpg');
let texture_dn = new THREE.TextureLoader().load('img/sky/arid_dn.jpg');
let texture_rt = new THREE.TextureLoader().load('img/sky/arid_rt.jpg');
let texture_lf = new THREE.TextureLoader().load('img/sky/arid_lf.jpg');

materialArray.push(new  THREE.MeshBasicMaterial({map:texture_ft}));
materialArray.push(new  THREE.MeshBasicMaterial({map:texture_bk}));
materialArray.push(new  THREE.MeshBasicMaterial({map:texture_up}));
materialArray.push(new  THREE.MeshBasicMaterial({map:texture_dn}));
materialArray.push(new  THREE.MeshBasicMaterial({map:texture_rt}));
materialArray.push(new  THREE.MeshBasicMaterial({map:texture_lf}));

for (let i = 0; i < 6; i++)
     materialArray[i].side = THREE.BackSide;
let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add( skybox );



const animate = function () {
     requestAnimationFrame( animate );
     controls.update();
     renderer.render( scene, camera );
};

animate();
