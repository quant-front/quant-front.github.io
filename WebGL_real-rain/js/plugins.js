const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 1, 1000 );
camera.position.z = 1;
camera.rotation.x =1.16;
camera.rotation.y = -0.12;
camera.rotation.z = 0.27;

let cloudGeo, cloudMaterial, cloudParticles = [], flash, rain,rainGeo,rainMaterial,rainDrop;

let renderer = new THREE.WebGLRenderer();
scene.fog = new THREE.FogExp2(0x1c1c2a, 0.002);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(scene.fog.color);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );

let embient = new THREE.AmbientLight(0x555555);
scene.add(embient);
let DirectionLight = new  THREE.DirectionalLight(0xffeedd);
DirectionLight.position.set(0,0,1);
scene.add(DirectionLight);
flash = new THREE.PointLight(0x062d89,30,500,1.7);
flash.position.set(200,300,100);
scene.add(flash);


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});


let loader = new  THREE.TextureLoader();
loader.load("../img/smoke-1.png", function (texture) {
   cloudGeo = new THREE.PlaneBufferGeometry(500,500);
   cloudMaterial = new  THREE.MeshLambertMaterial({
        map:texture,
        transparent: true
   })
     for(let p=0; p<25; p++) {
          let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
          cloud.position.set(
               Math.random()*800 -400,
               500,
               Math.random()*500 - 450
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random()*360;
          cloud.material.opacity = 0.6;
          cloudParticles.push(cloud);
          scene.add(cloud);
     }
})
let rainCount = 10000;
rainGeo = new THREE.Geometry();
for(let i=0;i<rainCount;i++) {
     rainDrop = new THREE.Vector3(
          Math.random() * 400 -200,
          Math.random() * 500 - 250,
          Math.random() * 400 - 200
     );
     rainDrop.velocity ={};
     rainDrop.velocity = 0;
     rainGeo.vertices.push(rainDrop);
}
rainMaterial = new THREE.PointsMaterial({
     color: 0xaaaaaa,
     size: 0.3,
     transparent: true
});
rain = new THREE.Points(rainGeo,rainMaterial);
scene.add(rain);



const animate = function () {

     cloudParticles.forEach(p => {
          p.rotation.z -=0.002;
     });
     rainGeo.vertices.forEach(p => {
          p.velocity -= 0.1 + Math.random() * 0.1;
          p.y += p.velocity;
          if (p.y < -200){
               p.y = 200;
               p.velocity = 0;
          }
     });
     rainGeo.verticesNeedUpdate = true;
     rain.rotation.y += 0.002;
     if(Math.random() > 0.93 || flash.power > 100) {
          if(flash.power < 100){
               flash.position.set(
                    Math.random()*400,
                    300+Math.random()*200,
                    100
               );
          }
     flash.power = 50 + Math.random()*500;
     }

     renderer.render(scene,camera);
     requestAnimationFrame(animate);
};

animate();
