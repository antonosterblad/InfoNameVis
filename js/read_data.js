var self = this;
var sumYear = new Array();
var topList = new Array();

   //Load data
d3.csv("data/flickor9814.csv", function(data) {
    // data[0][2003] or data[0]["2003"]
   // console.log(data["2003"]);
    self.data = data;
  	  //sum();
    //sum(2012);
    sum(2011, 2012);
    getTopList(10);
}); 

// Calculate the sum of all years
function sum(n,m) {
	var arg = arguments.length;
	//console.log(arg);

	for(var i = 0; i < data.length; i++) {
		sumYear.push(new Object());
		sumYear[i].name = data[i].tilltalsnamn;
		sumYear[i].total = 0;
	}

	switch(arg) {
		case 1:
			console.log(1);
			for(var i = 0; i < data.length; i++) {
				// Check if integer
				if(isInt(parseInt(data[i][n])) ) {
	          		sumYear[i].total += parseInt(data[i][n]);
	          	}			      
	        }
	        break;

        case 2:
        	console.log(2);
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
			console.log("default");
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

	console.log(sumYear);
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
	sumYear.sort(compare);

	for(var i = 0; i < n; i++){
		topList[i] = sumYear[i];
	}

	//console.log(topList);
};