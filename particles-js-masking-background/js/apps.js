



tsParticles.load("particles-js", {
     "background": {},
     "backgroundMask": {"cover": {"color": {"value": {"r": 255, "g": 255, "b": 255}}, "opacity": 1}, "enable": true},
     "detectRetina": true,
     "fpsLimit": 30,
     "infection": {"cure": false, "delay": 0, "enable": false, "infections": 0, "stages": []},
     "interactivity": {
          "detectsOn": "canvas",
          "events": {
               "onClick": {"enable": true, "mode": "push"},
               "onDiv": {"elementId": "", "enable": false, "mode": []},
               "onHover": {"enable": true, "mode": "bubble", "parallax": {"enable": false, "force": 60, "smooth": 10}},
               "resize": true
          },
          "modes": {
               "bubble": {"distance": 400, "duration": 2, "opacity": 1, "size": 150, "speed":3},
               "connect": {"distance": 80, "links": {"opacity": 0.5}, "radius": 60},
               "grab": {"distance": 400, "links": {"opacity": 1}},
               "push": {"quantity": 4},
               "remove": {"quantity": 2},
               "repulse": {"distance": 200, "duration": 0.4, "speed": 1},
               "slow": {"factor": 3, "radius": 200}
          }
     },
     "particles": {
          "collisions": {"enable": false, "mode": "bounce"},
          "color": {"value": "#ffffff", "animation": {"enable": false, "speed": 1, "sync": true}},
          "links": {
               "blink": false,
               "color": {"value": "#ffffff"},
               "consent": false,
               "distance": 200,
               "enable": true,
               "opacity": 0.2,
               "shadow": {"blur": 5, "color": {"value": "lime"}, "enable": false},
               "triangles": {"enable": false},
               "width": 1,
               "warp": false
          },
          "move": {
               "attract": {"enable": false, "rotate": {"x": 600, "y": 1200}},
               "direction": "none",
               "enable": true,
               "noise": {
                    "delay": {"random": {"enable": false, "minimumValue": 0}, "value": 0},
                    "enable": false,
                    "factor": {"horizontal": {"value": 50, "offset": 0}, "vertical": {"value": 10, "offset": 40000}}
               },
               "outMode": "out",
               "random": false,
               "speed": 2,
               "straight": false,
               "trail": {"enable": false, "length": 10, "fillColor": {"value": "#000000"}},
               "vibrate": false,
               "warp": false
          },
          "number": {
               "value": 80,
                    "density":{
                         "enable": true,
                         "value_area":800,
                    }
          },
          "opacity": {
               "animation": {"enable": false, "minimumValue": 0.1, "speed": 1, "sync": false},
               "random": {"enable": false, "minimumValue": 1},
               "value": 0.3,
               "min": 0.25,
          },
          "rotate": {
               "animation": {"enable": false, "speed": 0, "sync": false},
               "direction": "clockwise",
               "random": false,
               "value": 0
          },
          "shadow": {"blur": 0, "color": {"value": "#000000"}, "enable": false, "offset": {"x": 0, "y": 0}},
          "shape": {
               "options": {
                    "character": {
                         "fill": true,
                         "close": true,
                         "font": "Verdana",
                         "style": "",
                         "value": "*",
                         "weight": "400"
                    },
                    "char": {
                         "fill": true,
                         "close": true,
                         "font": "Verdana",
                         "style": "",
                         "value": "*",
                         "weight": "400"
                    },
                    "image": {
                         "fill": true,
                         "close": true,
                         "height": 100,
                         "replaceColor": false,
                         "src": "https://cdn.matteobruni.it/images/particles/github.svg",
                         "width": 1
                    },
                    "images": {
                         "fill": true,
                         "close": true,
                         "height": 100,
                         "replaceColor": false,
                         "src": "https://cdn.matteobruni.it/images/particles/github.svg",
                         "width": 1
                    },
                    "polygon": {"fill": true, "close": true, "sides": 5},
                    "star": {"fill": true, "close": true, "sides": 5}
               }, "type": "circle"
          },
          "size": {
               "min":1,
               "animation": {
                    "destroy": "none",
                    "enable": false,
                    "minimumValue": 0.1,
                    "speed": 40,
                    "startValue": "max",
                    "value":10,
                    "sync": false
               }, "random": {"enable": true, "minimumValue": 1}, "value": 30
          },
          "stroke": {"color": {"value": "#000000"}, "width": 0, "opacity": 1},
          "twinkle": {
               "lines": {"enable": false, "frequency": 0.05, "opacity": 1},
               "particles": {"enable": false, "frequency": 0.05, "opacity": 1}
          }
     },
     "pauseOnBlur": true
});