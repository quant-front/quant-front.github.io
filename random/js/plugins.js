function randomEl() {
     let anim_els = [];
     let els = document.querySelectorAll('.item');
     for ( let i = 0; i < 1; i++ ) {
          let  index = anime.random(0,els.length - 1);
          anim_els.push(els[index]);
     }
     anime({
          targets:anim_els,
          backgroundColor: [{
               value: '#6A5ACD', duration: 1000,
          },
               {
                    value: '#FFF', duration: 100,
               }
          ],
          complete: randomEl
     });
}
randomEl();

