
imageAnimation = (image = '.sp-image', sect) => {
     anime({
          targets:`${sect} ${image}`,
          clipPath:'polygon(0px 0px, 1222px 0px, 1222px 1096px, 0px 1096px)',
          duration:2700,
          opacity:[{ value: 1, duration: 700 },],
          easing:'easeOutExpo',
     })
}


textAnimation = (text , sect) => {
     anime({
          targets:`${sect} ${text}`,
          translateY: ["1.0em", 0],
          duration:1050,
          translateZ: 0,
          easing:'easeOutQuart',
     })
}
inView.offset(300);
inView('.section-1 .item__image').once('enter', el => {imageAnimation('.sp-image','.section-1');});
inView('.section-2 .item__image').once('enter', el => {imageAnimation('.sp-image','.section-2');});
inView('.section-3 .item__image').once('enter', el => {imageAnimation('.sp-image','.section-3');});

{
     inView.offset(0);
     inView('.section-1 .item__text .text').once('enter', el => {textAnimation('.item__text .text','.section-1');});
     inView('.section-2 .item__text .text').once('enter', el => {textAnimation('.item__text .text','.section-2');});
     inView('.section-3 .item__text .text').once('enter', el => {textAnimation('.item__text .text','.section-3');});
}



anime({
     targets:'.wrap .text',
     translateY: ["1.0em", 0],
     duration:1050,
     translateZ: 0,
     easing:'easeOutQuart',
     delay: function(el, i, l) {
          return i * 100;
     },
})


var controller = new ScrollMagic.Controller();

var animation = anime({
     targets: ".section-1 .item__text ",
     translateX:70+'%',
     easing:'linear',
     duration:4500,
});

new ScrollMagic.Scene({
     triggerElement: '.section-1 .text',
     duration: "130%",
     triggerHook: 0.3
})
     .setAnime(animation)
     // .addIndicators()
     .addTo(controller);

var animation1 = anime({
     targets: ".section-2 .item__text ",
     translateX:-70+'%',
     easing:'linear',
     duration:1500,
});

new ScrollMagic.Scene({
     triggerElement: '.section-2 .text',
     duration: "130%",
     triggerHook: 0.3
})
     .setAnime(animation1)
     .addTo(controller);

var animation2 = anime({
     targets: ".section-3 .item__text ",
     translateX:-70+'%',
     easing:'linear',
     duration:4500,
});

new ScrollMagic.Scene({
     triggerElement: '.section-3 .text',
     duration: "130%",
     triggerHook: 0.3
})
     .setAnime(animation2)
     .addTo(controller);

const cursor = document.querySelector('.cursor');
const cursors = document.querySelector('.new-curs');
const  editCursor = e => {
     const { clientX: x, clientY: y } = e;
     cursor.style.left = x + 'px';
     cursor.style.top = y + 'px';
     cursors.style.left = x + 'px';
     cursors.style.top = y + 'px';
};
window.addEventListener('mousemove', editCursor);

{
 const section0 = document.querySelector('.main')
 const section1 =  document.querySelector('.section-1');
 const section2 =  document.querySelector('.section-2');
 const section3 =  document.querySelector('.section-3');
 const curs = document.querySelector('.new-curs');
 section1.addEventListener('mouseenter', () => {
      curs.style.border = ' 0.1rem solid black';
 })
     section0.addEventListener('mouseenter', () => {
          curs.style.border = ' 0.1rem solid yellow';
     })
     section2.addEventListener('mouseenter', () => {
          curs.style.border = ' 0.1rem solid red';
     })
     section3.addEventListener('mouseenter', () => {
          curs.style.border = ' 0.1rem solid blueviolet';
     })

}