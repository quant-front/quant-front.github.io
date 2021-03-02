var tl = anime.timeline({

});

// Add children
tl
     .add({
          targets: '.hand-back',
          begin: function (anim) {
               let table = document.querySelector('.hand-back');
               table.style.transformOrigin = '72% 55%';
          },
          easing: 'linear',
          translateY: [
               {value: [0,-12], duration:700},
               {value: -5, duration:400},
               {value: -12, duration:400},
               {value: -5, duration:400},
               {value: -12, duration:400},
               {value: -3, duration:400},
          ],
          rotate: [
               { value: [0, -45], duration: 700 },
               { value: -20, duration: 400 },
               { value: -45, duration: 400 },
               { value: -20, duration: 400 },
               { value: -45, duration: 400 },
               { value: -10, duration: 400 },
          ],
     })
     .add({
          targets: '.arm-back',
          begin: function (anim) {
               let table = document.querySelector('.arm-back');
               table.style.transformOrigin = '72% 55%';
          },
          easing: 'linear',
          translateY: [
               {value: [0,-12], duration:700},
               {value: -3, duration:400},
               {value: -12, duration:400},
               {value: -5, duration:400},
               {value: -12, duration:400},
               {value: -3, duration:400},
          ],
          rotate: [
               { value: [0, -55], duration: 700 },
               { value: -10, duration: 400 },
               { value: -55, duration: 400 },
               { value: -10, duration: 400 },
               { value: -55, duration: 400 },
               { value: -10, duration: 400 },
          ],

     },'-=2700');


//body and head[0,-10,0]

anime({
     targets: '.robot-head',
     easing:'easeInOutQuart',
     delay:50,
     rotate:[{value:-8, duration:0}],
     translateY: [
          {value:[0,-20],duration:700},
          {value:[-20,-2],duration:700},
          {value:[-2,-10],duration:700,easing: 'cubicBezier(0, .0, 0.58, 1)'}
     ],
});

anime({
     targets: '.robot-body',
     easing:'easeInOutQuart',
     rotate:[{value:-8, duration:0}],
     translateY: [
          {value:[0,-20],duration:700},
          {value:[-20,0],duration:700}
     ],

});


anime({
     targets: '.left-hand',
     easing:'easeInOutQuart',
     rotate:[{value:-8, duration:0}],
     translateY: [
          {value:[0,-20],duration:700},
          {value:[-20,0],duration:700}
     ],

});

setTimeout(function () {
     anime({
          targets: '.robot-head',
          easing:'easeInQuad',
          rotate:[{value:[-8,0], duration:200}],
     });
     anime({
          targets: '.robot-body',
          easing:'easeInQuad',
          rotate:[{value:[-8,0], duration:200}],
          complete:function () {
          }
     });
     //руки

     anime({
          targets: '.left-hand',
          easing:'easeInQuad',
          rotate:[{value:10, duration:200}],
          translateY: [
               {value:[0,5],duration:200},
          ],

     });

     setTimeout(function () {
     //final animation
          anime({
               targets: '.left-hand',
               easing:'easeInOutQuad',
               rotate:[
                    {value:[10,-20],duration:400},
                    {value:[-20,36],duration:250,delay:400},
               ],
               translateY:[
                    {value:-40,duration:400,},
                    {value:-60,duration:400},
                    //next action create body
                    {value:70,duration:250,}
                    ],
               translateX:[
                    {value:-40,duration:400},
                    //next action create body
                    {value:40,duration:250,delay:250},
                    ],
               duration:400,
          });

          anime({
               targets: '.robot-body',
               easing:'easeInOutQuad',
               translateY:[
                    {value:-30,duration:400,delay:400},
                    //next action create body
                    {value:5,duration:250,}
               ],
               duration:400,
          });
          //
          anime({
               targets: '.robot-head',
               easing:'easeInOutQuad',
               translateY:[
                    // {value:-40,duration:400,},
                    {value:-70,duration:400,delay:400},
                    //next action create body
                    {value:25,duration:250,}
               ],
               duration:400,
          });

          anime({
               targets: '.left-leg',
               easing:'easeInOutQuad',
               rotate:[
                    {value:[0,7],duration:400,delay:400},
                    //next action create body
                    {value:[7,0],duration:250}
                    ],
               translateY:[
                    {value:[0,20],duration:400,delay:400},
                    //next action create body
                    {value:[20,-25],duration:250},
               ],
               translateX:[
                    {value:[0,35],duration:400,delay:400},
                    //next action create body
                    {value:[35,0],duration:250},
               ],
          })

          anime({
               targets: '.right-leg',
               easing:'easeInOutQuad',
               rotate:[
                    {value:[0,-7],duration:400,delay:400},
                    //next action create body
                    {value:[-7,0],duration:250}
                    ],
               translateY:[
                    {value:[0,20],duration:400,delay:400},
                    //next action create body
                    {value:[20,-25],duration:250},
               ],
               translateX:[
                    {value:[0,-35],duration:400,delay:400},
                    //next action create body
                    {value:[-35,0],duration:250},
               ],
          })

          //rightHand

          anime({
               targets: '.hand-back',
               easing:'easeInOutQuad',
               rotate:[
                    {value:30,duration:800},
                    //next action create body
                    {value:-25,duration:250}
                    ],
               translateY:[
                    {value:0,duration:400,},
                    {value:2,duration:400,},
                    //next action create body
                    {value:10,duration:250,},
               ],
               translateX:[
                    {value:40,duration:400},
                    //next action create body
                    {value:-4,duration:250,delay:250},
               ],
               duration:400,

          });

          anime({
               targets: '.arm-back',
               easing:'easeInOutQuad',
               rotate:[
                    {value:30,duration:800},
                    {value:-25,duration:400}
                    ],
               translateY:[
                    {value:0,duration:400},
                    {value:2,duration:400},
                    //next action create body
                    {value:10,duration:250},
               ],
               translateX:[
                    {value:40,duration:400},
                    //next action create body
                    {value:-4,duration:250,delay:250},
               ],
               duration:400,

          });


     },200);



},2700)
