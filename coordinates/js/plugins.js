// function position() {
var obj = document.getElementById('circle'); // берем интересующий элемент
var posX = obj.offsetTop;  // верхний отступ эл-та от родителя
var posY = obj.offsetLeft; // левый отступ эл-та от родителя
console.log('x=[' + posX + '] y=[' + posY + ']'); // печатаем координаты

// }

anime({
     targets: '.circle',
     translateX: posY-80,
     translateY:-posX+50,
});
