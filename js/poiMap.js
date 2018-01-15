var mapStyle = 'mapbox.emerald';

var bounds = [
    [50.595, 6.93],   //Southwest
    [50.807, 7.37]    //Northeast
];

//Initialize map, setView on Bonn, set Zoom
var mapBonn = L.map('map_poi_id', {
    minZoom: 11,
    maxBounds: bounds
}).setView([50.710, 7.10], 12);

//credits of map
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: mapStyle
}).addTo(mapBonn);


//*** CUSTOM ICONS ***
//Electric car charging point
var icon_CCP = L.icon({
    iconUrl: '../img/Stromtankstelle.jpg',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
});
//Carsharing
var icon_CS = L.icon({
    iconUrl: '../img/Cambio.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
});
//Park And Ride
var icon_PAR = L.icon({
    iconUrl: '../img/P+R.jpg',
    iconSize: [22, 26],
    iconAnchor: [11, 13],
    popupAnchor: [0, -13]
});


//*** CAR CHARGING POINTS (CCP)***
function onEachCCPFeature(feature) {
    //adds marker to map
    var markerCCP = L.marker(feature.geometry.coordinates, {icon: icon_CCP}).addTo(mapBonn);
    //Pop-Up to Marker
    markerCCP.bindPopup("<b>" + feature.properties.Einrichtung
        + "</b> <br> <b>Adresse: </b>" + feature.properties.Strasse
        + "</b> <br> <b>Leistung: </b> max. " + feature.properties.Leistung + "kW"
        + "<br> <b>Anmerkungen: </b>" + feature.properties.Anmerkungen);
}

L.geoJSON(ElektrotankstellenStandorte, {
    onEachFeature: onEachCCPFeature
}).addTo(mapBonn);


// *** CARSHARING (CS)***
function onEachCSFeature(feature) {
    //adds marker to map
    var markerCS = L.marker(feature.geometry.coordinates, {icon: icon_CS}).addTo(mapBonn);
    //Pop-Up to Marker
    markerCS.bindPopup("<b> Station: " + feature.name
        + " </b> <br> <b>Adresse: </b>" + feature.address.streetAddress + " " + feature.address.streetNumber
        + "<br> <b>Informationen: </b>" + feature.information.location);
}

L.geoJSON(CarsharingStandorte, {
    onEachFeature: onEachCSFeature
}).addTo(mapBonn);


//*** PARK AND RIDE (PAR)***
function onEachPARFeature(feature) {
    //adds marker to map
    var markerPAR = L.marker(feature.geometry.coordinates, {icon: icon_PAR}).addTo(mapBonn);
    //Pop-Up to Marker
    markerPAR.bindPopup("<b> Haltestelle: " + feature.properties.name + " </b> <br> Adresse: " + feature.properties.adresse);
}

L.geoJSON(ParkAndRideStandorte, {
    onEachFeature: onEachPARFeature
}).addTo(mapBonn);
