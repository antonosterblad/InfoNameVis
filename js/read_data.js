var self = this;
var sumYear = new Array();
var topList = new Array();
var topListFull = new Array();

loadData(2);

function loadData(girls){

	var dataset;
	if(girls == 2) {
		dataset = "data/alla0514.csv";		
	} else if(girls) {
		dataset = "data/flickor0514.csv"; console.log("flickor");
	} else {
		dataset = "data/pojkar0514.csv";	console.log("pojkar");
	}

	d3.csv(dataset, function(data) {
	    self.data = data;
	    sum();
		getTopList(10);
		getTopListFull();
		//updateBar(topList);
		//updateStream();
	});	

	updateData();
};

// Calculate the sum of all years
function sum(n,m) {
	sumYear = [];
	var arg = arguments.length;
	//console.log(arg);

	for(var i = 0; i < data.length; i++) {
		sumYear.push(new Object());
		sumYear[i].name = data[i].tilltalsnamn;
		sumYear[i].total = 0;
	}

	switch(arg) {
		case 1:
			//console.log(1);
			for(var i = 0; i < data.length; i++) {
				// Check if integer
				if(isInt(parseInt(data[i][n])) ) {
	          		sumYear[i].total += parseInt(data[i][n]);
	          	}			      
	        }
	        break;

        case 2:
        	//console.log(2);
        	for(var i = 0; i < data.length; i++) {

				for( var j = n; j <= m; j++ ) {
					// Check if integer
					if(isInt(parseInt(data[i][j])) ) {
		          		sumYear[i].total += parseInt(data[i][j]);
					}       
		    	}			      
	        }
        	break;

		default:
			//console.log("default");
			for(var i = 0; i < data.length; i++) {

				for( var key in data[0] ) {
					// Check if integer
					if(isInt(parseInt(data[i][key])) ) {
		          		sumYear[i].total += parseInt(data[i][key]);
					}       
		    	}
			}
			break;

	}

	//console.log(sumYear);
};

// IS INT? FUNCTION. 
// http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
};

// SORTING FUNCTION MODIFIED VERSION OF
// http://stackoverflow.com/questions/1129216/sorting-objects-in-an-array-by-a-field-value-in-javascript
function compare(a,b) {
  if (a.total < b.total)
     return 1;
  if (a.total > b.total)
    return -1;
  return 0;
};

function getTopList(n) {
	// Sort list with respect to total value

  var temp = $.extend([], temp, sumYear);	

	temp.sort(compare);

	for(var i = 0; i < n; i++){
		topList[i] = temp[i];
	}

	//console.log(topList);
};

function getTopListFull() {
	var topListTemp = new Array();

	// Extract all years
	for(var i = 0; i < self.data.length; i++) {
		for(var j = 0; j < topList.length; j++) {
			if(self.data[i].tilltalsnamn == topList[j].name) {
				topListTemp.push(self.data[i]);
			}
		}
	}

	// Sort based on the other topList
	for(var i = 0; i < topList.length; i++) {
		for(var j = 0; j < topListTemp.length; j++) {
			if(topList[i].name == topListTemp[j].tilltalsnamn) {
				topListFull[i] = topListTemp[j];

				break;
			}
		}
	}

	// topListFull.sort(compare);

}