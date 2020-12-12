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
controls.target.set(0,4,0);

let clock = new  THREE.Clock();


const geometry = new THREE.BoxGeometry( 1,3,1 );
geometry.vertices.forEach(vertex => vertex.y +=1.5);
const material = new  THREE.MeshNormalMaterial({});
const block = new THREE.Mesh(geometry,material);

let parts = [];
for (let i = 0; i <4 ; i++) {
     const  mesh = block.clone();

     parts.push(mesh);

     if (i===0) {
          scene.add(mesh);
     }
     else {
          mesh.position.y = 3;
          parts[i-1].add(mesh);
     }
}


camera.position.set(0,0,30);

const animate = function () {
     requestAnimationFrame( animate );
     const theta = Math.sin(clock.getElapsedTime());
     parts.forEach(part => part.rotation.z = theta);
     // mesh.rotation.x += 0.01;
     // mesh.rotation.y += 0.01;
     controls.update();
     renderer.render( scene, camera );
};

animate();
