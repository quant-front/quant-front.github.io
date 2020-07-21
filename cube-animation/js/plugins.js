anime({
     targets: '.decoration',
     rotate:360,
     loop:true,
     duration:5000,
     easing:'linear',
     scaleX: [
          { value: 1.2, duration: 2000 ,easing: 'linear' },
          { value: 1, duration: 1500 ,easing: 'linear' },
     ],
});





function randomValues() {
     anime({
          targets: '.element_particle:nth-child(1)',
          scaleX: function() {
               return anime.random(1, 4);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(100, 300);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(1)',
                    scaleX: function() {
                         return anime.random(1, 7);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(200, 500);
                    },
                    complete: function () {
                      randomValues();
                    }
               })
          }
     });
}

randomValues();


function randomValues11() {
     anime({
          targets: '.element_particle:nth-child(11)',
          scaleX: function() {
               return anime.random(1, 4);
          },

          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(100, 300);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(11)',
                    scaleX: function() {
                         return anime.random(1, 7);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(200, 500);
                    },
                    complete: function () {
                         randomValues11();
                    }
               })
          }
     });
}

randomValues11();

function randomValues21() {
     anime({
          targets: '.element_particle:nth-child(21)',
          scaleX: function() {
               return anime.random(1, 4);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(150, 400);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(21)',
                    scaleX: function() {
                         return anime.random(1, 7);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(50, 380);
                    },
                    complete: function () {
                         randomValues21();
                    }
               })
          }
     });
}

randomValues21();

function randomValues31() {
     anime({
          targets: '.element_particle:nth-child(31)',
          scaleX: function() {
               return anime.random(1, 4);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(150, 400);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(31)',
                    scaleX: function() {
                         return anime.random(1, 7);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(0, 680);
                    },
                    complete: function () {
                         randomValues31();
                    }
               })
          }
     });
}

randomValues31();

function randomValues41() {
     anime({
          targets: '.element_particle:nth-child(41)',
          scaleX: function() {
               return anime.random(1, 6);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(250, 350);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(41)',
                    scaleX: function() {
                         return anime.random(1, 4);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(300, 450);
                    },
                    complete: function () {
                         randomValues41();
                    }
               })
          }
     });
}

randomValues41();

function randomValues51() {
     anime({
          targets: '.element_particle:nth-child(51)',
          scaleX: function() {
               return anime.random(1, 3);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(150, 390);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(51)',
                    scaleX: function() {
                         return anime.random(1, 7);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(30, 750);
                    },
                    complete: function () {
                         randomValues51();
                    }
               })
          }
     });
}

randomValues51();

function randomValues61() {
     anime({
          targets: '.element_particle:nth-child(61)',
          scaleX: function() {
               return anime.random(1, 3);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(150, 390);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(61)',
                    scaleX: function() {
                         return anime.random(1, 7);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(30, 750);
                    },
                    complete: function () {
                         randomValues61();
                    }
               })
          }
     });
}

randomValues61();

function randomValues71() {
     anime({
          targets: '.element_particle:nth-child(71)',
          scaleX: function() {
               return anime.random(1, 5);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(250, 790);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(71)',
                    scaleX: function() {
                         return anime.random(1, 5);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(150, 750);
                    },
                    complete: function () {
                         randomValues71();
                    }
               })
          }
     });
}

randomValues71();

function randomValues81() {
     anime({
          targets: '.element_particle:nth-child(81)',
          scaleX: function() {
               return anime.random(1, 3.5);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(350, 590);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(81)',
                    scaleX: function() {
                         return anime.random(1, 3);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(250, 450);
                    },
                    complete: function () {
                         randomValues81();
                    }
               })
          }
     });
}

randomValues81();

function randomValues91() {
     anime({
          targets: '.element_particle:nth-child(91)',
          scaleX: function() {
               return anime.random(1, 4.5);
          },
          easing: 'linear',
          duration: 750,
          delay: function() {
               return anime.random(150, 590);
          },
          complete: function(anim) {
               anime({
                    targets: '.element_particle:nth-child(91)',
                    scaleX: function() {
                         return anime.random(1, 6);
                    },
                    easing: 'linear',
                    duration: 750,
                    delay: function() {
                         return anime.random(50, 550);
                    },
                    complete: function () {
                         randomValues91();
                    }
               })
          }
     });
}

randomValues91();

function Car(s) {
     console.log(s);
}
car1 = new Car('low');
car2 = new Car('second');


