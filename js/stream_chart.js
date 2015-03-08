function streamgraphChart() {

    var streamDiv = $("#stream");
    var streamWidth = streamDiv.width();
    var streamHeight = streamDiv.height();

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = streamWidth,
        height = streamHeight,
        transitionDuration = 1000,
       // color = function() { return d3.interpolateRgb("#aad", "#556")(Math.random()); },
        eventHandlers = [],
        layers = undefined,
        layersTransition = undefined;

    var streamgraph =  d3.layout.stack().offset("wiggle");

    var x = d3.scale.linear()
    .domain([0, 10])
    .range([0, streamWidth]);

    function make_x_axis() {     
        return d3.svg.axis()
        .scale(x)
        .orient("bottom").ticks(9);
    }

    
    function chart(selection) {
        selection.each(function(data) {
         
            // Compute the streamgraph.
            data = streamgraph(data);
       
            
            var mx = data[0].length - 1, // assumes that all layers have same # of samples & that there is at least one layer
                my = d3.max(data, function(d) {
                    return d3.max(d, function(d) {
                       
                         // console.log(d);
                        return d.y0 + d.y;
                    });
                });
            console.log(my);
            // Select the svg element, if it exists.
            var svg = d3.select(this).selectAll("svg").data([data]);
          
            // Otherwise, create the skeletal chart.
            var gEnter = svg.enter().append("svg").append("g");

            // Update the outer dimensions.
            svg .attr("width", width)
                .attr("height", height);

            // Update the inner dimensions.
            var g = svg.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Update the streamgraph
            var availableWidth = width - margin.left - margin.right,
                availableHeight = height - margin.top - margin.bottom;

            svg.append("g")         
                .attr("class", "grid")
                .attr("transform", "translate(0," + height + ")")
                .call(make_x_axis()
                    .tickSize(-height, 0, 0)
                    .tickFormat("")
                );

            var area = d3.svg.area().defined(function(d) { 
                    
                    return !isNaN(d.y0); })
                .x(function(d) { return d.x * availableWidth / mx; })
                .y0(function(d) { 
                    return d.y0 * availableHeight / my; 
                })
                .y1(function(d) { 
                    return  (d.y + d.y0) * availableHeight / my; 
                })
                ; //.interpolate("monotone");

            layers = g.selectAll("path").data(data);

            var enterPath = layers.enter().append("path");
            eventHandlers.forEach(function(d){
                enterPath.on(d.type, d.handler);
            });

            layers.exit().remove();

            layersTransition = layers.transition(0);
            layersTransition.style("fill", color).transition().duration(transitionDuration).attr("d", area);
        });
    }

    chart.on = function(_) {
        // TODO needs further work
        eventHandlers.push({
            "type": arguments[0],
            "handler": arguments[1]
        });

        return chart;
    }

    chart.color = function(_) {
        if (!arguments.length) return color;
        color = _;
        return chart;
    };

    chart.transitionDuration = function(_) {
        if (!arguments.length) return transitionDuration;
        transitionDuration = _;
        return chart;
    };

    chart.layers = function() {
        return layers;
    }

    chart.layersTransition = function() {
        return layersTransition;
    }

    chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };

    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
    };

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        return chart;
    };

    return chart;
}