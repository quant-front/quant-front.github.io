var text = new Blotter.Text("Good morning", {
     family : "serif",
     size : 320,
     fill : "#171717"
});

var material = new Blotter.FliesMaterial();
material.uniforms.uPointCellWidth.value = 0.012;
material.uniforms.uPointRadius.value = 0.85;
material.uniforms.uSpeed.value = 3;

var blotter = new Blotter(material, { texts : text });

var scope = blotter.forText(text);

var container = document.querySelector('.main');
scope.appendTo(container);

document.onmousemove = moveIt;
function moveIt(event) {
     // material.uniforms.uPointCellWidth.value = (event.clientX * .1);
     // material.uniforms.uSpeed.value = (event.clientX * 0.003);
}