var data_1216 = []; //traffic data of Dec 16
var filename_base_16 = "../data/2017-12-16/verkehr-20171216";
var filename_ending = ".geojson";
var data_1223 = []; //traffic data of Dec 23
var filename_base_23 = "../data/2017-12-23/verkehr-20171223";

//does not work, do not use
function initData() {
    for (var i = 000000; i <= 001000; i = i + 500) {
        var filename_full_16 = filename_base_16 + i + filename_ending;
        data_1216.push(mapData);
    }


    for (var i = 000000; i <= 001000; i = i + 500) {
        var filename_full_23 = filename_base_23 + i + filename_ending;
        data_1223.push(filename_full_23);
    }
};

/*
for (var i = 000000; i <= 001000; i = i + 500) {
        var filename_full_16 = filename_base_16 + i + filename_ending;
        d3.json(filename_full_16, function (error, mapData) {
            data_1216.push(mapData);
        });
    }

for (var i=000000; i<=001000; i=i+500){
    var filename_full_23 = filename_base_23 + i + filename_ending;
    d3.json(filename_full_23, function (error, mapData) {
        data_1223.push(mapData);
    });
}*/

//Initialize map, setView on Bonn, set Zoom
var trafficMapBonn = L.map('map_traffic_id').setView([50.735, 7.10], 13);

//credits of map
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(trafficMapBonn);

/*d3.json('../data/2017-12-16/verkehr-20171216000000.geojson', function (error, mapData) {
    L.geoJSON(mapData, {
        style:
            function x(feature) {
                switch (feature.properties.verkehrsstatus) {
                    case 'normales Verkehrsaufkommen':
                        farbe = '#00FF3C';
                        break;
                    case 'erhöhtes Verkehrsaufkommen':
                        farbe = '#FFBF00';
                        break;
                    case 'Staugefahr':
                        farbe = '#FF4000';
                        break;
                    case 'Stau':
                        farbe = '#FF0000';
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
});*/

function loadData_16(data) {
    L.geoJSON(data, {
        style:
            function setColor(feature) {
                switch (feature.properties.verkehrsstatus) {
                    case 'normales Verkehrsaufkommen':
                        farbe = '#00FF3C';
                        break;
                    case 'erhöhtes Verkehrsaufkommen':
                        farbe = '#FFBF00';
                        break;
                    case 'Staugefahr':
                        farbe = '#FF4000';
                        break;
                    case 'Stau':
                        farbe = '#FF0000';
                        break;
                    case 'aktuell nicht ermittelbar':
                        farbe = '#81BEF7';
                        break;
                    default:
                        farbe = '#000000'
                }
                return {color: farbe};
            }
    }).addTo(trafficMapBonn);
}

function changeData() {
    var data_timestamp = document.getElementById('timestamp').value;
    switch (data_timestamp) {
        case '0':
            loadData_16(data_16_00);
            loadData_23(data_23_00);
            break;
        case '1':
            loadData_16(data_16_01);
            loadData_23(data_23_01);
            break;
        case '2':
            loadData_16(data_16_02);
            loadData_23(data_23_02);
            break;
    }
}

//***Map for comparison***
//Initialize map, setView on Bonn, set Zoom
var compareMapBonn = L.map('map_compare_id').setView([50.735, 7.10], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
}).addTo(compareMapBonn);

function loadData_23(data) {
    L.geoJSON(data, {
        style:
            function setColor(feature) {
                switch (feature.properties.verkehrsstatus) {
                    case 'normales Verkehrsaufkommen':
                        farbe = '#00FF3C';
                        break;
                    case 'erhöhtes Verkehrsaufkommen':
                        farbe = '#FFBF00';
                        break;
                    case 'Staugefahr':
                        farbe = '#FF4000';
                        break;
                    case 'Stau':
                        farbe = '#FF0000';
                        break;
                    case 'aktuell nicht ermittelbar':
                        farbe = '#81BEF7';
                        break;
                    default:
                        farbe = '#000000'
                }
                return {color: farbe};
            }
    }).addTo(compareMapBonn);
};

function init() {
    changeData();
    document.getElementById('timestamp').addEventListener("change", changeData);
};