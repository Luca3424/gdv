//Initialisieren Map, setView auf Bonn, Angabe Zoom
var mapBonn = L.map('map_id2').setView([50.710, 7.10], 12);

//Credits zu Karte
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mapBonn);


//*** CUSTOM ICONS ***
//Elektrotankstellen
var icon_ETS = L.icon({
    iconUrl: '../img/Stromtankstelle.jpg',
    iconSize:[20, 20],
    iconAnchor:[10, 10],
    popupAnchor:[0, -10]});
//Carsharing
var icon_CS = L.icon({
    iconUrl: '../img/Cambio.png',
    iconSize:[20, 20],
    iconAnchor:[10, 10],
    popupAnchor:[0, -10]});
//Park And Ride
var icon_PAR = L.icon({
    iconUrl: '../img/P+R.jpg',
    iconSize:[22, 26],
    iconAnchor:[11, 13],
    popupAnchor:[0, -13]});



//*** ELEKTROTANKSTELLEN (ETS)***
function onEachETSFeature(feature) {
    //fügt Marker zu Karte hinzu
    var markerETS = L.marker(feature.geometry.coordinates, {icon:icon_ETS}).addTo(mapBonn);
    //Pop-Up zu Marker
    markerETS.bindPopup("<b>" + feature.properties.Einrichtung
        + "</b> <br> <b>Adresse: </b>" + feature.properties.Strasse
        + "</b> <br> <b>Leistung: </b> max. " + feature.properties.Leistung + "kW"
        + "<br> <b>Anmerkungen: </b>" + feature.properties.Anmerkungen);
}
L.geoJSON(ElektrotankstellenStandorte, {
    onEachFeature: onEachETSFeature
}).addTo(mapBonn);



// *** CARSHARING (CS)***
function onEachCSFeature(feature) {
    //fügt Marker zu Karte hinzu
    var markerCS = L.marker(feature.geometry.coordinates, {icon:icon_CS}).addTo(mapBonn);
    //Pop-Up zu Marker
    markerCS.bindPopup("<b> Station: " + feature.name
        + " </b> <br> <b>Adresse: </b>" + feature.address.streetAddress + " " + feature.address.streetNumber
        + "<br> <b>Informationen: </b>" + feature.information.location);
}
L.geoJSON(CarsharingStandorte, {
    onEachFeature: onEachCSFeature
}).addTo(mapBonn);



//*** PARK AND RIDE (PAR)***
function onEachPARFeature(feature) {
    //fügt Marker zu Karte hinzu
    var markerPAR = L.marker(feature.geometry.coordinates, {icon:icon_PAR}).addTo(mapBonn);
    //Pop-Up zu Marker
    markerPAR.bindPopup("<b> Haltestelle: " + feature.properties.name + " </b> <br> Adresse: " + feature.properties.adresse);
}
L.geoJSON(ParkAndRideStandorte, {
    onEachFeature: onEachPARFeature
}).addTo(mapBonn);

/*d3.json("ParkAndRideStandorte.geojson", function(data){
    onEachFeature: onEachPARFeature
}).addTo(mapBonn);

/*L.geoJSON(PAR_Points).addTo(mapBonn);
onEachPARFeature(PAR_Points);

/*d3.json("ParkAndRideStandorte.geojson", function(data){
    onEachFeature: onEachPARFeature
}).addTo(mapBonn);

/*d3.json("../geojson/Donnerstag/verkehr-20171214000000.geojson", function(json) {
    svg.selectAll("mapBonn")
        .data(json.features)
        .enter()
        .append("mapBonn")
        .attr("d", mapBonn);
});*/

/*var geojsonLayer = new L.GeoJSON.AJAX("../../geojson/ParkAndRideStandorte.geojson");
mapBonn.addLayer(geojsonLayer);

function handleGeoJSON(data) {
    geojsonLayer.addGeoJSON(data)
}*/

/*var PAR_Points = $.ajax({
    url:"../geojson/ParkAndRideStandorte.geojson",
    dataType: "geojson",
    success: console.log("Data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
});*/
