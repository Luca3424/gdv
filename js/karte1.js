//Initialisieren Map, setView auf Bonn, Angabe Zoom
var trafficMapBonn = L.map('map_id1').setView([50.735, 7.10], 13);

//Credits zu Karte
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(trafficMapBonn);

var style1 = {
    color: 'red',
}

var style2 = {
    color: 'green',
}

var farbe = "red";

function traffic_color(feature) {
    if(feature.properties.strecke_id=3){
        farbe = "green";
    }
    else {
        farbe = "blue";
    }
    return farbe;
}

L.geoJSON(VerkehrslageTest, {
    color: farbe,
}).addTo(trafficMapBonn);

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
