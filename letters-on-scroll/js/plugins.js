// Wrap every letter in a span

let textWrapper = document.querySelector('.ml7 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

//scrollmagic.io

let controller = new ScrollMagic.Controller();

var animation = anime({
     targets: '.ml7 .letter',
     translateY: ["1.1em", 0],
     translateX: ["0.55em", 0],
     translateZ: 0,
     rotateZ: [180, 0],
     duration: 750,
     easing: "easeOutExpo",
     delay: (el, i) => 50 * i
});



new ScrollMagic.Scene({
    triggerElement: '.trigger',
    duration: "70%",
    triggerHook: 0.5
})
     .setAnime(animation)
     .addIndicators()
     .addTo(controller);




let textWrapper12 = document.querySelector('.ml2');
textWrapper12.innerHTML = textWrapper12.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

let animation1 = anime({
     targets: '.ml2 .letter',
     scale: [4,1],
     opacity: [0,1],
     translateZ: 0,
     easing: "easeOutExpo",
     duration: 950,
     delay: (el, i) => 70*i
});



new ScrollMagic.Scene({
     triggerElement: '.trigger1',
     duration: "70%",
     triggerHook: 0.5
})
     .setAnime(animation1)
     .addIndicators()
     .addTo(controller);

let textWrapper13 = document.querySelector('.ml10');
textWrapper13.innerHTML = textWrapper13.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

let animation2 = anime({
     targets: '.ml10 .letter',
     rotateY: [-90, 0],
     duration: 1300,
     delay: (el, i) => 45 * i
});



new ScrollMagic.Scene({
     triggerElement: '.trigger2',
     duration: "70%",
     triggerHook: 0.5
})
     .setAnime(animation2)
     .addIndicators()
     .addTo(controller);




let animation3 = anime({
     targets: '.ml15 .word',
     scale: [14,1],
     opacity: [0,1],
     easing: "easeOutCirc",
     duration: 800,
     delay: (el, i) => 800 * i
});



new ScrollMagic.Scene({
     triggerElement: '.trigger3',
     duration: "70%",
     triggerHook: 0.7
})
     .setAnime(animation3)
     .addIndicators()
     .addTo(controller);
