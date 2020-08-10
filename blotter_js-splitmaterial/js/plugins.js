var text = new Blotter.Text("Good morning", {
     family : "serif",
     size : 120,
     fill : "#171717"
});

var material = new Blotter.ChannelSplitMaterial();
material.uniforms.uOffset.value = 0.05;
material.uniforms.uRotation.value = 50;
material.uniforms.uApplyBlur.value = 1;
material.uniforms.uAnimateNoise.value = 0.3;

var blotter = new Blotter(material, { texts : text });

var scope = blotter.forText(text);

var container = document.querySelector('.main');
scope.appendTo(container);

document.onmousemove = moveIt;
function moveIt(event) {
     material.uniforms.uRotation.value = (event.clientX * .1);
     material.uniforms.uOffset.value = (event.clientX * 0.00007);
}