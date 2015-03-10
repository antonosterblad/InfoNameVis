var leftButtonDown = false;
var selectedButtons = new Array();
var rightDrag = false;
var gender = 1;	
var historyList = new Array();

$(window).load(function () {
	drama = 0;
	document.getElementById("myRange").value = drama;
	updateData();
});

$(document).mousedown(function(e){
    // Left mouse button was pressed, set flag
    if(e.which === 1) leftButtonDown = true;
    
});
$(document).mouseup(function(e){
    // Left mouse button was released, clear flag
    if(e.which === 1) leftButtonDown = false;  

});

$(".year-button").click(function (e) {
	//selectedButtons = [];
	if(selectedButtons.length != 1) {
		selectedButtons = [];		
		selectedButtons.push(parseInt($(this).val()));
	} else if(selectedButtons.length == 1) {
		if(selectedButtons[0] != parseInt($(this).val())) {			
			selectedButtons = [];
			selectedButtons.push(parseInt($(this).val()));
		} else {
			selectedButtons = [];
		}
	}
	//console.log(selectedButtons);
	showSelection();
	updateData();
	//addHistory();

}).hover(function (e) {
	if(e.which === 1 && leftButtonDown) {
		
		if(selectedButtons.length == 1) {
			if(selectedButtons[0] > parseInt($(this).val())) {
				rightDrag = false;
			} else {
				rightDrag = true;
			}
		}

		if(selectedButtons.length > 0) {
			
			if(rightDrag) {
				if(parseInt($(this).val()) > selectedButtons[selectedButtons.length - 1]) {
					selectedButtons.push(parseInt($(this).val()));

				} else if (parseInt($(this).val()) < selectedButtons[selectedButtons.length - 1]) {
					if(parseInt($(this).val()) < selectedButtons[0]) {
						var temp = selectedButtons[0];
						selectedButtons = [];
						selectedButtons.push(temp);
						selectedButtons.push(parseInt($(this).val()));
						rightDrag = false;

					} else {
						selectedButtons.pop();

					}
				} 
			} else {
				if(parseInt($(this).val()) < selectedButtons[selectedButtons.length - 1]) {
					selectedButtons.push(parseInt($(this).val()));

				} else if (parseInt($(this).val()) > selectedButtons[selectedButtons.length - 1]) {
					if(parseInt($(this).val()) > selectedButtons[0]) {
						var temp = selectedButtons[0];
						selectedButtons = [];
						selectedButtons.push(temp);
						selectedButtons.push(parseInt($(this).val()));
						rightDrag = false;

					} else {
						selectedButtons.pop();
					}
				} 
			}

		} else {
			selectedButtons.push(parseInt($(this).val()));
		}

		// If space between numbers
		var first = selectedButtons[0];
		var last = selectedButtons[selectedButtons.length - 1];
		if(first < last) {
			selectedButtons = [];
			for(var i = first; i <= last; i++) {
				selectedButtons.push(i);
			}
	
		} else {
			selectedButtons = [];
			for(var i = first; i >= last; i--) {
				selectedButtons.push(i);
			}

		}

		//console.log(selectedButtons);
	}
 
})
.mousemove( function() {
	showSelection();  
})
.mouseup( function() {
	showSelection();
	updateData();	
	//addHistory();
});


function showSelection() {
	$(".year-button").each( function() {
		if( jQuery.inArray( parseInt($(this).val()), selectedButtons ) != -1 ) {
			$(this).addClass("selected");
		} else {
			$(this).removeClass("selected");
		}
	});
}

function setGender(val) {
	gender = val;
};

function setHeader() {
	var gendername;
	if(gender) {
		gendername = "flickor";
	} else {
		gendername = "pojkar";
	}

    var temp = [];
    temp = $.extend([], temp, selectedButtons);	
    // console.log(temp);
	// var temp = selectedButtons;
	temp.sort();

	if(temp.length == 0) {		
		$("#banner h1").text( "Populäraste bäbisnamnen för " + gendername + " år 2004-2014" );
		$(".top-list h3").text( "2005-2014" );
		$("#bar-header h2").text( "Totalt antal namngivna år 2004-2014" );

	} else if (temp.length == 1) {
		$("#banner h1").text( "Populäraste bäbisnamnen för " + gendername + " år " + temp[0] );
		$(".top-list h3").text( temp[0] );
		$("#bar-header h2").text( "Totalt antal namngivna år " + temp[0] );

	} else {
		$("#banner h1").text( "Populäraste bäbisnamnen för " + gendername + " år " + temp[0] + "-" + temp[temp.length - 1] );
		$(".top-list h3").text( temp[0] + "-" + temp[temp.length - 1] );
		$("#bar-header h2").text( "Totalt antal namngivna år " + temp[0] + "-" + temp[temp.length - 1] );
	}

	$( ".top-list button").remove();
	for(var i = 0; i < topList.length; i++) {
		var j = i+1;
		//$( ".top-list" ).append( "<p class='top-list-item'>" + topList[i].name + ", " + topList[i].total +  "</p>" );
		$( ".top-list" ).append( "<button class='top-list-item' onclick='removeFromTopList(" + topList[i].id + ")'>" + j + ". " + topList[i].name + "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>" );
	}

	var i = 0;
	$(".top-list-item").each( function() {
		$(this).css("background-color",colorbrewer.Set3[10][i++]);
	});
}

function updateData() {
	setHeader();

	var temp = $.extend([], temp, selectedButtons);	
	temp.sort();

	if(temp.length >= 2) {
		var first = temp[0];
		var last = temp[temp.length - 1];
		//console.log(first + " - " + last);
		sumTopList(first, last);

	} else if (temp.length == 1) {
		var first = temp[0];
		//console.log(first);
		sumTopList(first);

	} else {
		//console.log("Everything!");
		sumTopList();
	}

	//getTopList(topListFull.length);
	getTopListFull();
	setHeader();
	//console.log(topList);
	//console.log(topListFull);
	updateBar(topList);
	updateStream(topList);

	addHistory();

};

function search(string) {
	var found = new Array();
	var j = 0;
	for(var i = 0; i < data.length; i++) {
		if(data[i].tilltalsnamn.toLowerCase().indexOf(string.toLowerCase()) == 0) {
			found.push(new Object());
			found[j].tilltalsnamn = data[i].tilltalsnamn;
			found[j].id = i;	
			j++;
		}
	}

	found.sort(compareName);

	return found;
};

function compareName(a, b) {
  if (a.tilltalsnamn.length > b.tilltalsnamn.length)
     return 1;
  if (a.tilltalsnamn.length < b.tilltalsnamn.length)
    return -1;
  return 0;
};

function getSearchResults() {
	var string = $("#searchstr").val();
	var results = search(string);

	var temp = sumYear[results[0].id];
	
	var add = true;
	for(var key in topList) {
		if(topList[key].tilltalsnamn == temp.name) {
			add = false;
		}
	}

	if(add) {
		topList.push(temp);
	}

	updateData();
};

function removeFromTopList(id) {
	for(var key in topList) {
		if(topList[key].id == id) {
			//topList[key] = [];
			topList.splice(key,1);
		} 
	}
//	console.log(topList);
	updateData();
}

function updateDrama(i) {
	drama = i;
	updateStream(topList);
}

/***************************************************/
/****************** HISTORY ************************/
/***************************************************/
function addHistory() {
	// Spara selectedButtons och topList
	var tempHistory = new Object();
	tempHistory.years = $.extend([], tempHistory.years, selectedButtons);
	tempHistory.topList  = $.extend([], tempHistory.topList, topList);

	if(!inHistory(tempHistory)) {
		historyList.unshift(tempHistory);
	}		

	if(historyList.length > 5) {
		historyList.pop();
	}

	updateHistory();
}

function updateHistory() {
	$( ".history1 button").remove();
	
	for(var i = 0; i < historyList.length; i++) {

		// Extract the years 
		var temp = [];
		temp = $.extend([], temp, historyList[i].years);	
		temp.sort();
		var years;
		if(temp.length == 0) {		
			years = "2005-2014";

		} else if (temp.length == 1) {
			years = temp[0];

		} else {
			years = temp[0] + "-" + temp[temp.length - 1];
		}

		var top = historyList[i].topList.length;

		//$( ".top-list" ).append( "<p class='top-list-item'>" + topList[i].name + ", " + topList[i].total +  "</p>" );
		$( ".history1" ).append( "<button class='history-item' onclick='getHistory(" + i + ")'>Topp " + top + ", " + years  + "</button>" );
	}
}

function inHistory(tempHistory) {
	if(historyList.length == 0) {
		return false;
	} else {
		for(var key in historyList[0].topList) {
			//console.log(key);
			//console.log(tempHistory.topList[key]);
			for(var object in historyList[0].topList[key]) {
				if(tempHistory.topList[key][object] != historyList[0].topList[key][object]) {
					return false;
				}
			}
		}
	}

	return true; 
}

function getHistory(id) {
	var tempYears = [];
	tempYears = $.extend([], tempYears, historyList[id].years);	
	selectedButtons = [];
	selectedButtons = $.extend([], selectedButtons, tempYears);	

	var tempTempList = [];
	tempTempList = $.extend([], tempTempList, historyList[id].topList);	
	topList = [];
	topList = $.extend([], topList, tempTempList);	

	showSelection();
	updateData();
}