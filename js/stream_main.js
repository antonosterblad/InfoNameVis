    var n = 10, // number of layers
        m = 2014- 1998; // number of samples per layer

    var arr = new Array();
    var drama = 1;
  //  convertData();

    function addDrama(i,key) {
        
        if(drama != 0) {
            var val = 1;
            if(key != "2004") {
                var previousYear = topListFull[i][parseInt(key) - 1];
                val = parseFloat(topListFull[i][key])/previousYear;
            }

            return Math.pow(val, drama);
        } else {
            return 1;
        }
       
    }

    function convertData(topList1) {
        arr = [];
        for(var i in topList1) {
            arr.push(new Array());
            
            //arr[i] = topListFull[i].tilltalsnamn;
          //  console.log(arr[i]);

            var j = 0;
            for(var key in data[topList1[i].id]) {
               // console.log(key);
                if(key != "tilltalsnamn") {
                    arr[i].push(new Object());
                    arr[i][j].x = j;
                   // console.log(data[topList[i].id][key]);

                    if(!isNaN(parseInt(data[topList1[i].id][key]))) {
                        arr[i][j].y = parseInt(data[topList1[i].id][key]) * addDrama(i,key);  
                    } else {
                        arr[i][j].y = 0;
                    }
                 
                    // arr[i][j].y1 = parseFloat(topListFull[i][key])*Math.random();  
                    j++;         
                } 
                
            }
        }
        
       // console.log(arr);

        return d3.range(n).map(function() {
            return arr;
        });

      // return arr;
       
    }

  //  var data1 = topListFull;
    //console.log(topListFull); 
    //stream_layers(n, m);
    var data0 = convertData();//stream_layers(n, m);

   //console.log(data0);

    // var colors = d3.range(n).map(function() { return d3.interpolateRgb("#aad", "#556")(Math.random()); });

    var streamgraph = streamgraphChart()
        .margin({top: 10, right: 0, bottom: 10, left: 0})
        .color(function(d, i) { return colorbrewer.Set3[12][i]; }) // use same colors for both data sets
        .transitionDuration(1500)
        .on("mouseover", fade(.2))
        .on("mouseout", fade(1))
        .on("click", function(d, i) {
            console.log(topListFull[i].tilltalsnamn);
        });

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

    function updateStream(topList) {
         d3.select("#stream")
                .data(function() {                    
                    return convertData(topList);
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
