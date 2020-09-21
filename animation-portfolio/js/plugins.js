var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
     acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
               panel.style.maxHeight = null;
          } else {
               panel.style.maxHeight = panel.scrollHeight + "px";
          }
     });
}


(function () {
     const btns = document.getElementsByClassName("unit");

     for (let i = 0; i < btns.length; i++) {

          btns[i].addEventListener("click", function() {
               let current = document.getElementsByClassName("active-s");
               if (current.length > 0) {
                    current[0].className = current[0].className.replace("active-s", "");
               }
               this.className += " active-s";
          });
     }
})();