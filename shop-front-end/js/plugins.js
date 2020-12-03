( () => {
     let search = document.querySelector('.user-actions__search--btn a');
     let searchInput = document.querySelector('.search-panel__input'); //
     let typeText = document.querySelector('.search__wrapper input[type=\'text\']');
     let userPanel = document.querySelector(' .header__top .user-actions');
     let searchPanel = document.querySelector('.global__search');
     let iconSearch = document.querySelector('header .nav-bar .header__top .global__search .search__wrapper .global-search__submit a i');
     let iconclose = document.querySelector('header .nav-bar .header__top .global__search .search__wrapper .global-search__close--btn a i');
     let sBtn = () => {
          search.addEventListener("click", function() {
                    userPanel.style.display = 'none';
                    searchPanel.style.display = 'grid';
                    setTimeout(function () {
                         anime({
                              targets: searchInput,
                              width:[0,100+'%'],
                              duration:1500,
                              easing:'easeInOutSine',
                              opacity: [
                                   {
                                        value: 1, duration: 300
                                   }
                              ],
                              begin: function () {
                                   iconSearch.style.opacity = "1";
                              },
                              complete:function () {

                                   setTimeout(function () {

                                   },500)
                                   iconclose.style.opacity = "1";
                              }
                         });

                    },600);

          });

          iconclose.addEventListener('click', function () {
               iconclose.style.opacity = "0";
               iconSearch.style.opacity = "0";
               anime({
                    targets: searchInput,
                    easing: 'easeInOutSine',
                    width: [
                         {  value: '0', duration: 1500}
                    ],
                    opacity: [
                         {
                              value: 0, duration: 100,delay: 1400,
                         }
                    ],
                    complete: function() {
                         searchPanel.style.display = 'none';
                         setTimeout(function () {
                              userPanel.style.display = 'grid';
                         },300)

                    }
               });

          })

     };
     sBtn();

})();




const activeSearch = () => {
     let userPanel = document.querySelector(' .header__top .user-actions');
     let showSearch = document.querySelector('.user-actions__search--btn a');
     let searchPanel = document.querySelector('.global__search');
     let closeSearchPanel = document.querySelector('.global-search__close--btn a');

     showSearch.addEventListener('click', function () {
          userPanel.style.display = 'none';
          setTimeout(function () {
               searchPanel.style.display = 'grid';
          },400)
     });

     closeSearchPanel.addEventListener('click', function () {
          searchPanel.style.display = 'none';
          setTimeout(function () {
               userPanel.style.display = 'grid';
          },400)
     });

};

// activeSearch();


(function () {
     let burger = document.querySelector('.burger-menu');
     let mobileMenu = document.querySelector('.sidebar');
     let  close = document.querySelector('.menu--close');
     let k = 0;
     burger.addEventListener('click', function (ev) {
          ev.preventDefault();
          k++;
          if (k === 1) {
               anime({
                    targets: mobileMenu,
                    translateX:  ['-100%','0'],
                    duration: 500,
                    easing: 'easeInQuad'
               });
               setTimeout(function () {
                    anime({
                         targets: '.menu__item',
                         opacity:1,
                         easing:'easeOutExpo',
                         delay: anime.stagger(150),
                    });
               },190);

          } else if (k === 2) {
               setTimeout(function () {
                    anime({
                         targets: mobileMenu,
                         translateX:  ['0','-100%'],
                         duration: 500,
                         easing: 'easeInQuad'
                    });
               },10);
               anime({
                    targets: '.menu__item',
                    opacity:0,
                    easing:'easeOutExpo',
               });
               k=0;
          }
     });

})();
{
     document.querySelector('.burger-menu').onclick = function(){
          document.querySelector('.burger-menu a span').classList.toggle('menu-icon-active');
     };
}




( () => {
//Custom cursor
     //create cursor
     let body = document.querySelector('.body')
     let createPink = document.createElement('div');
     let createGreen = document.createElement('div');
     let createGray = document.createElement('div');
     createPink.className = 'cursor--pink';
     createGreen.className = 'cursor--green';
     createGray.className =  'cursor--gray';
     body.appendChild(createPink);
     body.appendChild(createGreen);
     body.appendChild(createGray);
     //edit cursor
     const footer = document.querySelector('.footer');
     const cursors = document.querySelector('.cursor--pink');
     const cursors1 = document.querySelector('.cursor--green');
     const cursors2 = document.querySelector('.cursor--gray');
     const  editCursor = e => {
          const { clientX: x, clientY: y } = e;
          cursors.style.left = x + 'px';
          cursors.style.top = y + 'px';
          cursors1.style.left = x + 'px';
          cursors1.style.top = y + 'px';
          cursors2.style.left = x + 'px';
          cursors2.style.top = y + 'px';
     };
     window.addEventListener('mousemove', editCursor);
     // window.addEventListener('scroll',editCursor);
     // footer.addEventListener('mouseenter', function () {
     //      setTimeout(function () {
     //           cursors.style.display = 'none';
     //           cursors1.style.display = 'none';
     //           cursors2.style.display = 'none';
     //      },500)
     //
     // })
     // footer.addEventListener('mouseleave', function () {
     //      setTimeout(()=> {
     //           cursors.style.display = 'block';
     //           cursors1.style.display = 'block';
     //           cursors2.style.display = 'block';
     //      },150)
     // })
})();


function loadImg() {
     let images = document.getElementsByTagName('img');
     for (let i = 0; i < images.length; i++) {
          let src = images[i].dataset.src;
          if (src) {
               images[i].src = src;
          }
     }
}
window.addEventListener("load", loadImg);



function loadBgImg () {
     let lazyLoader = document.querySelectorAll('.lazy');
     for (let i = 0; i <lazyLoader.length ; i++) {
          lazyLoader[i].classList.remove('lazy');
     }
}

window.addEventListener("load", loadBgImg);





const headerSelect = () => {
     function select() {
          var x, i, j, selElmnt, a, b, c;
          /*look for any elements with the class "custom-select":*/
          x = document.getElementsByClassName("custom-select");
          for (i = 0; i < x.length; i++) {
               selElmnt = x[i].getElementsByTagName("select")[0];
               /*for each element, create a new DIV that will act as the selected item:*/
               a = document.createElement("DIV");
               a.setAttribute("class", "select-selected");
               a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
               x[i].appendChild(a);
               /*for each element, create a new DIV that will contain the option list:*/
               b = document.createElement("DIV");
               b.setAttribute("class", "select-items select-hide");
               for (j = 1; j < selElmnt.length; j++) {
                    /*for each option in the original select element,
                    create a new DIV that will act as an option item:*/
                    c = document.createElement("DIV");
                    c.innerHTML = selElmnt.options[j].innerHTML;
                    c.addEventListener("click", function (e) {
                         /*when an item is clicked, update the original select box,
                         and the selected item:*/
                         var y, i, k, s, h;
                         s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                         h = this.parentNode.previousSibling;
                         for (i = 0; i < s.length; i++) {
                              if (s.options[i].innerHTML == this.innerHTML) {
                                   s.selectedIndex = i;
                                   h.innerHTML = this.innerHTML;
                                   y = this.parentNode.getElementsByClassName("same-as-selected");
                                   for (k = 0; k < y.length; k++) {
                                        y[k].removeAttribute("class");
                                   }
                                   this.setAttribute("class", "same-as-selected");
                                   break;
                              }
                         }
                         h.click();
                    });
                    b.appendChild(c);
               }
               x[i].appendChild(b);
               a.addEventListener("click", function (e) {
                    /*when the select box is clicked, close any other select boxes,
                    and open/close the current select box:*/
                    e.stopPropagation();
                    closeAllSelect(this);
                    this.nextSibling.classList.toggle("select-hide");
                    this.classList.toggle("select-arrow-active");
               });
          }

          function closeAllSelect(elmnt) {
               /*a function that will close all select boxes in the document,
               except the current select box:*/
               var x, y, i, arrNo = [];
               x = document.getElementsByClassName("select-items");
               y = document.getElementsByClassName("select-selected");
               for (i = 0; i < y.length; i++) {
                    if (elmnt == y[i]) {
                         arrNo.push(i)
                    } else {
                         y[i].classList.remove("select-arrow-active");
                    }
               }
               for (i = 0; i < x.length; i++) {
                    if (arrNo.indexOf(i)) {
                         x[i].classList.add("select-hide");
                    }
               }
          }

          document.addEventListener("click", closeAllSelect);
     }

     select();
}; headerSelect();


//INSTAGRAM SLIDER
let insta = new Swiper('.inst-tape .swiper-container', {
     slidesPerView: 1,
     spaceBetween: 10,
     breakpoints: {
          '@0.00': {
               slidesPerView: 1,
               spaceBetween: 10,
          },
          '@0.75': {
               slidesPerView: 2,
               spaceBetween: 20,
          },
          '@1.00': {
               slidesPerView: 3,
               spaceBetween: 20,
          },
          '@1.50': {
               slidesPerView: 6,
               spaceBetween: 20,
          },
     }
});


(function () {
     //pagination function
     // const header = document.querySelector('.slider__pagination');
     const btns = document.getElementsByClassName("pagination__item");

     for (let i = 0; i < btns.length; i++) {

          btns[i].addEventListener("click", function() {
               let current = document.getElementsByClassName("pagination--active");
               if (current.length > 0) {
                    current[0].className = current[0].className.replace("pagination--active", "");
               }
               this.className += " pagination--active";
          });
     }
})();


// let buttonContact = document.querySelectorAll('.call-back--btn');
// for (let i = 0; i < buttonContact.length; i++) {
//      buttonContact[i].addEventListener('click', function (event) {
//           event.preventDefault();
//           overlay.style.display = 'block';
//           form1.style.display = 'block';
//           anime({
//                targets: '.modal-overlay',
//                opacity:[0,1],
//                duration:300,
//                easing:'linear'
//           });
//           anime({
//                targets: '.modal-window-callback',
//                scale:[0.7,1],
//                opacity:[0,1],
//                duration:300,
//                easing:'linear'
//           });
//      });
// }



