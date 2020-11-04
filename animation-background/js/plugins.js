
function init() {
     setTimeout(function () {
          if (window.innerWidth >= 1000) {
//Анимация появления и исчезновения небольшого колличества точек
function randomEl() {
     let anim_els = [];
     let els = document.querySelectorAll('.item');
     for ( let i = 0; i < anime.random(10, 20); i++ ) {
          let  index = anime.random(0,els.length - 1);
          anim_els.push(els[index]);
     }
     anime({
          targets:anim_els,
          duration:3500,
          delay: anime.stagger(50),
          opacity:[0,.8,0],
          // translateY:0,
          // translateX:0,
          easing:'linear',
          complete: randomEl
     });
}
randomEl();
//Анимация появления и исчезновения небольшого колличества точек №2
function randomEl01() {
     let anim_els = [];
     let els = document.querySelectorAll('.item');
     for ( let i = 0; i < anime.random(20, 25); i++ ) {
          let  index = anime.random(0,els.length - 1);
          anim_els.push(els[index]);
     }
     anime({
          targets:anim_els,
          duration:2500,
          delay: anime.stagger(50, {start: 500}),
          opacity:[0,.8,0],
          complete: randomEl01
     });
}
setTimeout(function () {
     randomEl01();
},700)

// Анимация заполнения точками которые не пропадают
function randomEl012() {
     let anim_els = [];
     let els = document.querySelectorAll('.item');
     for ( let i = 0; i < anime.random(25, 30); i++ ) {
          let  index = anime.random(0,els.length - 1);
          anim_els.push(els[index]);
     }
     anime({
          targets:anim_els,
          duration:2000,
          delay: anime.stagger(50, {start: 500}),
          opacity:0.8,
          easing:'easeOutExpo',
          complete: randomEl012
     });
}
randomEl012();

 }
          if (window.innerWidth <= 1000) {

               function randomEl10() {
                    let anim_els = [];
                    let els = document.querySelectorAll('.item');
                    for ( let i = 0; i < anime.random(2, 5); i++ ) {
                         let  index = anime.random(0,els.length - 1);
                         anim_els.push(els[index]);
                    }
                    anime({
                         targets:anim_els,
                         duration:3500,
                         delay: anime.stagger(50),
                         opacity:[0,.8,0],
                         // translateY:0,
                         // translateX:0,
                         easing:'linear',
                         complete: randomEl10
                    });
               }
               randomEl10();

               function randomEl011() {
                    let anim_els = [];
                    let els = document.querySelectorAll('.item');
                    for ( let i = 0; i < anime.random(2, 5); i++ ) {
                         let  index = anime.random(0,els.length - 1);
                         anim_els.push(els[index]);
                    }
                    anime({
                         targets:anim_els,
                         duration:2500,
                         delay: anime.stagger(50, {start: 500}),
                         opacity:[0,.8,0],
                         complete: randomEl011
                    });
               }
               setTimeout(function () {
                    randomEl011();
               },700)

//заполнение точками
               function randomEl0123() {
                    let anim_els = [];
                    let els = document.querySelectorAll('.item');
                    for ( let i = 0; i < anime.random(2, 5); i++ ) {
                         let  index = anime.random(0,els.length - 1);
                         anim_els.push(els[index]);
                    }
                    anime({
                         targets:anim_els,
                         duration:2000,
                         delay: anime.stagger(50, {start: 500}),
                         opacity:0.8,
                         easing:'easeOutExpo',
                         complete: randomEl0123
                    });
               }
               randomEl0123();
          }



//Анимация больших звезд
function randomEl1() {
     let anim_els = [];
     let els1 = document.querySelectorAll('.item');
     for ( let i = 0; i < anime.random(2, 3); i++ ) {
          let  index = anime.random(0,els1.length - 1);
          anim_els.push(els1[index]);
     }
     anime({
          targets:anim_els,
          duration:2500,
          delay:2500,
          scale:[
               { value: 1, duration: 700,delay:700,  },
               { value: 2.2, duration: 700,delay:700 , },
               { value: 1, duration: 700,delay:700 }
          ],
          opacity:[
               { value: 0.8, duration: 700,delay:700,  },
               { value: 1, duration: 700,delay:700 , },
               { value: 1, duration: 700,delay:700 }
          ],
          easing:'linear',
          complete: randomEl1
     });
}
randomEl1();
//Анимация маленьких звезд
function randomEl2() {
     let anim_els = [];
     let els1 = document.querySelectorAll('.item');
     for ( let i = 0; i < anime.random(5, 10); i++ ) {
          let  index = anime.random(0,els1.length - 1);
          anim_els.push(els1[index]);
     }
     anime({
          targets:anim_els,
          duration:3500,
          delay: anime.stagger(150),
          scale:[
               { value: 1, duration: 700,delay:700,  },
               { value: 1.5, duration: 700,delay:700 , },
               { value: 1, duration: 700,delay:700 }
          ],
          opacity:[
               { value: 0.8, duration: 700,delay:700,  },
               { value: 1, duration: 700,delay:700 , },
               { value: 1, duration: 700,delay:700 }
          ],
          easing:'linear',
          complete: randomEl2
     });
}
randomEl2();




//translate X function
function randomEl4() {
     let anim_els = [];
     let els = document.querySelectorAll('.item');
     for ( let i = 0; i < anime.random(1, 1); i++ ) {
          let  index = anime.random(0,els.length - 1);
          anim_els.push(els[index]);
     }
     anime({
          targets:anim_els,
          easing:'easeOutExpo',
          duration:2300,
          opacity:[
               {value:1,duration: 700,delay:1100},
          ],
          translateX: [
               { value: 50, duration: 500 },
               { value: -50, duration: 1500, delay: 1000 },
          ],
          complete: randomEl4
     });
}
randomEl4();

//translate Y function
function randomEl5() {
     let anim_els = [];
     let els = document.querySelectorAll('.item');
     for ( let i = 0; i < anime.random(1, 1); i++ ) {
          let  index = anime.random(0,els.length - 1);
          anim_els.push(els[index]);
     }
     anime({
          targets:anim_els,
          easing:'easeOutExpo',
          duration:2500,
          opacity:[
               {value:1,duration: 700,delay:1100},
          ],
          translateY: [
               { value: 50, duration: 500 },
               { value: -50, duration: 1500, delay: 1000 },
          ],
          complete:  function(anim) {
               setTimeout(function () {
                    randomEl5();
               },500)
                  // Анимация растягивания точки по оси Y
                   setTimeout(function () {
                        let anim_els = [];
                        let els = document.querySelectorAll('.layer__item');
                        for ( let i = 0; i < 1; i++ ) {
                             let  index = anime.random(0,els.length - 1);
                             anim_els.push(els[index]);
                        }
                        anime({
                             targets:anim_els,
                             opacity:1,
                             delay:1000,
                             translateY: [
                                  { value: 50, duration: 3000,  },
                             ],

                             scaleY: [
                                  { value: 4, duration: 100,  easing: 'easeOutElastic(7, .8)' },
                                  { value: 1, duration: 3500 },
                             ],
                             easing: 'easeOutElastic(7, .8)',

                        });
                   },50)

                    setTimeout(function () {
                         // Анимация растягивания точки по оси X
                         let anim_els = [];
                         let els = document.querySelectorAll('.layer__item');
                         for ( let i = 0; i < 1; i++ ) {
                              let  index = anime.random(0,els.length - 1);
                              anim_els.push(els[index]);
                         }
                         anime({
                              targets:anim_els,
                              opacity:1,
                              delay: 23007,
                              translateX: [
                                   { value: 50, duration: 3000,  },
                              ],

                              scaleX: [
                                   { value: 4, duration: 100,  easing: 'easeOutElastic(7, .8)' },
                                   { value: 1, duration: 3500 },
                              ],
                              easing: 'easeOutElastic(7, .8)',
                         });
                    },250)


          }
     });
}
randomEl5();



//Анимация очистки 2го слоя обьектов
function randomElClear() {
     let anim_els = [];
     let els = document.querySelectorAll('.item');
     for ( let i = 0; i < anime.random(10, 20); i++ ) {
          let  index = anime.random(0,els.length - 1);
          anim_els.push(els[index]);
     }
     anime({
          targets:anim_els,
          duration:3500,
          delay: anime.stagger(50),
          opacity:0,
          easing:'linear',
          complete: randomElClear
     });
}
randomElClear();


     },800);
}


window.addEventListener("load", init);

