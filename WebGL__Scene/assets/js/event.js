
let myMaterial;

let btn2 = document.querySelector('.btn--color');
btn2.addEventListener('click', function () {
     myMaterial = new THREE.MeshPhongMaterial({
          flatShading:false,
          color:0x000000,
          clipShadows: true,
          side: THREE.DoubleSide
     });
     console.log(myMaterial.color);
     eventST();
});

function eventST() {
     myMaterial = new THREE.MeshPhongMaterial({
          flatShading:false,
          color:0xFF001B,
          clipShadows: true,
          side: THREE.DoubleSide
     });
}

eventST();
