

let item1 = document.querySelector('.item-1');

item1.addEventListener('mouseenter', function () {
 item1.style.filter = 'url(#wave)';
})

item1.addEventListener('mouseleave', function () {
     item1.style.filter = 'none';
})


let item2 = document.querySelector('.item-2');
item2.addEventListener('mouseenter', filter2);
item2.addEventListener('mouseleave', filter2None);
function filter2() {
     item2.style.filter = 'url(#filter-2)';
     anime({
          targets:['#filter-2 feTurbulence','',],
          baseFrequency: 0,
          duration:2000,
          easing: 'easeInOutExpo'
     });
     anime({
          targets:['#filter-2 feDisplacementMap'],
          duration:2000,
          scale: [40,60],
          loop: false,
          easing: 'easeInOutExpo'
     })
}
function filter2None() {
     item2.style.filter = 'none';
     anime({
          targets:['#filter-2 feDisplacementMap'],
          duration:100,
          scale: 40,
          easing: 'easeInOutExpo'
     })
     anime({
          targets:['#filter-2 feTurbulence','',],
          baseFrequency: 0.1,
          duration:1,
          easing: 'easeInOutExpo'
     });
}

let item3 = document.querySelector('.item-3');
item3.addEventListener('mouseenter', filter3);
item3.addEventListener('mouseleave', filter3None);

function filter3() {
     item3.style.filter = 'url(#filter-3)';
     anime({
          targets:['#filter-3 feTurbulence','',],
          baseFrequency: [0,1],
          duration:400,
          direction: 'alternate',
          easing: 'easeInOutExpo'
     });
}
function filter3None() {
     item3.style.filter = 'none';


}


let item4 = document.querySelector('.item-4');
item4.addEventListener('mouseenter', filter4);
item4.addEventListener('mouseleave', filter4None);

function filter4() {
     item4.style.filter = 'url(#filter-4)';
     anime({
          targets:['#filter-4 feTurbulence','',],
          baseFrequency: [0,0.3],
          duration:1400,
          direction: 'alternate',
          easing: 'easeInOutExpo'
     });
}
function filter4None() {
     item4.style.filter = 'none';
}

let item5 = document.querySelector('.item-5');
item5.addEventListener('mouseenter', filter5);
item5.addEventListener('mouseleave', filter5None);

function filter5() {
     item5.style.filter = 'url(#filter-5)';
     anime({
          targets:[ '#filter-5 feDisplacementMap'],
          baseFrequency: [0,1],
          duration:400,
          scale: 60,
          easing: 'easeInOutExpo'
     });
}
function filter5None() {
     item5.style.filter = 'none';
     anime({
          targets:[ '#filter-5 feDisplacementMap'],
          baseFrequency: [0,1],
          duration:400,
          scale: [60,1],
          easing: 'easeInOutExpo'
     });
}



let item6 = document.querySelector('.item-6');
item6.addEventListener('mouseenter', filter6);
item6.addEventListener('mouseleave', filter6None);

function filter6() {
     item6.style.filter = 'url(#filter-6)';
     anime({
          targets:[ '#filter-6 feDisplacementMap'],
          // baseFrequency: [0,1],
          duration:500,
          scale: [80,0],
          direction:'normal',
          easing: 'easeInOutExpo'
     });
}
function filter6None() {
     item6.style.filter = 'none';
     anime({
          targets:[ '#filter-6 feDisplacementMap'],
          // baseFrequency: [0,1],
          // duration:400,
          // scale: [60,1],
          easing: 'easeInOutExpo'
     });
}