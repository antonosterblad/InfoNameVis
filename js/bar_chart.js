/* Bar Chart - Instance variables */
    var data = topList;
    var bcDiv = $("#bar");

    var margin = {top: 10, right: 20, bottom: 70, left: 40},
    width = bcDiv.width() - margin.right - margin.left,
    height = bcDiv.height() - margin.top - margin.bottom;

    // Set chart axis scales    
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .5),
        y = d3.scale.linear().range([0, height]),
        xAxis = d3.svg.axis().scale(x).orient("bottom"),
        yAxis = d3.svg.axis().scale(y).orient("left");

    // Create SVG element
    var svg = d3.select("#bar").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //initialize tooltip
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
        return "<span style='color:white'>" + d.name + "</span>";
    })

    //svg.call(tip);

    createChart();

function createChart() {
    /* Initate the bar chart first time the application runs */

    // Define the domain of the bar chart        
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0,d3.max(data, function(d) { return d.total; })]);

    // Add x-axis label 
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add y-axis label 
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text");
};        


function updateBar(data2) {
    /* Update the bar chart data 
    every time there is any interaction with the control panel or timeline */

    // Define the domain of the bar chart        
    x.domain(data2.map(function(d) { return d.name; }));
    y.domain([d3.max(data2, function(d) { return d.total; }),0]);

    var tran = d3.select("#bar").transition();

    // Change x-axis label
    tran.select("g.x.axis")
        .duration(1000)
        .call(xAxis);

    // Change the y-axis label      
    tran.select("g.y.axis")
        .duration(1000)
        .call(yAxis);   

    // Add the bars
    var bar = svg.selectAll(".bar")
    .data(data2);

    // Update existing elements
    bar.attr("bar", "update");

    // New bar chart data
    bar.enter().append("rect")
        .attr("class", "bar")
        .style("fill", function(d, i) { return colorbrewer.Set3[10][i]; })
        svg.selectAll(".bar").attr("stroke-width", 0)
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return height-y(d.total); })
        .attr("height", function(d) { return y(d.total); })
        .on('mouseover', function(d) {
            fadeBar(d.name);
        })
        .on('mouseout', function() {
            svg.selectAll(".bar").style("opacity", 1.0);
            svg.selectAll(".bar").attr("stroke-width", 0);
        });

    // Transition
    bar.transition().duration(function (d, i) { return i*500; })
        .ease("elastic")
        .delay(function (d, i) { return i*100; })
        .attr("y", function (d, i) { return y(d.total); })
        .attr("height", function (d) { return height-y(d.total); });

    bar.enter().append("text")
        .text(function(d) {
            return d.total;
        })
        .attr("x", function(d, i) {
            return i * (bcDiv.width() / data2.length);
        })
        .attr("y", function(d){ return y(d) + data2.height/2; } )
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black")
        .attr("text-anchor", "middle");

    // Remove existing bars
    bar.exit().remove();

};
    
//method for selecting features of other components
function fadeBar(value) {
    svg.selectAll(".bar").transition(1000).delay(50).style("opacity", function(d) {
        if(d.name == value) {
            return 1.0;
        }
        else {
            return 0.3;
        }
    });
    svg.selectAll(".bar").attr("stroke-width", function(d) {
        if(d.name == value) {
            return 1;
        }
        else {
            return 0;
        }
    });
};
