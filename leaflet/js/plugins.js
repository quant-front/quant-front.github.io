var map = L.map('map', {
     // 49.99024947, 36.22527122
}).setView([49.99024947, 36.22527122], 13);
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     // attribution: '&copy; <a href="copyright">Openstreetmap</a>'
}).addTo(map);
// var spinalLayer = L.tileLayer('https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=db5ae1f5778a448ca662554581f283c5', {
//      attribution: '&copy; <a href="copyright">Openstreetmap</a>'
// }).addTo(map);

const  leafletIcon = L.icon({
     iconUrl: 'img/marker.svg',
     iconSize:[38,95],
     iconAnchor:[22,94],
     popupAnchor:[-2,-65],
});
var marker5 = L.marker([50.0208122, 36.2179480], {icon:leafletIcon}).addTo(map);
var marker = L.marker([49.99024941, 36.22527128], {icon:leafletIcon}).addTo(map);
marker.bindPopup("<b>GlobalLogice</b><br>garage").openPopup();
marker5.bindPopup("<b>GlobalLogice<br>main office</b>").openPopup();

// var baseMaps = {
//      OSM: osmLayer,
//      Spinal: spinalLayer,
// };
// var group = L.layerGroup([marker, marker5])
//      .addTo(map);
//
// L.control.layers(baseMaps, {
//      'Маркеры': group,
// }).addTo(map);



let mark = document.querySelectorAll('.leaflet-marker-pane img');
for (let i = 0; i < mark.length; i++) {
     mark[0].addEventListener('click', function () {
          map.setView([50.0208122, 36.2179480], 20);
     });
     mark[1].addEventListener('click', function () {
          map.setView([49.99024941, 36.22527128], 20);
     });

     mark[i].addEventListener('mouseenter', function () {
          mark[i].style.animation = 'si-button-pulse 0.8s 0s ease-out 3';
     });
     mark[i].addEventListener('mouseleave', function () {
          mark[i].style.animation = '';
     })
}

