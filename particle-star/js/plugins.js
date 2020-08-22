



var container = document.querySelector(".anime-container");

var a = 20;
var l = 420;

for (var i = 0; i <= l; i += 1) {
     var angle = 0.1 * i;
     var x = (a*angle) *2.85 + window.innerWidth / 50;
     var y = (a*angle) *1.4 + window.innerHeight / 50;


     var n = 4;

     for (var j = 0; j < 3; j++) {
          const dot = document.createElement("div");
          dot.classList.add("dot");
          container.appendChild(dot);

          var size = anime.random(50, 100);

          dot.style.width = size + "px";
          dot.style.height = size + "px";

          dot.style.left = x + anime.random(-50, 50) + "px";
          dot.style.top = y + anime.random(-50, 50) + "px";

          dot.style.opacity = "0";

     }

}

  anime({
          loop: true,
          easing: "linear",
          opacity: [
               { value: 0.5, duration: 50, delay: anime.stagger(2) },
               { value: 0, duration: function(){return anime.random(500,1500);}}
          ],
          width: { value: 2, duration: 500, delay: anime.stagger(2) },
          height: { value: 2, duration: 500, delay: anime.stagger(2) },

          targets: document.querySelectorAll(".dot"),
     });

