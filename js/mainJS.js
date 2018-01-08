
/*function load() {
    alert("Test1");
    var traffic_16_12 = JSON.parse(data);
    alert(traffic_16_12.properties.verkehrsstatus);
    alert("Test2");
}*/

/*function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.geojson', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        var traffic_16_12 = JSON.parse(response);
    });
}*/