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
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});



let controls = new  THREE.OrbitControls(camera,renderer.domElement);


hlight = new THREE.AmbientLight (0x404040,10);
scene.add(hlight);

let gallery = ['img/metal/textures/','img/metal/textures-1/','img/metal/textures-2/'];
let current = 0;
let btnStart = document.querySelector('.btn--next');
btnStart.addEventListener('click', function () {
   current++
   current = current % gallery.length;
   loader.setResourcePath(gallery[current]);
   loader.load('img/metal/scene.gltf', handle_load);
})


var loader = new THREE.GLTFLoader();
loader.load('img/metal/scene.gltf', handle_load);

var mesh;

function handle_load(gltf){
     mesh = gltf.scene;
     mesh.material = new THREE.MeshLambertMaterial();
     scene.add(mesh);

}


camera.position.z = 7;


const animate = function () {
     requestAnimationFrame( animate );
     renderer.render( scene, camera );
};


animate();
