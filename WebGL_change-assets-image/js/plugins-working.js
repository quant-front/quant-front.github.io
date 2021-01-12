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

hlight = new THREE.AmbientLight (0x404040,10);
scene.add(hlight);

let controls = new  THREE.OrbitControls(camera,renderer.domElement);



const geometry = new THREE.BoxGeometry( 5,5,5 );


const loadingManager = new THREE.LoadingManager();
loadingManager.setURLModifier(loadAssets);

function loadAssets(url) {
     return url;
}


let loader = new THREE.GLTFLoader(loadingManager);
loader.load('./img/metal/scene.gltf', handle_load);
function handle_load(gltf){
     scene.add( gltf.scene );
}


let gallery = ['./img/metal/textures/initialShadingGroup_baseColor.jpeg','./img/metal/textures-1/initialShadingGroup_baseColor.jpeg','./img/metal/textures-2/initialShadingGroup_baseColor.jpeg'];
let current = 0;
let btnStart = document.querySelector('.btn--next');
btnStart.addEventListener('click', function () {
     current++
     current = current % gallery.length;

     loadingManager.setURLModifier(loadAssets);
     function loadAssets(url) {
          if ( url === './img/metal/textures/initialShadingGroup_baseColor.jpeg' ) {
               url = gallery[current]
          }
          return url;
     }
     loader.load('./img/metal/scene.gltf', handle_load);

})

camera.position.z = 5;

const animate = function () {
     requestAnimationFrame( animate );
     // mesh.rotation.x += 0.01;
     // mesh.rotation.y += 0.01;
     renderer.render( scene, camera );
};

animate();
