// *** DEC 16 ***
var mapStyleId = 'mapbox.light';

//restricts map area
var bounds = [
    [50.595, 6.93],   //Southwest
    [50.821, 7.24]    //Northeast
];

//Initialize map, setView on Bonn, set Zoom
var trafficMapBonn = L.map('map_traffic_id', {
    minZoom: 11,
    maxBounds: bounds
}).setView([50.735, 7.10], 13);

//add token and mapstyle
trafficLayerBonn = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    id: mapStyleId
}).addTo(trafficMapBonn);

//load traffic data to map, add colors
function loadData_16(data) {
    L.geoJSON(data, {
        style:
            function setColor(feature) {
                switch (feature.properties.verkehrsstatus) {
                    case 'normales Verkehrsaufkommen':
                        farbe = '#1C9D43';
                        break;
                    case 'erhoehte Verkehrsbelastung':
                        farbe = '#E8C358';
                        break;
                    case 'Staugefahr':
                        farbe = '#F77942';
                        break;
                    case 'Stau':
                        farbe = '#B9303E';
                        break;
                    case 'aktuell nicht ermittelbar':
                        farbe = '#4173E5';
                        break;
                    default:
                        farbe = '#000000';
                }
                return {color: farbe};
            }
    }).addTo(trafficMapBonn);
}



// *** DEC 23 ***
//Initialize map, setView on Bonn, set Zoom
var compareMapBonn = L.map('map_compare_id', {
    minZoom: 11,
    zoomControl: false,
    maxBounds: bounds
}).setView([50.735, 7.10], 13);

//add credits to map
compareLayerBonn = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: mapStyleId,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
}).addTo(compareMapBonn);

//load traffic data to map, add colors
function loadData_23(data) {
    L.geoJSON(data, {
        style:
            function setColor(feature) {
                switch (feature.properties.verkehrsstatus) {
                    case 'normales Verkehrsaufkommen':
                        farbe = '#1C9D43';
                        break;
                    case 'erhoehte Verkehrsbelastung':
                        farbe = '#E8C358';
                        break;
                    case 'Staugefahr':
                        farbe = '#F77942';
                        break;
                    case 'Stau':
                        farbe = '#B9303E';
                        break;
                    case 'aktuell nicht ermittelbar':
                        farbe = '#4173E5';
                        break;
                    default:
                        farbe = '#000000';
                }
                return {color: farbe};
            }
    }).addTo(compareMapBonn);
}

//sync maps to one another
trafficMapBonn.sync(compareMapBonn);
compareMapBonn.sync(trafficMapBonn);

//changes "timestamp" text element when slider is moved
function changeValue() {
    document.getElementById("timestamp").innerHTML = document.getElementById("time_slider").value;
}

//calls loadData functions according to time on timeslider
function setData() {
    var data_timestamp = document.getElementById("time_slider").value;
    changeValue();
    loadData_16(data_16[data_timestamp]);
    loadData_23(data_23[data_timestamp]);
}
