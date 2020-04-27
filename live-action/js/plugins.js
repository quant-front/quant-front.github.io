anime({
     targets: '.action-1',
     translateX: [
          { value: 250, duration: 1000, delay: 500 },
          { value: 0, duration: 1000, delay: 500 }
     ],
     translateY: [
          { value: -40, duration: 500 },
          { value: 40, duration: 500, delay: 1000 },
          { value: 0, duration: 500, delay: 1000 }
     ],
     scaleX: [
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900 },
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900 }
     ],
     scaleY: [
          { value: [1.75, 1], duration: 500 },
          { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 },
          { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 }
     ],
     easing: 'easeOutElastic(1, .8)',
     loop: true
});



anime({
   targets: '.action-2',
   rotate:[
        {value: 90,duration:700,easing: 'easeInQuint',delay:500},
   ],
     skew:[
          {value:20,duration:700,easing: 'easeInQuad',delay:500},
     ],

     loop: true,
});


anime({
     targets: '.action-3',

     scale:[
          {value:[1], duration: 1000,easing: 'easeOutExpo' },
          {value:[2], duration: 500 ,easing: 'easeOutExpo' },
          {value:[1], duration: 500 ,easing: 'easeOutBounce',delay:200 },
     ],

     loop: true,
});

anime({
     targets: '.action-4',
     easing:'easeInOutBack',
     translateX: [
          { value: [-50,50], duration: 1000, },
          { value: [50,-50], duration: 1000, },
     ],
     scale:[
          { value: [1,2,2,1], duration: 500, },
          { value: [2,1,1,1], duration: 500, },
          { value: [1,2,2,1], duration: 500, },
          { value: [2,1,1,1], duration: 500, },
          ],
     loop: true,
     direction:'alternate'
});


anime({
     targets: '.action-5',
     translateX: [
          { value: [-500,0], duration: 3000, easing: 'easeOutExpo'},
     ],
     skewX:[
          {value:[40,0],duration:600,easing: 'easeInBounce', delay:1500},
     ],
     loop: true,
});

anime({
     targets: '.action-6',
     scale: [
          { value: [1,2], duration: 750, easing: 'linear'},
          { value: [2,1], duration: 750, easing: 'linear'},
     ],
     skewX:[
          {value:[0,40],duration:750,easing: 'linear'},
          {value:[40,0],duration:750,easing: 'linear'},
          {value:[0,-40],duration:750,easing: 'linear'},
          {value:[-40,0],duration:750,easing: 'linear'},
     ],
     skewY:[
          {value:[0,60],duration:750,easing: 'linear'},
          {value:[60,0],duration:750,easing: 'linear'},
          {value:[0,-60],duration:750,easing: 'linear'},
          {value:[-60,0],duration:750,easing: 'linear'},
     ],
     loop: true,
     // direction:'alternate'
});

anime({
     targets: '.action-7',
     translateX: [
          { value: 250, duration: 1000,  },
          { value: 0, duration: 1000,  }
     ],

     scaleX: [
          { value: 4, duration: 100,  easing: 'easeOutExpo' },
          { value: 1, duration: 900 },
          { value: 4, duration: 100,  easing: 'easeOutExpo' },
          { value: 1, duration: 900 }
     ],
     easing: 'easeOutElastic(1, .8)',
     loop: true
});
