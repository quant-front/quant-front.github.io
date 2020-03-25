// Wrap every letter in a span

// let textWrapper = document.querySelector('.ml1 .letters');
// textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

//scrollmagic.io

function hoverClose() {
    let close = document.querySelectorAll('.btn-close');
    for (let i = 0; i < close.length; i++){
        close[i].addEventListener('mouseenter', function () {
            anime({
                targets: '.btn-close',
                scale: 2,
                rotate: '1turn',
                duration: 1000,
                easing: 'easeInOutQuad',
            });

        });

        close[i].addEventListener('mouseleave', function () {
            anime({
                targets: '.btn-close',
                scale: 1,
                rotate: '-1turn',
                duration: 1000,
                easing: 'easeInOutQuad',
            });

        });

    }

}hoverClose();



function rl () {
let slideContent = document.querySelector('.first__content_slide .slide__content');
let openContent = document.querySelector('.content--1');
let wrapperContent = document.querySelector('.first__content_slide');
let close = document.querySelector('.close__content--1');

openContent.addEventListener('click', function (evt) {
    evt.preventDefault();
    wrapperContent.style.display = 'block';
    let animation = anime({
        targets: '.first__content_slide .slide__reveal',
        backgroundColor: '#808080',
        scaleX:['0','1'],
        duration: 1000,
        easing: 'easeOutQuad',
        begin: function() {
            document.querySelector(".first__content_slide .slide__reveal").style.display = "block";
        },
        complete: function() {
            slideContent.style.display = 'grid';
        }
    });
    animation.finished.then(back);

    function back () {
        let box = document.querySelector('.first__content_slide .slide__reveal');
        box.style.transformOrigin = '0% 100%';
        anime({
            targets: '.first__content_slide .slide__reveal',
            scaleX:['1','0'],
            duration: 1000,
            easing: 'easeInOutQuad',
        });
    }

});
    close.addEventListener('click', function () {
        let animation = anime({
            targets: '.slide__reveal',
            backgroundColor: '#00afd8',
            scaleX:['0','1'],
            duration: 1000,
            easing: 'easeOutQuad',
            begin: function() {
                document.querySelector(".slide__reveal").style.display = "block";
            },
            complete: function() {
                slideContent.style.display = 'none';
            }
        });
        animation.finished.then(back);

        function back () {
            let box = document.querySelector('.slide__reveal');
            box.style.transformOrigin = '100% 0%';
            anime({
                targets: '.slide__reveal',
                scaleX:['1','0'],
                duration: 1000,
                easing: 'easeInOutQuad',
                complete: function() {
                    wrapperContent.style.display = 'none';
                }
            });
        }

    });




}rl();





function lr() {
    let slideContent = document.querySelector('.second_slide__content');
    let openContent = document.querySelector('.content--2');
    let wrapperContent = document.querySelector('.second__content_slide');
    let close = document.querySelector('.close__content--2');
    openContent.addEventListener('click', function (evt) {
        wrapperContent.style.display = 'block';
        let animation = anime({
            targets: '.second_slide__reveal',
            backgroundColor: '#808080',
            scaleX:['0','1'],
            duration: 1000,
            easing: 'easeOutQuad',
            begin: function() {
                document.querySelector(".second_slide__reveal").style.display = "block";
            },
            complete: function() {
                slideContent.style.display = 'grid';
            }
        });
        animation.finished.then(back);

        function back () {
            let box = document.querySelector('.second_slide__reveal');
            box.style.transformOrigin = '100% 0%';
            anime({
                targets: '.second_slide__reveal',
                scaleX:['1','0'],
                duration: 1000,
                easing: 'easeInOutQuad',
            });
        }

    });

     close.addEventListener('click', () => {
         let animation = anime({
             targets: '.second_slide__reveal',
             backgroundColor: '#ef605f',
             scaleX:['0','1'],
             duration: 1000,
             easing: 'easeOutQuad',
             complete: function() {
                 slideContent.style.display = 'none';
             }
         });

         animation.finished.then(back);

         function back () {
             let box = document.querySelector('.second_slide__reveal');
             box.style.transformOrigin = '0% 100%';
             anime({
                 targets: '.second_slide__reveal',
                 scaleX:['1','0'],
                 duration: 1000,
                 easing: 'easeInOutQuad',
                 complete: function() {
                     wrapperContent.style.display = 'none';
                 }
             });
         }
     });

}lr();

function third () {
    let slideContent = document.querySelector('.third_slide__content');
    let openContent = document.querySelector('.content--3');
    let wrapperContent = document.querySelector('.third__content_slide');
    let close = document.querySelector('.close__content--3');

    openContent.addEventListener('click', function () {
        wrapperContent.style.display = 'block';
        let animation = anime({
            targets: '.third_slide__reveal',
            backgroundColor: '#8f40f1',
            scaleY:['0','1'],
            duration: 500,
            easing: 'easeOutQuad',
            begin: function() {
                document.querySelector(".third_slide__reveal").style.display = "block";
            },
            complete: function() {
                slideContent.style.display = 'grid';
            }
        });

        animation.finished.then(back);

        function back () {
            let box = document.querySelector('.third_slide__reveal');
            box.style.transformOrigin = '50% 50%';
            anime({
                targets: '.third_slide__reveal',
                scaleY:['1','0'],
                duration: 500,
                easing: 'easeInOutQuad',
            });
        }
    });
    close.addEventListener('click', () => {
        document.querySelector(".third_slide__reveal").style.backgroundColor = '#00afd8';
        let animation = anime({
            targets: '.third_slide__reveal',
            scaleY:['0','1'],
            duration: 500,
            easing: 'easeOutQuad',
            complete: function() {
                slideContent.style.display = 'none';
            }
        });

        animation.finished.then(back);

        function back () {
            let box = document.querySelector('.third_slide__reveal');
            box.style.transformOrigin = '50% 50%';
            anime({
                targets: '.third_slide__reveal',
                scaleY:['1','0'],
                duration: 500,
                easing: 'easeInOutQuad',
                complete: function() {
                    wrapperContent.style.display = 'none';
                }
            });
        }
    });

}third();





function lrMany() {
    let slideContent = document.querySelector('.fourth_slide__content');
    let openContent = document.querySelector('.content--4');
    let wrapperContent = document.querySelector('.fourth__content_slide');
    let close = document.querySelector('.close__content--4');
    openContent.addEventListener('click', function (evt) {
        wrapperContent.style.display = 'block';
        let animation = anime({
            targets: '.fourth_slide__reveal',
            scaleX:['0','1'],
            duration: 1000,
            delay: anime.stagger(300),
            easing: 'easeOutQuad',
            begin: function() {
            let any  =  document.querySelectorAll(".fourth_slide__reveal");
                for (let i = 0; i < any.length; i++) {
                    any[i].style.display = 'block';
                }
            },
            complete: function() {
                slideContent.style.display = 'grid';
            }
        });
        animation.finished.then(back);

        function back () {
            let box = document.querySelectorAll('.fourth_slide__reveal');
            for (let i = 0; i < box.length; i++) {
                box[i].style.transformOrigin = '100% 0%';
            }
            anime({
                targets: '.fourth_slide__reveal',
                scaleX:['1','0'],
                delay: anime.stagger(100),
                duration: 1000,
                easing: 'easeInOutQuad',
            });
        }

    });

    close.addEventListener('click', () => {
        let animation = anime({
            targets: '.fourth_slide__reveal',
            scaleX:['0','1'],
            duration: 1000,
            delay: anime.stagger(300),
            easing: 'easeOutQuad',
            complete: function() {
                slideContent.style.display = 'none';
            }
        });

        animation.finished.then(back);

        function back () {
            let box = document.querySelectorAll('.fourth_slide__reveal');
            for (let i = 0; i < box.length; i++) {
                box[i].style.transformOrigin = '0% 100%';
            }
            anime({
                targets: '.fourth_slide__reveal',
                scaleX:['1','0'],
                duration: 1000,
                delay: anime.stagger(100),
                easing: 'easeInOutQuad',
                complete: function() {
                    wrapperContent.style.display = 'none';
                }
            });
        }
    });

}lrMany();