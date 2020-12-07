const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );




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



let controls = new  THREE.OrbitControls(camera,renderer.domElement);


let gallery = [0x61EC12,0xEC12E5,0x12C8EC,0xEC125B,0x124DEC,0xEC5E12];
let current = 0;
let light;
light = new THREE.AmbientLight (0x61EC12,2);
scene.add(light);
let btn2 = document.querySelector('.btn--next');
btn2.addEventListener('click', function () {
     current++
     current = current % gallery.length;
     scene.remove(light);
     light = new THREE.AmbientLight (gallery[current],3);
     scene.add(light);
});


let loader = new THREE.GLTFLoader();
loader.load('img/zombie.glb', handle_load);

let mesh;

function handle_load(gltf){
     mesh = gltf.scene;
     mesh.material = new THREE.MeshPhongMaterial();
     scene.add(mesh);
}



camera.position.z = 15;

const animate = function () {
     requestAnimationFrame( animate );

     renderer.render( scene, camera );
};

animate();
