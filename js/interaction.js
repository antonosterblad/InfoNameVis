var leftButtonDown = false;
var selectedButtons = new Array();
var rightDrag = false;
var gender = 0;

$(document).mousedown(function(e){
	if(selectedButtons.length != 1) {
		selectedButtons = [];
	}
    // Left mouse button was pressed, set flag
    if(e.which === 1) leftButtonDown = true;
    
});
$(document).mouseup(function(e){
    // Left mouse button was released, clear flag
    if(e.which === 1) leftButtonDown = false;  

	showSelection();
	updateData();
});

$(".year-button").click(function (e) {
	//selectedButtons = [];
	if(selectedButtons.length == 1) {
		if(selectedButtons[0] != parseInt($(this).val())) {			
			selectedButtons = [];
			selectedButtons.push(parseInt($(this).val()));
		} else {
			selectedButtons = [];
		}
	} else {
		selectedButtons.push(parseInt($(this).val()));
	}
	//console.log(selectedButtons);
	showSelection();
	updateData();

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
});

function showSelection() {
	$(".year-button").each( function() {
		if( jQuery.inArray( parseInt($(this).val()), selectedButtons ) != -1 ) {
			$(this).addClass("selected");
		} else {
			$(this).removeClass("selected");
		}
	});
	setHeader();
}

function setHeader() {
	var gendername;
	if(gender) {
		gendername = "flickor";
	} else {
		gendername = "pojkar";
	}

    var temp = $.extend([], temp, selectedButtons);	
    // console.log(temp);
	// var temp = selectedButtons;
	temp.sort();

	if(temp.length == 0) {		
		$("#banner h1").text( "Populäraste bäbisnamnen för " + gendername + " år 2005-2014" );
		$(".top-list h3").text( "2005-2014" );

	} else if (temp.length == 1) {
		$("#banner h1").text( "Populäraste bäbisnamnen för " + gendername + " år " + temp[0] );
		$(".top-list h3").text( temp[0] );

	} else {
		$("#banner h1").text( "Populäraste bäbisnamnen för " + gendername + " år " + temp[0] + "-" + temp[temp.length - 1] );
		$(".top-list h3").text( temp[0] + "-" + temp[temp.length - 1] );
	}

	$( ".top-list p").remove();
	for(var i = 0; i < topList.length; i++) {
		$( ".top-list" ).append( "<p class='top-list-item'>" + topList[i].name + ", " + topList[i].total +  "</p>" );
	}

	var i = 0;
	$(".top-list-item").each( function() {
		$(this).css("background-color",colorbrewer.Set3[10][i++]);		
	});
}

function updateData() {
	var temp = $.extend([], temp, selectedButtons);	
	temp.sort();

	if(temp.length >= 2) {
		var first = temp[0];
		var last = temp[temp.length - 1];
		console.log(first + " - " + last);
		sum(first, last);

	} else if (temp.length == 1) {
		var first = temp[0];
		console.log(first);
		sum(first);

	} else {
		console.log("Everything!");
		sum();
	}

	getTopList(10);
	getTopListFull();
	setHeader();
	//console.log(topList);
	//console.log(topListFull);
	updateBar();
	updateStream();

};

function search(string) {
	var found = new Array();
	console.log(string.toLowerCase());
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