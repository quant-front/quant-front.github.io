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


let ADD = 0.09;
let donuts= [];

function randomIntFromRange(min,max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
}


// let controls = new  THREE.OrbitControls(camera,renderer.domElement);

let createDonut= function () {
     const geometry = new THREE.BoxGeometry( 1,1,1 );
     const material = new  THREE.MeshBasicMaterial({color:Math.random()* 0xffffff});

     const mesh = new THREE.Mesh(geometry,material);
     mesh.position.x = randomIntFromRange(-13,13);
     mesh.position.y = 15;
     mesh.position.z = randomIntFromRange(-14,14);
     scene.add(mesh);
     donuts.push(mesh);
}





camera.position.z = 20;

const animate = function () {
     requestAnimationFrame( animate );
     let x = Math.random();
     if (x < 0.1){
          createDonut();
     }

     donuts.forEach(mesh => mesh.position.y -= ADD);
     renderer.render( scene, camera );
};

animate();
