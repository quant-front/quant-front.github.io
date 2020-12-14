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




let material;
let mesh;

let gallery = ['./img/1.jpg','./img/2.jpg','./img/3.jpg'];
let current = 0;
let btn2 = document.querySelector('.btn--next');
btn2.addEventListener('click', function () {
     current++
     current = current % gallery.length;
     loader.load(gallery[current], handle_load);

});

let loader = new THREE.TextureLoader();
loader.load('./img/1.jpg', handle_load);
function handle_load(texture){
      material = new THREE.MeshBasicMaterial( {
          map: texture
     } );

     const geometry = new THREE.PlaneGeometry( 10,10,5 );
     mesh = new THREE.Mesh(geometry,material);
     scene.add(mesh);
}


camera.position.z = 20;

const animate = function () {
     requestAnimationFrame( animate );

     renderer.render( scene, camera );
};

animate();
