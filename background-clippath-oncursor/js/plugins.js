// const cursor = document.querySelector('.cursor');
// const cursors = document.querySelector('.new-curs');
// const  editCursor = e => {
//      const { clientX: x, clientY: y } = e;
//      cursor.style.left = x + 'px';
//      cursor.style.top = y + 'px';
//      cursors.style.left = x + 'px';
//      cursors.style.top = y + 'px';
// };
// window.addEventListener('mousemove', editCursor);
//

let pos = document.documentElement;
pos.addEventListener('mousemove', e => {
  pos.style.setProperty('--x',e.clientX +'px');
  pos.style.setProperty('--y',e.clientY +'px');
})