//Bar Chart
function bar() {

    var self = this; // for internal d3 functions

    var bcDiv = $("#bar");

    //fetch data
    var topData = topList;

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = bcDiv.width() - margin.right - margin.left,
        height = bcDiv.height() - margin.top - margin.bottom;

    //chart axis scales    
    var xScale = d3.scale.ordinal().rangeRoundBands([0, width], .5);
    var yScale = d3.scale.linear().range([0, height]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    //define the domain of the bar chart        
    xScale.domain(topData.map(function(d) { return d.name; }));
    yScale.domain([0, d3.max(topData, function(d) { return d.total; })]);

    //Create SVG element
    var svg = d3.select("#bar").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        // Add x axis and title.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add y axis and title.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text");

        // Add the bars.    
        svg.selectAll("bar")
            .data(topData)
            .enter().append("rect")
            .style("fill", "steelblue")
            .attr("x", function(d) { return xScale(d.name); })
            .attr("width", xScale.rangeBand())
            .attr("y", function(d) { return yScale(d.total); })
            .attr("height", function(d) { return height - yScale(d.total); })
            .transition()
            .ease("elastic")
            .duration(function (d, i) { return i*500; })
            .delay(function (d, i) { return i*100; })
            .attr("y", function (d, i) { return height-yScale(d.total); })
            .attr("height", function (d) { return yScale(d.total); });
};
