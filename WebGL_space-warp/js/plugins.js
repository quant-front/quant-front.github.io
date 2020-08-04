const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 1, 1000 );


let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setClearColor(0xFFFCFF);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});

camera.position.z = 1;
camera.rotation.x = Math.PI/2;
let star;



const geometry = new THREE.Geometry();
for (let i =0; i<6000; i++){
 star = new THREE.Vector3(
      Math.random()* 600 -300,
      Math.random()* 600 -300,
      Math.random()* 600 -300
 )
     star.velocity = 0;
     star.acceleration = 0.02;
     geometry.vertices.push(star);
}
let sprite = new THREE.TextureLoader().load('img/starts.png');
const material = new  THREE.PointsMaterial({
     color:0xaaaaaa,
     size:0.7,
     map:sprite
})

 const  stars = new THREE.Points(geometry,material);
 scene.add(stars);




const animate = function () {
     requestAnimationFrame( animate );
     geometry.vertices.forEach(p => {
          p.velocity += p.acceleration
          p.y -= p.velocity;
          if (p.y < -200) {
               p.y = 200;
               p.velocity = 0;
          }
     });
     geometry.verticesNeedUpdate = true;
     stars.rotation.y +=0.002;


     let btn = document.querySelector('.btn');
     btn.addEventListener('click', function () {
          camera.rotation.x = Math.PI/0.5;
          stars.rotation.y +=0.0;
          geometry.vertices.forEach(p => {
               p.velocity = 0;
               p.acceleration = 0;
          });
     });
     renderer.render( scene, camera );
};

animate();
