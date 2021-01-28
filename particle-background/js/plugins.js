
const  banner  = document.getElementsByClassName('banner')[0];
const  block = document.getElementsByClassName('blocks');
for (let i = 1; i < 400 ; i++) {
     banner.innerHTML += "<div class='blocks'></div>";
     let duration =  Math.random() * 5;
     block[i].style.animationDuration = 2+duration+'s';
}
