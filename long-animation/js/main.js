// •••
{
     let input = document.querySelector('.input-form-1').value = '4111 1111 1111 1111';
     // let input = document.querySelector('.input-form-1').value = '••1111     11/25   •••';
}

{
     let tl = anime.timeline({

     });

// Add children
     tl
          .add({
               targets: '.item__form',
               translateX: -200,
               duration:1500,
               easing:'easeOutExpo',
               opacity:[
                    { value: 0, duration: 500 ,delay:1200}
               ]
          })
          .add({
               targets: '.item__form-1',
               translateX: [250,0],
               easing:'easeOutExpo',
               opacity:[
                    { value: 1, duration: 500 }
               ]
          })
          .add({
               targets: '.item .input-form-1',
               value:'4111 1111 1111 1111'
          })
          .add({
               targets: '.item .input__card-date',
               easing:'easeOutExpo',
               // translateY: [100,0],
               opacity:[
                    { value: 1, duration: 1}
               ]
          })
          .add({
               targets: '.item .input__card-cvv',
               easing:'easeOutExpo',
               // translateY: [100,0],
               opacity:[
                    { value: 1, duration: 1}
               ]
          },'-=400')
          .add({
               targets: '.input-form-1',
               value:'••1111    11/25   •••'
          })
          .add({
               targets: '.item .button__wrapper .right--btn',
               duration:1500,
               easing:'easeOutExpo',
               backgroundColor:['#97CF5E','#FFF','#74E300'],
          })
          .add({
               targets: '.item  .button__wrapper , .item .input__wrapper',
               duration:1000,
               opacity:0,
          })
          .add({
               targets: '.button-request',
               duration:1500,
               easing:'easeOutExpo',
               opacity:[
                    { value: 1, duration: 10}
               ],
               translateY:[0,-140]
          })
          .add({
               targets: '.payment-accept',
               duration:1500,
               easing:'easeOutExpo',
               opacity:[
                    { value: 1, duration: 10}
               ],
               translateY:[0,-140],
               // zIndex:1,
          })
//     opacity item #1
          .add({
               targets: '.item__form-1',
               duration:1500,
               easing:'easeOutExpo',
               translateX:[
                    { value: -250, duration: 900},
                    { value: 0, duration: 900},
               ],
               // zIndex:1,
          })
          .add({
               targets: '.item__element',
               duration:1500,
               easing:'easeOutExpo',
               zIndex:[
                    { value: 1, duration: 10, delay: 10},
               ]
               // zIndex:1,
          },'-=900')
          .add({
               targets: '.item',
               easing:'easeOutExpo',
               duration:1500,
               opacity:[1,0]
          })
          .add({
               targets: '.item-1 .input-form-2',
               value:'4111 1111 1111 1111',
               duration:10,
          },)
          .add({
               targets: '.item-1',
               easing:'easeOutExpo',
               duration:1500,
               opacity:[0,1],
          })
          .add({
               targets: '.color-hand',
               easing:'easeOutExpo',
               duration:1500,
               left:[0,73],
          })
          .add({
               targets: '.color-circle:nth-child(2) img',
               easing:'easeOutExpo',
               duration:1500,
               opacity:[
                    {value:1,duration:300},
               ],
               scale:[1,1.3,1],
          })
          .add({
               targets: '.color-circle:nth-child(2) img',
               easing:'easeOutExpo',
               duration:300,
               opacity:0,
          })
          .add({
               targets: '.color-hand',
               easing:'easeOutExpo',
               duration:1500,
               left:[73,170],
          })
          .add({
               targets: '.color-circle:nth-child(4) img',
               easing:'easeOutExpo',
               duration:1500,
               opacity:[
                    {value:1,duration:300},
               ],
               scale:[1,1.3,1],
          })
//     btn
          .add({
               targets: '.item-1 .left--btn',
               easing:'easeOutExpo',
               duration:1500,
               backgroundColor:['#74E300','#FFD80B'],
          })
          .add({
               targets: '.item-1 .right--btn',
               easing:'easeOutExpo',
               duration:1500,
               backgroundColor:['#97CF5E','#E0BB2A'],
          },'-=1500')
          .add({
               targets: '.item__form-2 .input__wrapper',
               easing:'easeOutExpo',
               duration:1500,
               borderColor:['#97CF5E','#E0BB2A'],
          },'-=1500')
          .add({
               targets: '.item-1 .input__card-date',
               easing:'easeOutExpo',
               duration:1500,
               opacity:[0,1]
          },'-=1500')
          .add({
               targets: '.item-1 .input__card-cvv',
               easing:'easeOutExpo',
               duration:1500,
               opacity:[0,1]
          },'-=1500')
          .add({
               targets: '.item-1 .input-form-2',
               value:'••1111    11/25   •••'
          })
          .add({
               targets: '.color-circle:nth-child(4) img',
               easing:'easeOutExpo',
               duration:300,
               opacity:0,
          })
          .add({
               targets: '.color-hand',
               easing:'easeOutExpo',
               duration:1500,
               left:[170,118],
          })
          .add({
               targets: '.color-circle:nth-child(3) img',
               easing:'easeOutExpo',
               duration:1500,
               opacity:[
                    {value:1,duration:300},
               ],
               scale:[1,1.3,1],
          })
     //btn
          .add({
               targets: '.item-1 .left--btn',
               easing:'easeOutExpo',
               duration:1500,
               backgroundColor:['#FFD80B','#FB0BC6'],
          })
          .add({
               targets: '.item-1 .right--btn',
               easing:'easeOutExpo',
               duration:1500,
               backgroundColor:['#E0BB2A','#FB0BC6'],
          },'-=1500')
          .add({
               targets: '.item__form-2 .input__wrapper',
               easing:'easeOutExpo',
               duration:1500,
               borderColor:['#E0BB2A','#FB0BC6'],
          },'-=1500')
          .add({
               targets: '.color-hand',
               easing:'easeOutExpo',
               duration:1500,
               left:[118,0],
               bottom:[-33,96],
          })
          .add({
               targets: '.item__form-2 .input__wrapper , .item__form-2 .input__wrapper input',
               easing:'easeOutExpo',
               duration:3500,
               borderRadius:[5,100],
          })
          .add({
               targets: '.item-1 .left--btn',
               easing:'easeOutExpo',
               duration:3500,
               borderTopLeftRadius:30,
               borderBottomLeftRadius:30,
          },'-=3600')
          .add({
               targets: '.item-1 .right--btn',
               easing:'easeOutExpo',
               duration:3500,
               borderTopRightRadius:30,
               borderBottomRightRadius:30,
          },'-=3600')




}

