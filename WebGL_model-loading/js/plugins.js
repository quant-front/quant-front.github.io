
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.setClearColor(0xFFFCFF);
window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});
controls = new  THREE.OrbitControls(camera,renderer.domElement);




hlight = new THREE.AmbientLight (0x404040,100);
scene.add(hlight);


//
directionalLight = new THREE.DirectionalLight(0xffffff,100);
directionalLight.position.set(0,1,0);
light = new THREE.PointLight(0xc4c4c4,10);
light.position.set(0,300,500);
scene.add(light);



var loader = new THREE.GLTFLoader();
loader.load('scene.gltf', handle_load);

var mesh;

function handle_load(gltf){
     mesh = gltf.scene.children[0];
     mesh.material = new THREE.MeshLambertMaterial();

     scene.add(mesh);
     mesh.scale.set(0.5,0.5,0.5);
     mesh.position.z = -10;
     animate();
}


camera.position.z = 660;


const animate = function () {
     requestAnimationFrame( animate );
     mesh.rotation.z += 0.03;
     mesh.rotation.x += 0.01;

     renderer.render( scene, camera );
};
