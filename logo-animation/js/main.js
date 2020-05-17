
;(function(window) {
    
    'use strict';
    
    // Helper vars and functions.
    function extend(a, b) {
        for(var key in b) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }
    
    function createDOMEl(type, className, content) {
        var el = document.createElement(type);
        el.className = className || '';
        el.innerHTML = content || '';
        return el;
    }
    
    /**
     * RevealFx obj.
     */
    function RevealFx(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }
    
    /**
     * RevealFx options.
     */
    RevealFx.prototype.options = {
        // If true, then the content will be hidden until it´s "revealed".
        isContentHidden: true,
        // The animation/reveal settings. This can be set initially or passed when calling the reveal method.
        revealSettings: {
            // Animation direction: left right (lr) || right left (rl) || top bottom (tb) || bottom top (bt).
            direction: 'lr',
            // Revealer´s background color.
            bgcolor: '#f0f0f0',
            // Animation speed. This is the speed to "cover" and also "uncover" the element (seperately, not the total time).
            duration: 500,
            // Animation easing. This is the easing to "cover" and also "uncover" the element.
            easing: 'easeInOutQuint',
            // percentage-based value representing how much of the area should be left covered.
            coverArea: 0,
            // Callback for when the revealer is covering the element (halfway through of the whole animation).
            onCover: function(contentEl, revealerEl) { return false; },
            // Callback for when the animation starts (animation start).
            onStart: function(contentEl, revealerEl) { return false; },
            // Callback for when the revealer has completed uncovering (animation end).
            onComplete: function(contentEl, revealerEl) { return false; }
        }
    };
    
    /**
     * Init.
     */
    RevealFx.prototype._init = function() {
        this._layout();
    };
    
    /**
     * Build the necessary structure.
     */
    RevealFx.prototype._layout = function() {
        var position = getComputedStyle(this.el).position;
        if( position !== 'fixed' && position !== 'absolute' && position !== 'relative' ) {
            this.el.style.position = 'relative';
        }
        // Content element.
        this.content = createDOMEl('div', 'block-revealer__content', this.el.innerHTML);
        if( this.options.isContentHidden) {
            this.content.style.opacity = 0;
        }
        // Revealer element (the one that animates)
        this.revealer = createDOMEl('div', 'block-revealer__element');
        this.el.classList.add('block-revealer');
        this.el.innerHTML = '';
        this.el.appendChild(this.content);
        this.el.appendChild(this.revealer);
    };
    
    /**
     * Gets the revealer element´s transform and transform origin.
     */
    RevealFx.prototype._getTransformSettings = function(direction) {
        var val, origin, origin_2;
        
        switch (direction) {
            case 'lr' :
                val = 'scale3d(0,1,1)';
                origin = '0 50%';
                origin_2 = '100% 50%';
                break;
            case 'rl' :
                val = 'scale3d(0,1,1)';
                origin = '100% 50%';
                origin_2 = '0 50%';
                break;
            case 'tb' :
                val = 'scale3d(1,0,1)';
                origin = '50% 0';
                origin_2 = '50% 100%';
                break;
            case 'bt' :
                val = 'scale3d(1,0,1)';
                origin = '50% 100%';
                origin_2 = '50% 0';
                break;
            default :
                val = 'scale3d(0,1,1)';
                origin = '0 50%';
                origin_2 = '100% 50%';
                break;
        };
        
        return {
            // transform value.
            val: val,
            // initial and halfway/final transform origin.
            origin: {initial: origin, halfway: origin_2},
        };
    };
    
    /**
     * Reveal animation. If revealSettings is passed, then it will overwrite the options.revealSettings.
     */
    RevealFx.prototype.reveal = function(revealSettings) {
        // Do nothing if currently animating.
        if( this.isAnimating ) {
            return false;
        }
        this.isAnimating = true;
        
        // Set the revealer element´s transform and transform origin.
        var defaults = { // In case revealSettings is incomplete, its properties deafault to:
                duration: 500,
                easing: 'easeInOutQuint',
                delay: 0,
                bgcolor: '#f0f0f0',
                direction: 'lr',
                coverArea: 0
            },
            revealSettings = revealSettings || this.options.revealSettings,
            direction = revealSettings.direction || defaults.direction,
            transformSettings = this._getTransformSettings(direction);
        
        this.revealer.style.WebkitTransform = this.revealer.style.transform =  transformSettings.val;
        this.revealer.style.WebkitTransformOrigin = this.revealer.style.transformOrigin =  transformSettings.origin.initial;
        
        // Set the Revealer´s background color.
        this.revealer.style.backgroundColor = revealSettings.bgcolor || defaults.bgcolor;
        
        // Show it. By default the revealer element has opacity = 0 (CSS).
        this.revealer.style.opacity = 1;
        
        // Animate it.
        var self = this,
            // Second animation step.
            animationSettings_2 = {
                complete: function() {
                    self.isAnimating = false;
                    if( typeof revealSettings.onComplete === 'function' ) {
                        revealSettings.onComplete(self.content, self.revealer);
                    }
                }
            },
            // First animation step.
            animationSettings = {
                delay: revealSettings.delay || defaults.delay,
                complete: function() {
                    self.revealer.style.WebkitTransformOrigin = self.revealer.style.transformOrigin = transformSettings.origin.halfway;
                    if( typeof revealSettings.onCover === 'function' ) {
                        revealSettings.onCover(self.content, self.revealer);
                    }
                    anime(animationSettings_2);
                    
                }
            };
        
        animationSettings.targets = animationSettings_2.targets = this.revealer;
        animationSettings.duration = animationSettings_2.duration = revealSettings.duration || defaults.duration;
        animationSettings.easing = animationSettings_2.easing = revealSettings.easing || defaults.easing;
        
        var coverArea = revealSettings.coverArea || defaults.coverArea;
        if( direction === 'lr' || direction === 'rl' ) {
            animationSettings.scaleX = [0,1];
            animationSettings_2.scaleX = [1,coverArea/100];
        }
        else {
            animationSettings.scaleY = [0,1];
            animationSettings_2.scaleY = [1,coverArea/100];
        }
        
        if( typeof revealSettings.onStart === 'function' ) {
            revealSettings.onStart(self.content, self.revealer);
        }
        anime(animationSettings);
    };
    
    window.RevealFx = RevealFx;
    
})(window);


//reveal end


;(function(window) {

    'use strict';

    // Helper vars and functions.
    function extend( a, b ) {
        for( var key in b ) { 
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }
    // Concatenate JS objs.
    // From http://stackoverflow.com/a/2454315.
    function collect() {
        var ret = {};
        var len = arguments.length;
        for (var i=0; i<len; i++) {
            for (var p in arguments[i]) {
                if (arguments[i].hasOwnProperty(p)) {
                    ret[p] = arguments[i][p];
                }
            }
        }
        return ret;
    }

    /**
     * LetterPart obj. A letter can be split in several parts. Each part will contain one or more layers/paths.
     */
    function LetterPart(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        // The layers/paths.
        this.layers = [].slice.call(this.el.querySelectorAll('path'));
        // Total number of layers.
        this.layersTotal = this.layers.length;
        var self = this;
        this.layers.forEach(function(layer, pos) {
            if( self.options.pathOpacityAnim ) {
                // If pathOpacityAnim is true, then set the opacity to 0 for all the paths except the last one. We want to make sure that given 2 or more overlapping paths the ones behind will not be shown.
                layer.style.opacity = pos === self.layersTotal - 1 ? 1 : 0;
            }
            // Set the stroke dasharray to the path´s total length and stroke dashoffset to 0 so the paths are initially rendered.
            layer.style.strokeDashoffset = 0;
            layer.style.strokeDasharray = layer.getTotalLength();
        });
    }

    /**
     * Show all the layers by setting the opacity to 1.
     */
    LetterPart.prototype.showLayers = function() {
        this.layers.forEach(function(layer, pos) {
            layer.style.opacity = 1;
        });
    };

    /**
     * Letter obj. The letter element is a SVG group containing one or more parts (LetterParts).
     */
    function Letter(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        // Set transform origin (center center).
        var bcr = this.el.getBBox();
        this.el.style.transformOrigin = (bcr.x + bcr.width/2) + 'px ' + (bcr.y + bcr.height/2) + 'px';
        this.parts = [];
        var self = this;
        [].slice.call(this.el.querySelectorAll('g.letter__part')).forEach(function(el) {
            self.parts.push(new LetterPart(el, { pathOpacityAnim : self.options.pathOpacityAnim }));
        });
    }

    /**
     * Phrase obj. The Phrase element is the SVG element itself containing all the SVG groups that represent each letter.
     */
    function Phrase(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this.letterElems = [].slice.call(this.el.querySelectorAll('g.letter'));
        this.letters = [];
        var self = this;
        this.letterElems.forEach(function(el) {
            self.letters.push(new Letter(el, { pathOpacityAnim : self.options.pathOpacityAnim }));
        });
    }

    Phrase.prototype.options = {
        // If true, all the layers/paths of each letter part (except the last one) will animate the opacity to 0.
        // With this, we avoid any overlapping path behind the last one to be shown.
        pathOpacityAnim: false,
        // The animation settings for the ´out´ animation (when we click the button and the letters disappear). We are using the anime.js lib so the syntax is the same.
        outAnimation: {
            translateY: [0, 15],
            opacity: [1, 0],
            duration: 250,
            easing: 'easeInOutQuad'
        },
        // The animation settings for the ´in´ animation (when the letters appear again).
        inAnimation: {
            properties: {
                translateY: {
                    value: [-30, 0],
                    duration: 900,
                    elasticity: 600,
                    easing: 'easeOutElastic'
                },
                opacity: {
                    value: [0, 1],
                    duration: 500,
                    easing: 'linear'
                },
            },
            delay: 40 // delay increment per letter.
        },
        // Stroke animation settings
        pathAnimation: {
            duration: 800,
            easing: 'easeOutQuint',
            delay: 200 // delay increment per path.
        }
    };

    Phrase.prototype.animate = function() {
        var self = this,
            animOutProps = {
                targets: this.letterElems,
                complete: function() {
                    var animLettersProps = {
                        targets: self.letterElems,
                        delay: function(el, index) {
                            return index * self.options.inAnimation.delay;
                        }
                    };

                    anime(collect(animLettersProps, self.options.inAnimation.properties));

                    for(var i = 0, len = self.letters.length; i < len; ++i) {
                        var parts = self.letters[i].parts,
                            partsTotal = parts.length;

                        for(var j = 0, len2 = parts.length; j < len2; ++j) {
                            parts[j].showLayers();
                            
                            var animProps = {
                                targets: parts[j].layers,
                                strokeDashoffset: function(el) {
                                    return [el.getTotalLength(), 0];
                                },
                                easing: self.options.pathAnimation.easing,
                                duration: self.options.pathAnimation.duration,
                                delay: function(el, index) {
                                    return index * self.options.pathAnimation.delay + i * self.options.inAnimation.delay;
                                }
                            };

                            if( self.options.pathOpacityAnim ) {
                                animProps.opacity = {
                                    value: function(el, index) {
                                        return index !== parts[j].layers.length - 1 ? 0 : 1;
                                    },
                                    duration: 200,
                                    delay: function(el, index) {
                                        return index * self.options.pathAnimation.delay + i * self.options.inAnimation.delay + self.options.pathAnimation.duration - 0.1*self.options.pathAnimation.duration;
                                    }
                                }
                            }

                            anime(animProps);
                        }
                    }
                }
            };

        anime(collect(animOutProps, this.options.outAnimation));
    };

    window.Phrase = Phrase;

})(window);


//letter_top_bottom animation


{

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function randomBetween(minValue,maxValue,precision) {
        if( typeof(precision) == 'undefined' ) {
            precision = 2;
        }
        return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
    }

    let winsize = {width: window.innerWidth, height: window.innerHeight};

    class Shape {
        constructor(type, letterRect, options) {
            this.DOM = {};
            this.options = {
                shapeTypes: ['circle', 'rect', 'polygon'],
                shapeColors: ['#e07272', '#0805b5', '#49c6ff', '#8bc34a', '#1e1e21', '#e24e81', '#e0cd24'],
                shapeFill: true,
                shapeStrokeWidth: 1
            }
            Object.assign(this.options, options);
            this.type = type || this.options.shapeTypes[0];
            if ( this.type !== 'random' && !this.options.types.includes(this.type) ) return;
            if (this.type === 'random') this.type = this.options.shapeTypes[randomBetween(0,this.options.shapeTypes.length-1,0)];
            this.letterRect = letterRect;
            this.init();
        }
        init() {
            this.DOM.el = document.createElementNS('http://www.w3.org/2000/svg', this.type);
            this.DOM.el.style.opacity = 0;
            this.configureShapeType();
            
            if ( this.options.shapeFill ) {
                this.DOM.el.setAttribute('fill', this.options.shapeColors[randomBetween(0,this.options.shapeColors.length-1,0)]);
            }
            else {
                this.DOM.el.setAttribute('fill', 'none');
                this.DOM.el.setAttribute('stroke-width', this.options.shapeStrokeWidth);
                this.DOM.el.setAttribute('stroke', this.options.shapeColors[randomBetween(0,this.options.shapeColors.length-1,0)]);
            }
        }
        configureShapeType() {
            this.DOM.el.style.transformOrigin = `${this.letterRect.left + this.letterRect.width/2}px ${this.letterRect.top + this.letterRect.height/2}px`;

            if ( this.type === 'circle' ) {
                const r = 0.5*this.letterRect.width;
                this.DOM.el.setAttribute('r', r);
                this.DOM.el.setAttribute('cx', this.letterRect.left + this.letterRect.width/2);
                this.DOM.el.setAttribute('cy', this.letterRect.top + this.letterRect.height/2);
            }
            else if ( this.type === 'rect' ) {
                const w = randomBetween(0.05,0.5,3)*this.letterRect.width;
                const h = randomBetween(0.05,0.5,3)*this.letterRect.height;
                this.DOM.el.setAttribute('width', w);
                this.DOM.el.setAttribute('height', h);
                this.DOM.el.setAttribute('x', this.letterRect.left + (this.letterRect.width-w)/2);
                this.DOM.el.setAttribute('y', this.letterRect.top + (this.letterRect.height-h)/2);
            }
            else if ( this.type === 'polygon' ) {
                this.DOM.el.setAttribute('points', `${this.letterRect.left} ${this.letterRect.top+this.letterRect.height}, ${this.letterRect.left+this.letterRect.width/2} ${this.letterRect.bottom-this.letterRect.width}, ${this.letterRect.left+this.letterRect.width} ${this.letterRect.top+this.letterRect.height}`);
            }
        }
        onResize( letterRect ) {
            this.letterRect = letterRect;
            this.configureShapeType();
        }
    };

    class Letter {
        constructor(el, svg, options) {
            this.DOM = {};
            this.DOM.el = el;
            this.DOM.svg = svg;
            this.options = {
                totalShapes: 10
            }
            Object.assign(this.options, options);
            this.rect = this.DOM.el.getBoundingClientRect();
            this.totalShapes = this.options.totalShapes;
            this.init();
            this.initEvents();
        }
        init() {
            this.shapes = [];
            for (let i = 0; i <= this.totalShapes-1; ++i) {
                const shape = new Shape('random', this.rect, this.options);
                this.shapes.push(shape);
                this.DOM.svg.appendChild(shape.DOM.el);
            }
        }
        initEvents() {
            window.addEventListener('resize', debounce(() => {
                this.rect = this.DOM.el.getBoundingClientRect();
                for (let i = 0; i <= this.totalShapes-1; ++i) {
                    const shape = this.shapes[i];
                    shape.onResize(this.rect);
                }
            }, 20));
        }
    };

    class Word {
        constructor(el, options) {
            this.DOM = {};
            this.DOM.el = el;
            this.options = {
                shapesOnTop: false
            }
            Object.assign(this.options, options);
            this.init();
            this.initEvents();
        }
        init() {
            this.createSVG();
            charming(this.DOM.el);
            this.letters = [];
            Array.from(this.DOM.el.querySelectorAll('span')).forEach(letter => this.letters.push(new Letter(letter, this.DOM.svg, this.options)));
        }
        initEvents() {
            window.addEventListener('resize', debounce(() => {
                winsize = {width: window.innerWidth, height: window.innerHeight};
                this.DOM.svg.setAttribute('width', `${winsize.width}px`);
                this.DOM.svg.setAttribute('height',`${winsize.width}px`);
                this.DOM.svg.setAttribute('viewbox',`0 0 ${winsize.width} ${winsize.height}`);
            }, 20));
        }
        createSVG() {
            this.DOM.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.DOM.svg.setAttribute('class', 'shapes');
            this.DOM.svg.setAttribute('width', `${winsize.width}px`);
            this.DOM.svg.setAttribute('height',`${winsize.width}px`);
            this.DOM.svg.setAttribute('viewbox',`0 0 ${winsize.width} ${winsize.height}`);
            if ( this.options.shapesOnTop ) {
                this.DOM.el.parentNode.insertBefore(this.DOM.svg, this.DOM.el.nextSibling);
            }
            else {
                this.DOM.el.parentNode.insertBefore(this.DOM.svg, this.DOM.el);
            }
        }
        show(config) {
            return this.toggle('show', config);
        }
        hide(config) {
            return this.toggle('hide', config);
        }
        toggle(action = 'show', config) {
            return new Promise((resolve, reject) => {
                const toggleNow = () => {
                    for (let i = 0, len = this.letters.length; i <= len-1; ++i) {
                        this.letters[i].DOM.el.style.opacity = action === 'show' ? 1 : 0;
                    }
                    resolve();
                };

                if ( config && Object.keys(config).length !== 0 ) {
                    if ( config.shapesAnimationOpts ) {
                        for (let i = 0, len = this.letters.length; i <= len-1; ++i) {
                            const letter = this.letters[i];
                            setTimeout( function(letter) {
                                return () => {
                                    config.shapesAnimationOpts.targets = letter.shapes.map(shape => shape.DOM.el);
                                    anime.remove(config.shapesAnimationOpts.targets);
                                    anime(config.shapesAnimationOpts);
                                }
                            }(letter), config.lettersAnimationOpts && config.lettersAnimationOpts.delay ? config.lettersAnimationOpts.delay(letter.DOM.el,i) : 0);        
                        }
                    }
                    if ( config.lettersAnimationOpts ) {
                        config.lettersAnimationOpts.targets = this.letters.map(letter => letter.DOM.el);
                        config.lettersAnimationOpts.complete = () => {
                            if (action === 'hide' ) {
                                for (let i = 0, len = config.lettersAnimationOpts.targets.length; i <= len-1; ++i) {
                                    config.lettersAnimationOpts.targets[i].style.transform = 'none';
                                }
                            }
                            resolve();
                        };
                        anime(config.lettersAnimationOpts);
                    }
                    else {
                        toggleNow();
                    }
                }
                else {
                    toggleNow();
                }
            });
        }
    };

    window.Word = Word;
};

function LogoAnimation() {
            var svgFx2 = document.querySelector('.letters--effect'),
                phrase2 = new Phrase(svgFx2, {
                    pathOpacityAnim: true,
                    outAnimation: {
                        scale: 0,
                        opacity:0,
                        duration: 550,
                        easing: 'easeInOutQuad'
                    },
                    inAnimation: {
                        delay: 350,
                        properties: {
                            scale: {
                                value: function() {
                                    return [0, 1];
                                },
                                duration: 900,
                                elasticity: 600,
                                easing: 'easeOutElastic'
                            },
                            opacity: {
                                value: [0, 1],
                                duration: 50,
                                easing: 'linear'
                            },
                        }
                    },
                    pathAnimation: {
                        opacity:  1,
                        duration: 700,
                        easing: 'easeOutSine',
                        delay: 200
                    }
                });

            (function() {
                window.onload = function() {
                    setTimeout(function(){
                       phrase2.animate();
                    },5);        
                }();
            })();
      }LogoAnimation();