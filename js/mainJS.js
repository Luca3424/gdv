//***Map itself***
var mapBonn = L.map('mapId').setView([50.735, 7.10], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
}).addTo(mapBonn);

//***Map for comparison***
var compareMapBonn = L.map('compareMapId').setView([50.735, 7.10], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
}).addTo(compareMapBonn);


//*** ELEKTROTANKSTELLEN (ETS)***
//Custom Icon
var icon_ETS = L.icon({
    iconUrl: '../img/Stromtankstelle.jpg',
    iconSize:     [30, 30]});

var marker_ETS1 = L.marker([50.739, 7.10], {icon:icon_ETS}).addTo(mapBonn);
marker_ETS1.bindPopup("<b>Elektrotankstelle Beethoven Parkhaus</b> <br> Engeltalstraße <br>Anschlüsse bis 22kW");


// *** CARSHARING (CS)***
L.geoJSON(CarsharingStandorte).addTo(mapBonn);

function onEachCSFeature(feature) {
    // hat feature Koordinaten??
    if (feature.address && feature.address.streetAddress) {
        //fügt Marker zu Karte hinzu
        var markerCS = L.marker(feature.geometry.coordinates).addTo(mapBonn);
        //Pop-Up zu Marker
        markerCS.bindPopup("<b> Station: " + feature.name
            + " </b> <br> <b>Adresse: </b>" + feature.address.streetAddress + " " + feature.address.streetNumber
            + "<br> <b>Informationen: </b>" + feature.information.location);
    }
}

L.geoJSON(CarsharingStandorte, {
    onEachFeature: onEachCSFeature
}).addTo(mapBonn);


//*** PARK AND RIDE (PAR)***
L.geoJSON(ParkAndRideStandorte).addTo(mapBonn);

var icon_PAR = L.icon({
    iconUrl: '../img/P+R.jpg',
    iconSize:     [32, 36]});

function onEachPARFeature(feature) {
    // hat feature Properties und Namen?
    if (feature.properties && feature.properties.name) {
        //fügt Marker zu Karte hinzu
        var markerPAR = L.marker(feature.geometry.coordinates, {icon:icon_PAR}).addTo(mapBonn);
        //Pop-Up zu Marker
        markerPAR.bindPopup("<b> Haltestelle: " + feature.properties.name + " </b> <br> Adresse: " + feature.properties.adresse);
    }
}

L.geoJSON(ParkAndRideStandorte, {
    onEachFeature: onEachPARFeature
}).addTo(mapBonn);