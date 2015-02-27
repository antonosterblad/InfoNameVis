//Bar Chart

    var self = this; // for internal d3 functions

    var bcDiv = $("#bar");

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = bcDiv.width() - margin.right - margin.left,
        height = bcDiv.height() - margin.top - margin.bottom;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .5);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    
    //initialize tooltip
    /*var tip = d3.select("body").append("tip")
        .attr("class", "tooltip")
        .style("opacity", 0);*/

    var svg = d3.select("#bar").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //svg.call(tip);

    //Load data
    d3.csv("data/pojkarTest.csv", function(error, data) {
        //self.data = data;

        data.forEach(function(d) {
            d.tilltalsnamn = d.tilltalsnamn;
            d.value = +d.value;
        });
        
        //define the domain of the bar chart        
        x.domain(data.map(function(d) { return d.tilltalsnamn; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);
        
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
            .data(data)
            .enter().append("rect")
            .style("fill", "steelblue")
            .attr("x", function(d) { return x(d.tilltalsnamn); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); });
    });














