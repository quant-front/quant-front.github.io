
//елки

function bushes() {
 let allbushes = document.querySelectorAll('.bushes');

     for (let i = 0; i < allbushes.length; i++) {
          allbushes[i].style.animation = 'buzz-out 1 linear 1s';
     }
}

function plane() {
     anime({
          targets: '.plane',
          translateX: [200,-400],
          translateY: function() { return anime.random(-30,170); },
          duration:2500,
          easing: 'linear',

          complete: function(anim) {
               setTimeout(()=>{
                    plane();
               },7500);

          }
     });
}
setTimeout(()=>{
     plane();
},7000);


function houseAnimation () {



let polyN = anime.timeline({
     easing: "easeOutExpo",
     duration: 5000,
     delay:500,
});

// Add children
polyN
     .add({
          targets: '.poly-morph1',
          points: [
               { value: [
                         ' 238.7,235.8 303.3,273.3 303.4,366.5 238.8,329.2 ',
                              '238.8,329.2 303.4,366.5 303.4,366.5 238.8,329.2 '
                    ] },
          ],
     })
     .add({
          targets: '.poly-morph2',
          points: [
               { value: [
                         ' 335.9,254.1 303.3,273.3 303.4,366.5 336,348',
                         '335.9,347.8 303.4,366.5 303.4,366.5 336,348'
                    ] },
          ],
     },0)
     .add({
          targets: '.transform-top',
          translateY:94,
     },0)
     .add({
          targets: '.wall-mask',
          translateY:94,
     },0);


let tablehouse = anime.timeline({
});
tablehouse
     .add({
          targets:'.house-table',
          opacity:1,
          duration:50,
          delay:3800,
     })
.add({
     targets:'.house-table',
     translateY:94,
     duration: 2000,
     easing:'easeOutBounce',
});

}



function helicopter(){
     anime({
          targets: '.start-hl',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'linear',
          opacity:1,
     });

     let helly = anime.timeline({

     });
     helly
          .add({
               targets:'.helicopter',
               opacity:1,
               delay:2000,
          })
          .add({
               targets:'.helicopter',
               translateX:-154,
               duration: 2000,
               easing:'easeOutExpo',
          })
          .add({
               targets:'.helicopter',
               translateY:88,
               duration: 2000,
               easing:'easeOutExpo',
          });


}

function colorS() {
     anime({
          targets:'.wall-color',
          fill:['#6D96A7','#E4DBCC','#662d91'],
          duration:3600,
          easing: 'linear',
          direction:'alternate',
          loop:true
     });

}





function threesStart() {
     let group = document.querySelectorAll('.three-group');
     for (let i = 0; i < group.length; i++) {
          let threes = anime.timeline({

          });
          threes
               .add({
                    targets:group[0],
                    translateY:[50,0],
                    duration:1500,
                    // delay:2500,
               })
               .add({
                    targets:group[1],
                    translateY:[50,0],
                    duration:1500,
                    // delay:2500,

               },100)
               .add({
                    targets:group[2],
                    translateY:[50,0],
                    duration:1500,
                    // delay:2500,

               },200)
               .add({
                    targets:group[3],
                    translateY:[50,0],
                    duration:1500,
                    // delay:2500,

               },300)
               .add({
                    targets:group[4],
                    translateY:[50,0],
                    duration:1500,
                    // delay:2500,

               },400)
               .add({
                    targets:group[5],
                    translateY:[50,0],
                    duration:1500,
                    // delay:2500,

               },500)

     }
}




 setTimeout(threesStart,1500);
 setTimeout(colorS,2500);
 setTimeout(helicopter,4500);
 setTimeout(houseAnimation,12000);
 setTimeout(bushes,19500);
