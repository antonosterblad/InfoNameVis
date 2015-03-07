//Bar Chart
    var data = topList;
    var bcDiv = $("#bar");
    var key = function(d) { return d.name; };

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = bcDiv.width() - margin.right - margin.left,
    height = bcDiv.height() - margin.top - margin.bottom;

    //Chart axis scales    
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .5),
        y = d3.scale.linear().range([0, height]),
        xAxis = d3.svg.axis().scale(x).orient("bottom"),
        yAxis = d3.svg.axis().scale(y).orient("left");

    //Create SVG element
    var svg = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //.attr("class", "bars");

function createBar() {

    //Define the domain of the bar chart        
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0,d3.max(data, function(d) { return d.total; })]);

    //Add x-axis label 
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    //Add y-axis label 
    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text");

    //Add the bars
    var bar = svg.selectAll(".bars")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });

    bar.selectAll("rect")
        .data(function(d) { return d.total; })
        .enter().append("rect")
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) { return height-yScale(d.total); })
        .attr("height", function(d) { return yScale(d.total); })
        .style("fill", function(d, i) { return colorbrewer.Set3[10][i]; });

}        


function updateBar(data2) {

    //Define the domain of the bar chart        
    x.domain(data2.map(function(d) { return d.name; }));
    y.domain([d3.max(data2, function(d) { return d.total; }),0]);

    var tran = d3.select("#bar").transition();

    // change x-axis label
    tran.select("g.x.axis")
        .duration(1000)
        .call(xAxis);

    // change the y-axis label      
    tran.select("g.y.axis")
        .duration(1000)
        .call(yAxis);   

    //Add the bars
    var bar = svg.selectAll(".bars")
    .data(data2);

    // Update existing element
    bar.attr("class", "update");

    //Remove existing bars
    bar.exit().remove();

    //New bar chart data
    bar.enter().append("rect")
    .style("fill", function(d, i) { return colorbrewer.Set3[10][i]; })
    .attr("x", function(d) { return x(d.name); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return height-y(d.total); })
    .attr("height", function(d) { return y(d.total); })
    .attr("class", "bars");

    //Transition
    bar.transition().duration(function (d, i) { return i*500; })
        .ease("elastic")
        .delay(function (d, i) { return i*100; })
        .attr("y", function (d, i) { return y(d.total); })
        .attr("height", function (d) { return height-y(d.total); });


};
