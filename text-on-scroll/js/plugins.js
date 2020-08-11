// Wrap every letter in a span

// let textWrapper = document.querySelector('.ml1 .letters');
// textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

//scrollmagic.io

var controller = new ScrollMagic.Controller();

var animation = anime({
    targets: ".main p",
     delay: function(el, i, l) {
          return i * 100;
     },
     translationX:20,
     opacity:1,
});

new ScrollMagic.Scene({
    triggerElement: '.trigger',
    duration: "170%",
    triggerHook: 0.3
})
     .setAnime(animation)
     .addTo(controller)
     // .addIndicators()



// observer on scroll 
