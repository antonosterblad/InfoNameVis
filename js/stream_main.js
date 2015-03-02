    var n = 10, // number of layers
        m = 2014- 1998; // number of samples per layer

  //  var data1 = topListFull;
    //console.log(topListFull); 
    //stream_layers(n, m);
    var data0 = topListFull;
    //stream_layers(n, m);

    console.log(data0);

    // var colors = d3.range(n).map(function() { return d3.interpolateRgb("#aad", "#556")(Math.random()); });

    var streamgraph = streamgraphChart()
        .margin({top: 10, right: 0, bottom: 10, left: 0})
        .color(function(d, i) { return colorbrewer.Set3[10][i]; }) // use same colors for both data sets
        .transitionDuration(1500)
        .on("mouseover", fade(.2))
        .on("mouseout", fade(1));

    d3.select("#stream")
        .datum(data0)
        .call(streamgraph);

    function transition() {
        d3.select("#stream")
                .datum(function() {
                    var d = data1;
                    data1 = data0;
                    return data0 = d;
                })
                .call(streamgraph);
    }

    function fade(opacity) {
        return function(g, i) {
            streamgraph.layers()
                .filter(function(h, j) {
                    return j != i;
                })
                .transition(1000)
                  .style("opacity", opacity);
        }
    }
