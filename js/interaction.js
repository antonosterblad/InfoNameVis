var leftButtonDown = false;
var selectedButtons = new Array();
var rightDrag = false;

$(document).mousedown(function(e){
	selectedButtons = [];
    // Left mouse button was pressed, set flag
    if(e.which === 1) leftButtonDown = true;
});
$(document).mouseup(function(e){
    // Left mouse button was released, clear flag
    if(e.which === 1) leftButtonDown = false;
});

$(".year-button").click(function (e) {
	selectedButtons.push(parseInt($(this).val()));

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
					selectedButtons.pop();
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


});



/*
var isDragging = false;
$(".year-button")
	.mousedown(function() {
    $(window).mousemove(function() {
        isDragging = true;
        console.log("Mousedown");
        $(window).unbind("mousemove");
    });
})
	.mouseup(function() {
    var wasDragging = isDragging;
    isDragging = false;
        console.log("mouseup");
    $(window).unbind("mousemove");
    if (!wasDragging) { //was clicking
        $("#throbble").show();
    }
});
*/