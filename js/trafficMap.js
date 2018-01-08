//Initialisieren Map, setView auf Bonn, Angabe Zoom
var trafficMapBonn = L.map('map_traffic_id').setView([50.735, 7.10], 13);

//Credits zu Karte
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(trafficMapBonn);


//var farbe = "#FFFFFF";

//Versuch, Strecken anders zu färben
/*function traffic_color(feature) {
    if(feature.properties.strecke_id=3){
        farbe = "green";
    }
    else {
        farbe = "blue";
    }
    return farbe;
}*/

// adding dara to map, coloring


d3.json('../data/2017-12-16/verkehr-20171216000000.geojson', function (error, mapData) {
    L.geoJSON(mapData, {
        style:
            function x(feature) {
                switch (feature.properties.verkehrsstatus) {
                    case 'normales Verkehrsaufkommen':
                        farbe = '#00FF3C';
                        break;
                    case 'erhöhtes Verkehrsaufkommen':
                        farbe = '#FFBF00'
                        break;
                    case 'Staugefahr':
                        farbe = '#FF4000'
                        break;
                    case 'Stau':
                        farbe = '#FF0000'
                        break;
                    case 'aktuell nicht ermittelbar':
                        farbe = '#81BEF7';
                        break;
                    default:
                        farbe = '#000000'
                }
                return {color: farbe};
            }
    }).addTo(trafficMapBonn)
});

//***Map for comparison***
var compareMapBonn = L.map('map_compare_id').setView([50.735, 7.10], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
}).addTo(compareMapBonn);


d3.json('../data/2017-12-23/verkehr-20171223000000.geojson', function (error, mapData) {
    L.geoJSON(mapData, {
        style:
            function x(feature) {
                switch (feature.properties.verkehrsstatus) {
                    case 'normales Verkehrsaufkommen':
                        farbe = '#00FF3C';
                        break;
                    case 'erhöhtes Verkehrsaufkommen':
                        farbe = '#FFBF00'
                        break;
                    case 'Staugefahr':
                        farbe = '#FF4000'
                        break;
                    case 'Stau':
                        farbe = '#FF0000'
                        break;
                    case 'aktuell nicht ermittelbar':
                        farbe = '#81BEF7';
                        break;
                    default:
                        farbe = '#000000'
                }
                return {color: farbe};
            }
    }).addTo(compareMapBonn)
});