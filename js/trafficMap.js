//change to 'mapbox.dark', 'mapbox.light', 'mapbox.emerald', or 'mapbox.high-contrast'
var mapStyleId = 'mapbox.dark';

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

//add credits to map
trafficLayerBonn = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
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
    }).addTo(trafficMapBonn);
}

//***Map for comparison***
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
                    case 'erhöhtes Verkehrsaufkommen':
                        farbe = '#E8C358'
                        break;
                    case 'Staugefahr':
                        farbe = '#F77942'
                        break;
                    case 'Stau':
                        farbe = '#B9303E'
                        break;
                    default:
                        farbe = '#4173E5'
                }
                return {color: farbe};
            }
    }).addTo(compareMapBonn);
}

//sync maps to one another
trafficMapBonn.sync(compareMapBonn);
compareMapBonn.sync(trafficMapBonn);


// *** FUNCTIONS ***

//calls loadData functions according to time on timeslider
function changeData() {
    var data_timestamp = document.getElementById("time_slider").value;
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
        case '3':
            loadData_16(data_16_03);
            loadData_23(data_23_03);
            break;
        case '4':
            loadData_16(data_16_04);
            loadData_23(data_23_04);
            break;
        case '5':
            loadData_16(data_16_05);
            loadData_23(data_23_05);
            break;
        case '6':
            loadData_16(data_16_06);
            loadData_23(data_23_06);
            break;
        case '7':
            loadData_16(data_16_07);
            loadData_23(data_23_07);
            break;
        case '8':
            loadData_16(data_16_08);
            loadData_23(data_23_08);
            break;
        case '9':
            loadData_16(data_16_09);
            loadData_23(data_23_09);
            break;
        case '10':
            loadData_16(data_16_10);
            loadData_23(data_23_10);
            break;
        case '11':
            loadData_16(data_16_11);
            loadData_23(data_23_11);
            break;
        case '12':
            loadData_16(data_16_12);
            loadData_23(data_23_12);
            break;
        case '13':
            loadData_16(data_16_13);
            loadData_23(data_23_13);
            break;
        case '14':
            loadData_16(data_16_14);
            loadData_23(data_23_14);
            break;
        case '15':
            loadData_16(data_16_15);
            loadData_23(data_23_15);
            break;
        case '16':
            loadData_16(data_16_16);
            loadData_23(data_23_16);
            break;
        case '17':
            loadData_16(data_16_17);
            loadData_23(data_23_17);
            break;
        case '18':
            loadData_16(data_16_18);
            loadData_23(data_23_18);
            break;
        case '19':
            loadData_16(data_16_19);
            loadData_23(data_23_19);
            break;
        case '20':
            loadData_16(data_16_20);
            loadData_23(data_23_20);
            break;
        case '21':
            loadData_16(data_16_21);
            loadData_23(data_23_21);
            break;
        case '22':
            loadData_16(data_16_22);
            loadData_23(data_23_22);
            break;
        case '23':
            loadData_16(data_16_23);
            loadData_23(data_23_23);
            break;
    }
}

//changes "Uhrzeit" text element when slider is moved
function changeValue() {
    document.getElementById("timestamp").innerHTML = document.getElementById("time_slider").value;
    changeData();
}

function init() {
    changeData(); //load maps
    changeValue(); //display slider value
}