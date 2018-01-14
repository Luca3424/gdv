//array with all geojsons of Dec 16
var data_16 = [data_16_00, data_16_01, data_16_02, data_16_03, data_16_04, data_16_05, data_16_06, data_16_07,
    data_16_08, data_16_09,
    data_16_10, data_16_11, data_16_12, data_16_13, data_16_14, data_16_15, data_16_16, data_16_17, data_16_18, data_16_19,
    data_16_20, data_16_21, data_16_22, data_16_23];

//array stores Objects including sorted traffic data
//Index is according to time, e. g. data_intermediate[15] -> 3PM
var data_intermediate = new Array(24);
/* var data_intermediate = [
{ //data for midnight
normal: ...,
erhoeht ...,
staugefahr: ...,
stau: ...,
nicht_ermittelbar: ...,
other: ...
},
{ //data for 1AM
normal: ...,
erhoeht ...,
staugefahr: ...,
stau: ...,
nicht_ermittelbar: ...,
other: ...
},
.... //continues for all hours
];
*/

//two dimensional Array: inner Array stores objects of a single counted "verkehrsstatus" at a given time
//outer Array stores all times and their respective number for the different "verkehrsstatus"
//data_reformatted[0] -> array of Objects which store the number of streets with "normale Verkehrsbelastung"
//data_reformatted[0][6] -> object which stores the number of streets with "normale Verkehrsbelastung" at 6AM
//data_reformatted[0][6] returns two values: x (time) and y (number)
//length = 6 different "verkehrsstatus"
var data_reformatted = new Array(6);
/* var data_reformatted = [
[ //data for "normales Verkehrsaufommen"
//y is the number counted with count()
{ x:0, y: ...}, //midnight
{ x:1, y: ...}, //1AM
{ x:2, y: ...}, //2AM
... //continues for all hours
],
[ //data for "erhoehte Verkehrsbelastung"
{ x:0, y: ...}, //midnight
{ x:1, y: ...}, //1AM
{ x:2, y: ...}, //2AM
... //continues for all hours
],
.... //repeats for all different status
];
*/


//turns data_reformatted into two-dimensional Array
function init_data_formatted() {
    for (var i = 0; i < 6; i++) {
        data_reformatted[i] = new Array(24); //24 different times
    }
}

function count(data) {
//initializing all vars with 0
    var normal = 0,
        erhoeht = 0,
        staugefahr = 0,
        nicht_ermittelbar = 0,
        stau = 0,
        other = 0;

    //iterates over all features in the geojson
    for (var i = 0; i <= 108; i++) {
        //counts all instances of the different "verkehrsstatus" of all roads at a given time
        switch (data.features[i].properties.verkehrsstatus) {
            case 'normales Verkehrsaufkommen':
                normal++;
                break;
            case 'erhoehte Verkehrsbelastung':
                erhoeht++;
                break;
            case 'Staugefahr':
                staugefahr++;
                break;
            case 'Stau':
                stau++;
                break;
            case 'aktuell nicht ermittelbar':
                nicht_ermittelbar++;
                break;
            default:
                other++;
                break;
        }//switch
    }//for

//returns Object with traffic data
    return {
        normal: normal,
        erhoeht: erhoeht,
        staugefahr: staugefahr,
        stau: stau,
        nicht_ermittelbar: nicht_ermittelbar,
        other: other
    };
}


function reformatData() {
    var verkehrsstatus = new Array(6);

    for (var i = 0; i < 24; i++) {
        verkehrsstatus = [
            data_intermediate[i].normal,
            data_intermediate[i].erhoeht,
            data_intermediate[i].staugefahr,
            data_intermediate[i].stau,
            data_intermediate[i].nicht_ermittelbar,
            data_intermediate[i].other
        ];

        for (var j = 0; j < 6; j++) {
            data_reformatted[j][i] = {
                x: i,
                y: verkehrsstatus[j]
            };
        }//inner for
    }//outer for
}//function

function formatData() {
//iterates over all geojson elements of data_16
    for (var i = 0; i <= 23; i++) {
        data_intermediate[i] = count(data_16[i]);
    }

    reformatData();
}


init_data_formatted();
formatData();

//Width and height
var w = 500;
var h = 300;

//Set up stack method
var stack = d3.layout.stack();

//Data, stacked
stack(data_reformatted);

//Set up scales
var xScale = d3.scale.ordinal()
    .domain(d3.range(data_reformatted[0].length))
    .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
    .domain([0,
        d3.max(data_reformatted, function (d) {
            return d3.max(d, function (d) {
                return d.y0 + d.y;
            });
        })
    ])
    .range([0, h]);

//Easy colors accessible via a 10-step ordinal scale
var colors = d3.scale.category10();

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Add a group for each row of data
var groups = svg.selectAll("g")
    .data(data_reformatted)
    .enter()
    .append("g")
    .style("fill", function (d, i) {
        return colors(i);
    });

// Add a rect for each data value
var rects = groups.selectAll("rect")
    .data(function (d) {
        return d;
    })
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i);
    })
    .attr("y", function (d) {
        return yScale(d.y0+10);
    })
    .attr("height", function (d) {
        return yScale(d.y);
    })
    .attr("width", xScale.rangeBand());


/*//array with all geojsons of Dec 16
var data_16 = [data_16_00, data_16_01, data_16_02, data_16_03, data_16_04, data_16_05, data_16_06, data_16_07, data_16_08, data_16_09,
    data_16_10, data_16_11, data_16_12, data_16_13, data_16_14, data_16_15, data_16_16, data_16_17, data_16_18, data_16_19,
    data_16_20, data_16_21, data_16_22, data_16_23];

//array stores Objects including sorted traffic data
//Index is according to time, e. g. data_intermediate[15] -> 3PM
var data_intermediate = new Array(24);
/* var data_intermediate = [
    { //data for midnight
        normal: ...,
        erhoeht ...,
        staugefahr: ...,
        stau: ...,
        nicht_ermittelbar: ...,
        other: ...
     },
     { //data for 1AM
        normal: ...,
        erhoeht ...,
        staugefahr: ...,
        stau: ...,
        nicht_ermittelbar: ...,
        other: ...
     },
     .... //continues for all hours
 ];
*/

//two dimensional Array: inner Array stores objects of a single counted "verkehrsstatus" at a given time
//outer Array stores all times and their respective number for the different "verkehrsstatus"
//data_reformatted[0] -> array of Objects which store the number of streets with "normale Verkehrsbelastung"
//data_reformatted[0][6] -> object which stores the number of streets with "normale Verkehrsbelastung" at 6AM
//data_reformatted[0][6] returns two values: x (time) and y (number)
//length = 6 different "verkehrsstatus"
/*
var data_reformatted = new Array(6);
/* var data_reformatted = [
    [ //data for "normales Verkehrsaufommen"
      //y is the number counted with count()
        { x:0, y: ...}, //midnight
        { x:1, y: ...}, //1AM
        { x:2, y: ...}, //2AM
        ... //continues for all hours
     ],
     [ //data for "erhoehte Verkehrsbelastung"
        { x:0, y: ...}, //midnight
        { x:1, y: ...}, //1AM
        { x:2, y: ...}, //2AM
        ... //continues for all hours
     ],
     .... //repeats for all different status
 ];
*/
/*
var data_test;


//turns data_reformatted into two-dimensional Array
function init_data_formatted(){
    for(var i=0; i<6; i++){
        data_reformatted[i] = new Array(24); //24 different times
    }
}

function count(data) {
    //initializing all vars with 0
    var normal = 0,
        erhoeht = 0,
        staugefahr = 0,
        nicht_ermittelbar = 0,
        stau = 0,
        other = 0;

    //iterates over all features in a geojson
    for (var i = 0; i <= 108; i++) {
        //counts all instances of the different "verkehrsstatus" of all roads at a given time
        switch (data.features[i].properties.verkehrsstatus) {
            case 'normales Verkehrsaufkommen':
                normal++;
                break;
            case 'erhoehte Verkehrsbelastung':
                erhoeht++;
                break;
            case 'Staugefahr':
                staugefahr++;
                break;
            case 'Stau':
                stau++;
                break;
            case 'aktuell nicht ermittelbar':
                nicht_ermittelbar++;
                break;
            default:
                other++;
                break;
        }//switch
        //console.log(i);
    }//for

    //returns Object with traffic data
    return {
        normal: normal,
        erhoeht: erhoeht,
        staugefahr: staugefahr,
        stau: stau,
        nicht_ermittelbar: nicht_ermittelbar,
        other: other
    };
}

function reformatData() {
    var verkehrsstatus = new Array (6);

    for (var i = 0; i < 24; i++) {
        verkehrsstatus = [
            data_intermediate[i].normal,
            data_intermediate[i].erhoeht,
            data_intermediate[i].staugefahr,
            data_intermediate[i].stau,
            data_intermediate[i].nicht_ermittelbar,
            data_intermediate[i].other
        ];

        for(var j=0; j<6; j++){
            data_reformatted[j][i] = {
                x: i,
                y: verkehrsstatus[j]
            };
        }//inner for
    }//outer for
}//function

function formatData() {
    //iterates over all geojson elements of data_16
    for (var i = 0; i <= 23; i++) {
        data_intermediate[i] = count(data_16[i]);
        //console.log(i);
    }

    reformatData();

    //reformats into final format
    //var stack = d3.stack();
    d3.stack()(data_reformatted);
    draw();
}

function draw(){
//Width and height
    var w = 500;
    var h = 300;


//Set up scales
    var xScale = d3.scaleBand()
        .domain(d3.range(data_reformatted[0].length))
        .bandwidth([0, w], 0.05);

    var yScale = d3.scaleLinear()
        .domain([0,
            d3.max(data_reformatted, function (d) {
                return d3.max(d, function (d) {
                    return d.y0 + d.y;
                });
            })
        ])
        .range([0, h]);

//Easy colors accessible via a 10-step ordinal scale
    var colors = d3.scaleOrdinal(d3.schemeCategory10);

//Create SVG element
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

// Add a group for each row of data
    var groups = svg.selectAll("g")
        .data(data_reformatted)
        .enter()
        .append("g")
        .style("fill", function (d, i) {
            return colors(i);
        });

    var rects = groups.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return yScale(d.y0);
        })
        .attr("height", function (d) {
            return yScale(d.y);
        })
        .attr("width", xScale.bandwidth());
}
/*
function drawOverview() {
    for (var i = 0; i < 24; i++) {

    }

}

var margin = {top: 20, right: 50, bottom: 30, left: 50},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scaleOrdinal()
    .range([0, width], .35);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var svg = d3.select("body").append("overview_16")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(data_intermediate[0].map(function (d) {
    return d.x;
}));

y.domain([0,
    d3.max(data_intermediate[data_intermediate.length - 1],
        function (d) {
            return d.y0 + d.y;
        })
])
    .nice();

var layer = svg.selectAll(".stack")
    .data(data_intermediate)
    .enter().append("g")
    .attr("class", "stack");

layer.selectAll("rect")
    .data(function (d) {
        return d;
    })
    .enter().append("rect")
    .attr("x", function (d) {
        return x(d.x);
    })
    .attr("y", function (d) {
        return y(d.y + d.y0);
    })
    .attr("height", function (d) {
        return y(d.y0) - y(d.y + d.y0);
    })
    .attr("width", x.range());

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


/*data_test = [
    [
        {x: '0', y: 20},
        {x: '1', y: 25}
    ],
    [
        {x: '0', y: 5},
        {x: '1', y: 10}
    ],
    [
        {x: '0', y: 10},
        {x: '1', y: 20}
    ]
];

var data = [
    {month: 'Jan', A: 20, B: 5, C: 10},
    {month: 'Feb', A: 30, B: 10, C: 20}
];

var xData = ["A", "B", "C"];

document.getElementById("overview_16_00").setAttribute("width", "10");

var margin = {top: 20, right: 50, bottom: 30, left: 50},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scaleOrdinal()
    .range([0, width], .35);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var color = d3.schemeCategory20;

var xAxis = d3.axisBottom()
    .scale(x);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var dataIntermediate = xData.map(function (c) {
    return data.map(function (d) {
        return {x: d.month, y: d[c]};
    });
});

var keys = ['Jan', 'Feb'];

var dataStackLayout = d3.stack().keys(keys)(dataIntermediate);

x.domain(dataStackLayout[0].map(function (d) {
    return d.x;
}));

y.domain([0,
    d3.max(dataStackLayout[dataStackLayout.length - 1],
        function (d) { return d.y0 + d.y;})
])
    .nice();

var layer = svg.selectAll(".stack")
    .data(data_test)
    .enter().append("g")
    .attr("class", "stack");

layer.selectAll("rect")
    .data(function (d) {
        return d;
    })
    .enter().append("rect")
    .attr("x", function (d) {
        return x(d.x);
    })
    .attr("y", function (d) {
        return y(d.y + d.y0);
    })
    .attr("height", function (d) {
        return y(d.y0) - y(d.y + d.y0);
    })
    .attr("width", x.range());

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

//Left Position for X
function xScale(date) {
    switch (date) {
        case 'Jan':
            return 40;
        case 'Feb':
            return 0;
    }
}

/*

var rects = groups.selectAll("rect")
    .data(function(d){ return d;})
    .enter()
    .append("rect"),
    .attr("x", function(d, i){
        return xScale(i);
     })
     .attr("y", function(d){
        return xScale(d.y0);
     })
     .attr("height", function(d){
        return xScale(d.y);
     })
     .attr("width", xScale.range());

 */
/*
//Top Position for Y
y = yScale(d.y + d.y0);

//Bottom Y - TopY = Height of the element
height=yScale(d.y0) - yScale(d.y + d.y0);

// Width as per rangeBand()
width= xScale.range();*/

/*var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var parseDate = d3.utcParse("%Y-%m-%dT%H:%M:%S");

var x = d3.scaleTime()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);


var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

/*
var area = d3.area()
    .x(function(d) { return x(d[23].features.properties.auswertezeit); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


data_16.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
});

x.domain(d3.extent(data_16, function() { data_16[0].features.properties.auswertezeit }));
y.domain(["aktuell nicht ermittelbar", d3.max("erhöhtes Verkehrsaufkommen")]);

svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price ($)");

/*var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

var stack = d3.stack();

var area = d3.area()
    .x(function(d, i) { return x(d.data.date); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function drawChart(data){
    if (error) throw error;

    var keys = data.columns.slice(1);

    x.domain(d3.extent(data, function(d) { return d.date; }));
    z.domain(keys);
    stack.keys(keys);

    var layer = g.selectAll(".layer")
        .data(stack(data))
        .enter().append("g")
        .attr("class", "layer");

    layer.append("path")
        .attr("class", "area")
        .style("fill", function(d) { return z(d.key); })
        .attr("d", area);

    layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
        .append("text")
        .attr("x", width - 6)
        .attr("y", function(d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
        .attr("dy", ".35em")
        .style("font", "10px sans-serif")
        .style("text-anchor", "end")
        .text(function(d) { return d.key; });

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"));
};

function type(d, i, columns) {
    d.date = parseDate(d.date);
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = d[columns[i]] / 100;
    return d;
*/

/*d3.tsv("data.tsv", type, function(error, data) {
    if (error) throw error;

    var keys = data.columns.slice(1);

    x.domain(d3.extent(data, function(d) { return d.date; }));
    z.domain(keys);
    stack.keys(keys);

    var layer = g.selectAll(".layer")
        .data(stack(data))
        .enter().append("g")
        .attr("class", "layer");

    layer.append("path")
        .attr("class", "area")
        .style("fill", function(d) { return z(d.key); })
        .attr("d", area);

    layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
        .append("text")
        .attr("x", width - 6)
        .attr("y", function(d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
        .attr("dy", ".35em")
        .style("font", "10px sans-serif")
        .style("text-anchor", "end")
        .text(function(d) { return d.key; });

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"));
});

function type(d, i, columns) {
    d.date = parseDate(d.date);
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = d[columns[i]] / 100;
    return d;
}*/