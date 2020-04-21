function mainAnimation(counter) {

     const boxAnimation = anime.timeline({
          easing: 'easeInOutQuad',
     });
     boxAnimation
          .add({
               targets: '.header-box',
               translateY: -135,
               duration: 1850,
               begin: function (anim) {
                    anime({
                         targets: '.line-hidden',
                         opacity: [1, 0],
                         easing: 'linear',
                         duration: 1000,
                         delay: 1750,
                         complete: function (anim) {
                              let boxLine = anime.timeline({});
                              boxLine
                                   .add({
                                        targets: '.box-line',
                                        opacity: [0, 1],
                                        duration: 200,
                                   }, '-=700')
                         },
                    });
               },
          })
          .add({
               targets: '.header-box',
               opacity: [1, 0]
          },)
          .add({
               targets: '.table-box',
               translateY: -100,
               easing: 'easeOutBack',
               begin: function (anim) {
                    setTimeout(function () {
                         anime({
                              targets: '.box-text',
                              innerHTML: [0, counter],
                              easing: 'easeInOutQuad',
                              duration: 4200,
                              round: 1
                         });
                    });
               },
          }, '-=1900')
          .add({
               targets: '.table-box',
               begin: function (anim) {
                    let table = document.querySelector('.table-box');
                    table.style.transformOrigin = '50% 50%';
               },
               rotate: -79,
               translateY: -145,
          },)
          .add({
               targets: '.table-box',
               begin: function (anim) {
                    let table = document.querySelector('.table-box');
                    table.style.transformOrigin = '50% 50%';
               },
               rotate: -11,
               translateY: -213,
          },)
          .add({
               targets: '.table-box',
               begin: function (anim) {
                    let table = document.querySelector('.table-box');
                    table.style.transformOrigin = '50% 50%';
               },
               rotate: -42,
               translateY: -225,
               translateX: -20,
          },)

          .add({
               targets: '.table-box',
               keyframes: [
                    {translateY: -240},
                    {translateY: -200},
                    {translateY: -240},
               ],
               duration: 1150,
          },)
          .add({
               targets: '.main-box , .front-box',
               translateX: 95,
               duration: 500,
               scale: [1, 0.7],
          },)

          .add({
               targets: '.reveal-front',
               opacity: [1, 0],
               duration: 10,
               scale: [1, 0.7],
          }, '-=500')
          .add({
               targets: '.table-box',
               scale: [1, 1.5],
               complete: function (anim) {
                    if (rubleStart === true){
                         rubleStripe();
                    } else {
                         coinStripe();
                    }
                    update();
                    anime({
                         targets: '.canvas',
                         delay:10000,
                         duration:2500,
                         opacity:[1,0],
                         easing:'easeInOutQuad',
                    });
               }
          });

     return{
          rubleTransform() {
               const wrap = document.querySelector('.ruble-table .wrapper-text');
               const currency = document.querySelector('#ruble-element');
               const numberLength = counter.toString().length;
               console.log(numberLength);
               switch (numberLength) {
                    case 1:
                         wrap.style = RubleTransforms.ruble[1];
                         currency.style = RubleTransforms.rubleSymbol[1];
                         break;
                    case 2:
                         wrap.style = RubleTransforms.ruble[2];
                         currency.style = RubleTransforms.rubleSymbol[2];
                         break;
                    case 3:
                         wrap.style = RubleTransforms.ruble[3];
                         currency.style = RubleTransforms.rubleSymbol[3];
                         break;
                    case 4:
                         wrap.style = RubleTransforms.ruble[4];
                         currency.style = RubleTransforms.rubleSymbol[4];
                         break;
                    case 5:
                         wrap.style = RubleTransforms.ruble[5];
                         currency.style = RubleTransforms.rubleSymbol[5];
                         break;
               }
          },
          CoinTransform() {
               const wrap = document.querySelector('.coin-table .wrapper-text');
               const currency = document.querySelector('.coin-star');
                    const numberLength = counter.toString().length;
               console.log(numberLength);
               switch (numberLength) {
                    case 1:
                         wrap.style = CoinTransforms.coin[1];
                         currency.style = CoinTransforms.coinSymbol[1];
                         break;
                    case 2:
                         wrap.style = CoinTransforms.coin[2];
                         currency.style = CoinTransforms.coinSymbol[2];
                         break;
                    case 3:
                         wrap.style = CoinTransforms.coin[3];
                         currency.style = CoinTransforms.coinSymbol[3];
                         break;
                    case 4:
                         wrap.style = CoinTransforms.coin[4];
                         currency.style = CoinTransforms.coinSymbol[4];
                         break;
                    case 5:
                         wrap.style = CoinTransforms.coin[5];
                         currency.style = CoinTransforms.coinSymbol[5];
                         break;
               }
          }
     }
}



function ruble() {
     rubleStart = true;
     let coinDesktopRight = 306;
     let coinDesktopTop = -87;

     let coinDesktopRandomMin = 700;
     let coinDesktopRandomMax = 450;

     let coinRandomTopMin = 200;
     let coinRandomTopMax = 300;

     if (window.innerWidth > 1300) {
          coinDesktopRandomMin = 700;
          coinDesktopRandomMax = 550;
     } else if (window.innerWidth > 1000) {
          coinDesktopRight = 305;
          coinDesktopTop = -87;

          coinDesktopRandomMin = 550;
          coinDesktopRandomMax = 350;

          coinRandomTopMin = 120;
          coinRandomTopMax = 170;

     } else if (window.innerWidth >= 768) {
          coinDesktopRight = 310;
          coinDesktopTop = -54;
          coinDesktopRandomMin = 400;
          coinDesktopRandomMax = 250;
     } else if (window.innerWidth >= 767) {
          coinDesktopRight = 221;
          coinDesktopTop = -83;
     } else if (window.innerWidth >= 550) {
          coinDesktopRight = 497;
          coinDesktopTop = -83;
          coinRandomTopMin = 120;
          coinRandomTopMax = 80;
          coinDesktopRandomMin = 350;
          coinDesktopRandomMax = 150;
     } else if (window.innerWidth > 410) {
          coinDesktopRight = 358;
          coinDesktopTop = -83;
          coinRandomTopMin = 120;
          coinRandomTopMax = 80;
          coinDesktopRandomMin = 250;
          coinDesktopRandomMax = 70;
     } else if (window.innerWidth > 370) {
          coinDesktopRight = 327;
          coinDesktopTop = -83;
          coinRandomTopMin = 120;
          coinRandomTopMax = 80;
          coinDesktopRandomMin = 250;
          coinDesktopRandomMax = 70;
     } else if (window.innerWidth > 359) {
          coinDesktopRight = 324;
          coinDesktopTop = -83;
          coinRandomTopMin = 120;
          coinRandomTopMax = 80;
          coinDesktopRandomMin = 250;
          coinDesktopRandomMax = 70;
     } else if (window.innerWidth > 319) {
          coinDesktopRight = 274;
          coinDesktopTop = -83;
          coinRandomTopMin = 120;
          coinRandomTopMax = 80;
          coinDesktopRandomMin = 250;
          coinDesktopRandomMax = 70;
     }
     let rubleTable = document.querySelector('.ruble-table');
     rubleTable.style.display = 'block';
     rubleTable.classList.add('table-box');
     mainAnimation(566).rubleTransform();
     let rubleAnimation = anime.timeline({});

     rubleAnimation
          .add({
               targets: '.circle',
               top: function () {
                    return anime.random(coinRandomTopMin, coinRandomTopMax);
               },
               right: function () {
                    return anime.random(coinDesktopRandomMin, coinDesktopRandomMax);
               },
               easing: 'linear',
               scale: [1.4, 1.2],
               duration: function () {
                    return anime.random(1500, 1900);
               },

               delay: anime.stagger(100),
          }, 2450)
          .add({
               targets: '.circle',
               right: coinDesktopRight,
               top: coinDesktopTop,
               easing: 'easeInOutQuad',
               scale: [1.2, 1],
               duration: function () {
                    return anime.random(2500, 3000);
               },
          }, '-=210')
          .add({
               targets: '.circle',
               top: -150,
               duration: 700,
               easing: 'easeInQuad',
          });


}







const  start = document.querySelector('.reveal-front svg');
start.addEventListener('click',coins);

const shake = setInterval(myTimer, 2000);

 function myTimer(){
      let svgBox = document.querySelector('.svg-image');
      let revial = document.querySelector('.reveal-front');
      svgBox.style.animation = 'shake 1 linear 0.8s';
      revial.style.animation = 'shake 1 linear 0.8s';
      setTimeout(function () {
           svgBox.removeAttribute("style");
           revial.removeAttribute("style");
      }, 1300);

 }

// btnShake.addEventListener("click", function () {
//      // clearInterval(shake);
// });


function coins() {
     rubleStart = false;
     let coinDesktopRight = 190;
     let coinDesktopTop = -87;

     let coinDesktopRandomMin = 700;
     let coinDesktopRandomMax = 450;

     let coinRandomTopMin = 200;
     let coinRandomTopMax = 300;

     if (window.innerWidth > 1300) {
          let coinDesktopRandomMin = 700;
          let coinDesktopRandomMax = 450;
     } else if (window.innerWidth > 1000) {
          coinDesktopRight = 190;
          coinDesktopTop = -87;
          coinDesktopRandomMin = 550;
          coinDesktopRandomMax = 350;
     } else if (window.innerWidth >= 768) {
          coinDesktopRight = 190;
          coinDesktopTop = -54;
          coinDesktopRandomMin = 400;
          coinDesktopRandomMax = 250;
     } else if (window.innerWidth >= 767) {
          coinDesktopRight = 221;
          coinDesktopTop = -83;
     } else if (window.innerWidth > 550) {
          coinDesktopRight = 158;
          coinDesktopTop = -83;
          coinRandomTopMin = 120;
          coinRandomTopMax = 80;
          coinDesktopRandomMin = 250;
          coinDesktopRandomMax = 70;
     } else if (window.innerWidth > 410) {
          coinDesktopRight = 158;
          coinDesktopTop = -83;
          coinRandomTopMin = 120;
          coinRandomTopMax = 80;
          coinDesktopRandomMin = 250;
          coinDesktopRandomMax = 70;
     } else if (window.innerWidth > 370) {
          coinDesktopRight = 143;
          coinDesktopTop = -83;
          coinRandomTopMin = 120;
          coinRandomTopMax = 80;
          coinDesktopRandomMin = 250;
          coinDesktopRandomMax = 70;
     } else if (window.innerWidth > 359) {
          coinDesktopRight = 149;
          coinDesktopTop = -83;
          coinRandomTopMin = 120;
          coinRandomTopMax = 80;
          coinDesktopRandomMin = 250;
          coinDesktopRandomMax = 70;
     } else if (window.innerWidth > 319) {
          coinDesktopRight = 120;
          coinDesktopTop = -83;
          coinRandomTopMin = 120;
          coinRandomTopMax = 80;
          coinDesktopRandomMin = 250;
          coinDesktopRandomMax = 70;
     }
     clearInterval(shake);

     let coinTable = document.querySelector('.coin-table');
     coinTable.style.display = 'block';
     coinTable.classList.add('table-box');

     mainAnimation(2240).CoinTransform();

     let circle = document.querySelectorAll('.circle-options');
     for (let i = 0; i < circle.length; i++) {
          circle[i].style.backgroundImage = 'url(img/coins.svg)';
     }

     let coinsAnimation = anime.timeline({});

     coinsAnimation
          .add({
               targets: '.circle',
               top: function () {
                    return anime.random(coinRandomTopMin, coinRandomTopMax);
               },
               right: function () {
                    return anime.random(coinDesktopRandomMin, coinDesktopRandomMax);
               },
               easing: 'linear',
               scale: [1.4, 1.2],
               duration: function () {
                    return anime.random(1500, 1900);
               },

               delay: anime.stagger(100),
          }, 2450)
          .add({
               targets: '.circle',
               right: coinDesktopRight,
               top: coinDesktopTop,
               easing: 'easeInOutQuad',
               scale: [1.2, 1],
               duration: function () {
                    return anime.random(2500, 3000);
               },
          }, '-=210')
          .add({
               targets: '.circle',
               top: -150,
               duration: 700,
               easing: 'easeInQuad',
          });

}


let forGeneration = 5;

function generation() {
     for (let i = 0; i < forGeneration; i++) {
          let circle = document.createElement('div');
          let container = document.querySelector('.wrapper__item');
          circle.className = 'circle circle-options';
          container.appendChild(circle);
     }
}

generation();


function coinStripe() {
     anime({
          targets: '.stripe',
          rotate: [0, -27],
          duration: 1500,
          easing: 'easeInOutQuad',
          begin: function (anim) {
               let stripe = document.querySelector('.coin-table .stripe');
               stripe.style.transformOrigin = '100% 0%';
          },
          complete: function (anim) {
               anime({
                    targets: '.stripe',
                    rotate: [10, -27],
                    loop: true,
                    duration: 1800,
                    easing: 'easeInOutQuad',
               });
               anime({});
          },
     });
}

function rubleStripe() {
     anime({
          targets: '.stripe',
          rotate: [0, -27],
          duration: 1500,
          easing: 'easeInOutQuad',
          begin: function (anim) {
               let stripe = document.querySelector('.ruble-table .stripe');
               stripe.style.transformOrigin = '100% 0%';
          },
          complete: function (anim) {
               anime({
                    targets: '.stripe',
                    rotate: [20, -27],
                    loop: true,
                    duration: 1800,
                    easing: 'easeInOutQuad',
               });
               anime({});
          },
     });
}



const RubleTransforms = {
     ruble: {
       1:'transform: translate(37px, 37px);',
       2:'transform: translate(27px, 27px);',
       3:'transform: translate(17px, 17px);',
       4:'transform: translate(10px, 10px);',
       5:'transform: translate(8px, 8px);',
     },
     rubleSymbol:{
       1:'transform: translate(-25px, -20px);',
       2:'transform: translate(-22px, -18px);',
       3:'transform: translate(-19px, -16px);',
       4:'transform: translate(-13px, -11px);',
       5:'transform: translate(-2px, -1px);',
     }
};




const CoinTransforms = {
     coin:{
       1:'transform: translate(30px, 30px);',
       2:'transform: translate(20px, 20px);',
       3:'transform: translate(20px, 20px);',
       4:'transform: translate(10px, 10px);',
       5:'',
     },
     coinSymbol: {
       1:'transform:translate(30px, 30px);',
       2:'transform:translate(20px, 20px);',
       3:'transform: translate(20px, 20px);',
       4:'transform: translate(10px, 10px);',
       5:'',
     }
};

