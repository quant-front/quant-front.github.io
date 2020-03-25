// Wrap every letter in a span

// let textWrapper = document.querySelector('.ml1 .letters');
// textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

//scrollmagic.io

// var controller = new ScrollMagic.Controller();

var animation = anime({
    targets: ".element",
    scale: [1.5]
});

// new ScrollMagic.Scene({
//     triggerElement: '.trigger',
//     duration: "130%",
//     triggerHook: 0.3
// })
//      .setAnime(animation)
//      .addIndicators()
//      .addTo(controller);


// observer on scroll 



( () => {
     let container = document.querySelector('.container');
     // let count = 40;
     for (let i=0; i < 40; i++) {
       let gooeyBox = document.createElement('div');
           gooeyBox.className = 'box';
           container.appendChild(gooeyBox);
      }
     function size () {
          let gooey = document.querySelectorAll('.box');
          for (let i = 0; i < gooey.length; i ++) {
               gooey[i].style.left =Math.floor(Math.random()*90)+ 'vw';
               gooey[i].style.top =Math.floor(Math.random()*80)+ 'vh';
          }
     }
     setInterval(size, 2000);

})();


