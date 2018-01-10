//change to 'mapbox.dark', 'mapbox.light', 'mapbox.emerald', or 'mapbox.high-contrast'
var mapStyleId = 'mapbox.high-contrast';

//restricts map area
var bounds = [
    [50.595, 6,93],   //Southwest
    [50.821, 7.24]    //Northeast
];

//Initialisieren Map, setView auf Bonn, Angabe Zoom
var trafficMapBonn = L.map('map_traffic_id', {
    minZoom: 11,
    maxBounds: bounds
}).setView([50.735, 7.10], 13);

//Credits zu Karte
trafficLayerBonn = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: mapStyleId
}).addTo(trafficMapBonn);


d3.json('../data/2017-12-16/verkehr-20171216000000.geojson', function (error, mapData) {
    L.geoJSON(mapData, {
        style:
            function x(feature) {
                switch (feature.properties.verkehrsstatus) {
                    case 'normales Verkehrsaufkommen':
                        farbe = '#1C9D43';
                        break;
                    case 'erhöhtes Verkehrsaufkommen':
                        farbe = '#E8C358'
                        break;
                    case 'Staugefahr':
                        farbe = '#F77942'
                        break;
                    case 'Stau':
                        farbe = '#B9303E'
                        break;
                    /*case 'aktuell nicht ermittelbar':
                        farbe = '#000000';
                        break;*/
                    default:
                        farbe = '#4173E5'
                }
                return {color: farbe};
            }
    }).addTo(trafficMapBonn)
});

//***Map for comparison***
var compareMapBonn = L.map('map_compare_id', {
    minZoom: 11,
    zoomControl: false,
    maxBounds: bounds
}).setView([50.735, 7.10], 13);

compareLayerBonn = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: mapStyleId,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
}).addTo(compareMapBonn);


d3.json('../data/2017-12-23/verkehr-20171223000000.geojson', function (error, mapData) {
    L.geoJSON(mapData, {
        style:
            function x(feature) {
                switch (feature.properties.verkehrsstatus) {
                    case 'normales Verkehrsaufkommen':
                        farbe = '#1C9D43';
                        break;
                    case 'erhöhtes Verkehrsaufkommen':
                        farbe = '#E8C358'
                        break;
                    case 'Staugefahr':
                        farbe = '#F77942'
                        break;
                    case 'Stau':
                        farbe = '#B9303E'
                        break;
                    /*case 'aktuell nicht ermittelbar':
                        farbe = '#000000';
                        break;*/
                    default:
                        farbe = '#4173E5'
                }
                return {color: farbe};
            }
    }).addTo(compareMapBonn)
});

trafficMapBonn.sync(compareMapBonn);
compareMapBonn.sync(trafficMapBonn);