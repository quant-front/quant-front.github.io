const text = new Blotter.Text("Hello", {
     family: "serif",
     size: 300,
     fill: "#fff",
     paddingLeft: 80,
     paddingRight: 80,
     paddingTop: 80,
     paddingBottom: 80
});

var material = new Blotter.SlidingDoorMaterial();

material.uniforms.uSpeed.value = 0.2;
material.uniforms.uAnimateHorizontal.value = true;


var blotter = new Blotter(material, { texts : text });

var scope = blotter.forText(text);

var container = document.querySelector('.main');
scope.appendTo(container);





document.onmousemove = moveIt;
function moveIt(event) {
     // material.uniforms.uPointCellWidth.value = (event.clientX * .1);
     // material.uniforms.uSpeed.value = (event.clientX * 0.003);
}