//Bar Chart

    var bcDiv = $("#bar");
    var key = function(d) { return d.name; };

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = bcDiv.width() - margin.right - margin.left,
        height = bcDiv.height() - margin.top - margin.bottom;

    //Chart axis scales    
    var xScale = d3.scale.ordinal().rangeRoundBands([0, width], .5),
        yScale = d3.scale.linear().range([0, height]),
        xAxis = d3.svg.axis().scale(xScale).orient("bottom"),
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    //Create SVG element
    var svg = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "bars");

    //Add x axis and title.
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    //Add y axis and title.
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text");


function updateBar() {

    //Define the domain of the bar chart        
    xScale.domain(topList.map(function(d) { return d.name; }));
    yScale.domain([d3.max(topList, function(d) { return d.total; }),0]);

    //Add the bars.
    var bar = svg.selectAll(".bars")
    .data(topList, key);

    // Update existing element
    bar.attr("class", "update");    

    //New bar chart data
    bar.enter().append("rect")
    .style("fill", function(d, i) { return colorbrewer.Set3[10][i]; })
    .attr("x", function(d) { return xScale(d.name); })
    .attr("width", xScale.rangeBand())
    .attr("y", function(d) { return height-yScale(d.total); })
    .attr("height", function(d) { return yScale(d.total); })
    .attr("class", "bars");

    //Transition
    bar.transition().duration(function (d, i) { return i*500; })
        .ease("elastic")
        .delay(function (d, i) { return i*100; })
        .attr("y", function (d, i) { return yScale(d.total); })
        .attr("height", function (d) { return height-yScale(d.total); });


    //Remove existing bars
    bar.exit().remove();

    // Update the Axis
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    var yAxis = d3.svg.axis().scale(yScale).orient("left");

    svg.selectAll("g.yScale.axis")
        .call(yAxis)

    svg.selectAll("g.xScale.axis")
        .call(xAxis);


};
