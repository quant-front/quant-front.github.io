function drawLine() {
     anime({
          targets: '.group-b',
          opacity:1
     });

     var drawn__line = anime.timeline({
          targets: '.group-a , .group-b',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'linear',
          opacity:1,
     });

     drawn__line
          .add({
               targets: '#drawn__line .el-01',
               strokeDashoffset: [anime.setDashoffset, 0],
               easing: 'linear',
               delay:1450,
               duration:600
          })
          .add({
               targets: '#drawn__line .el-02',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:50,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line .el-03',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:150,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line .el-04',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:150,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line .el-05',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:150,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line .el-06',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:150,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line .el-07',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:300,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line .el-08',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:300,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line .el-09',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:300,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line .el-10',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:300,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line .el-11',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:300,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line .el-12',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:300,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line .el-13',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:50,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line .el-14',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:600,
               easing: 'linear'
          });




     var drawn__secondline = anime.timeline({
          targets: '.group-b',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'linear',
          opacity:1,
          // delay:600,
     });

     drawn__secondline
          .add({
               targets: '#drawn__line-above .el-01',
               strokeDashoffset: [anime.setDashoffset, 0],
               easing: 'linear',
               delay:1450,
               duration:600
          })
          .add({
               targets: '#drawn__line-above .el-02',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:50,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line-abovee .el-03',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:150,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line-above .el-04',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:150,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line-above .el-05',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:150,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line-above .el-06',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:150,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line-above .el-07',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:300,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line-above .el-08',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:300,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line-above .el-09',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:300,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line-above .el-10',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:300,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line-above .el-11',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:300,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line-above .el-12',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:300,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line-above .el-13',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:50,
               easing: 'linear'
          })
          .add({
               targets: '#drawn__line-above .el-14',
               strokeDashoffset: [anime.setDashoffset, 0],
               duration:600,
               easing: 'linear'
          });

}



     function lettersAnimation() {
          // Wrap every letter in a span
          var textWrapper = document.querySelector('.ml16');
          textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
          anime({
               targets: '.wrapper',
               opacity:1
          });
          anime.timeline()
               .add({
                    targets: '.ml16 .letter',
                    translateY: [-500,0],
                    translateX:[-100,0],
                    rotate:[100,0],
                    easing: 'cubicBezier(.52,-0.4,.31,1.48)',
                    duration:500,
                    opacity:[{ value: 1, duration: 700 },],
                    delay: (el, i) => 100 * i,
               });
     }
     // lettersAnimation();



setTimeout(drawLine,1700);
setTimeout(lettersAnimation,1500);



