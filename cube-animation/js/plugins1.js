function randomValues2() {
     anime({
          targets: '.element_particle:nth-child(2)',
          scaleY: function() {
               return anime.random(1, 4);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(100, 300);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(2)',
                    scaleY: function() {
                         return anime.random(1, 5);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(200, 500);
                    },
                    complete: function () {
                         randomValues2();
                    }
               })
          }
     });

}

randomValues2();

function randomValues3() {
     anime({
          targets: '.element_particle:nth-child(3)',
          scaleY: function() {
               return anime.random(1, 5);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(200, 500);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(3)',
                    scaleY: function() {
                         return anime.random(1, 3);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(100, 300);
                    },
                    complete: function () {
                         randomValues3();
                    }
               })
          }
     });

}

randomValues3();

function randomValues4() {
     anime({
          targets: '.element_particle:nth-child(4)',
          scaleY: function() {
               return anime.random(1, 3);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(50, 250);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(4)',
                    scaleY: function() {
                         return anime.random(1, 4);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(150, 400);
                    },
                    complete: function () {
                         randomValues4();
                    }
               })
          }
     });

}

randomValues4();

function randomValues5() {
     anime({
          targets: '.element_particle:nth-child(5)',
          scaleY: function() {
               return anime.random(1, 6);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(250, 450);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(5)',
                    scaleY: function() {
                         return anime.random(1, 3.5);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(50, 500);
                    },
                    complete: function () {
                         randomValues5();
                    }
               })
          }
     });

}

randomValues5();

function randomValues6() {
     anime({
          targets: '.element_particle:nth-child(6)',
          scaleY: function() {
               return anime.random(1, 4);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(150, 450);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(6)',
                    scaleY: function() {
                         return anime.random(1, 4.5);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(0, 600);
                    },
                    complete: function () {
                         randomValues6();
                    }
               })
          }
     });

}

randomValues6();

function randomValues7() {
     anime({
          targets: '.element_particle:nth-child(7)',
          scaleY: function() {
               return anime.random(1, 4);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(100, 500);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(7)',
                    scaleY: function() {
                         return anime.random(1, 4);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(300, 600);
                    },
                    complete: function () {
                         randomValues7();
                    }
               })
          }
     });

}

randomValues7();

function randomValues8() {
     anime({
          targets: '.element_particle:nth-child(8)',
          scaleY: function() {
               return anime.random(1, 4);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(200, 400);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(8)',
                    scaleY: function() {
                         return anime.random(1, 3);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(100, 300);
                    },
                    complete: function () {
                         randomValues8();
                    }
               })
          }
     });

}

randomValues8();

function randomValues9() {
     anime({
          targets: '.element_particle:nth-child(9)',
          scaleY: function() {
               return anime.random(1, 2);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(50, 200);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(9)',
                    scaleY: function() {
                         return anime.random(1, 2);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(100, 200);
                    },
                    complete: function () {
                         randomValues9();
                    }
               })
          }
     });

}

randomValues9();


