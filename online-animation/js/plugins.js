// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

//
function getScrollPercent() {
    var h = document.documentElement,
         b = document.body,
         st = 'scrollTop',
         sh = 'scrollHeight'
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100
}


    var path = anime.path('.main path');

    let tl = anime({
        targets: '.main .rocket',
        autoplay: false,
        // direction: 'reverse',
        translateX: path('x'),
        translateY: path('y'),
        rotate: path('angle'),
        easing: 'linear',
        duration: 2000
    });



let rocket = document.querySelector('.rocket img');
let main = document.querySelector('.main');
let topPos = window.offsetTop;

window.addEventListener('scroll', () => {
    const persentage = getScrollPercent();
    tl.seek(tl.duration * (persentage / 110));

    // if ( tl.direction  === 'normal'){
    //     rocket.style.transform = 'rotate(50deg)';
    // }
    //   if ( tl.direction  === 'reverse'){
    //     rocket.style.transform = 'rotate(230deg)';
    //
    // }
    if (main.offsetY  >= 1450) {
        // rocket.style.transform = 'rotate(230deg)';
        // rocket.style.display ='none';
    }
});






