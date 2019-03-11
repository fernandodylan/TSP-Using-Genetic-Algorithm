var plotly = require('plotly')("***********", "***************");

var trace1 = {
  x: [1, 3, 3, 1, 1],
  y: [1, 1, 8, 8, 1],
  type: "scatter"
};



var data = [trace1];
var graphOptions = {filename: "TSP Genetic Algorithm", fileopt: "overwrite"};

plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});
