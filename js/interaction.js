var leftButtonDown = false;
var selectedButtons = new Array();
var rightDrag = false;

$(document).mousedown(function(e){
	if(selectedButtons.length != 1) {
		selectedButtons = [];
	}
    // Left mouse button was pressed, set flag
    if(e.which === 1) leftButtonDown = true;

    showSelection();
});
$(document).mouseup(function(e){
    // Left mouse button was released, clear flag
    if(e.which === 1) leftButtonDown = false;  
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
	console.log(selectedButtons);
	showSelection();

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

		console.log(selectedButtons);
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


    var temp = $.extend([], temp, selectedButtons);	
    // console.log(temp);
	// var temp = selectedButtons;
	temp.sort();

	if(temp.length == 0) {		
		$("#banner h1").text( "Populäraste bäbisnamnen år 1998-2014" );

	} else if (temp.length == 1) {
		$("#banner h1").text( "Populäraste bäbisnamnen år " + temp[0] );

	} else {
		$("#banner h1").text( "Populäraste bäbisnamnen år " + temp[0] + "-" + temp[temp.length - 1] );
	}
}