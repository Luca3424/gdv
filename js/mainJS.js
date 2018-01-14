function init() {
    changeData(); //load maps
    changeValue(); //display slider value
}


/*var data_1216 = []; //traffic data of Dec 16
var filename_base_16 = "../data/2017-12-16/verkehr-20171216";
var data_1223 = []; //traffic data of Dec 23
var filename_base_23 = "../data/2017-12-23/verkehr-20171223";
var filename_ending = ".geojson";

//does not work, do not use
/*function initData() {
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
