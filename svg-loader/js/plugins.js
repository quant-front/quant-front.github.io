



// anime({
//      targets: '.line',
//      strokeDashoffset: [anime.setDashoffset, 0],
//      easing: 'easeInOutSine',
//      duration: 1000,
//      direction: 'normal',
//      complete:function () {
//           anime({
//                targets: '.line',
//                strokeDashoffset: [-0,-1460],
//                easing: 'easeInOutSine',
//                duration: 1000,
//                direction: 'normal',
//           });
//      }
// });
//
// setTimeout(function () {
//      anime({
//           targets: '.lines',
//           duration: 1300,
//           rotate: '1turn',
//           easing: 'easeInOutSine',
//           opacity:[
//                {value: 0,duration:1},
//                {value: 1,duration:1}
//           ],
//           strokeDashoffset: [{value:-1460,duration:700,delay:700}],
//           delay: function(el, i, l) {
//                return i * 200;
//           },
//      });
//
// },810)



// anime({
//      targets: '.line',
//      strokeDashoffset: [anime.setDashoffset, 0],
//      easing: 'easeInOutSine',
//      duration: 1000,
//      direction: 'normal',
//      loop:true,
//      complete:function () {
//           anime({
//                targets: '.line',
//                strokeDashoffset: [-0,-1460],
//                easing: 'easeInOutSine',
//                duration: 1000,
//                direction: 'normal',
//                loop:true,
//           });
//      },
//      begin: function () {
//           setTimeout(function () {
//                anime({
//                     targets: '.lines',
//                     duration: 1300,
//                     rotate: '1turn',
//                     easing: 'easeInOutSine',
//                     opacity:[
//                          {value: 0,duration:1},
//                          {value: 1,duration:1}
//                     ],
//                     strokeDashoffset: [{value:-1460,duration:700,delay:700}],
//                     delay: function(el, i, l) {
//                          return i * 200;
//                     },
//                });
//
//           },810)
//      }
// });

var tl = anime.timeline({
     easing: 'easeOutExpo',
     // duration: 750
     loop:true,
});

tl
     .add({
          targets: '.line',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 1200,
          direction: 'normal',
     })
     .add({
          targets: '.line',
          strokeDashoffset: [-0,-1460],
          easing: 'easeInOutSine',
          duration: 1000,
          direction: 'normal',
     })
     .add({
          targets: '.lines',
          duration: 1300,
          rotate: '1turn',
          easing: 'easeInOutSine',
          opacity:[
               {value: 0,duration:1},
               {value: 1,duration:1}
          ],
          strokeDashoffset: [{value:-1460,duration:700,delay:700}],
          delay: function(el, i, l) {
               return i * 120;
          },
     },1010)
