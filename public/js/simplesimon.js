$(function() {
	var userArray = [];
	var simonArray = [];
	var pieslice = $('.pieslice');

	function start() {
	    simonArray = [];
	    copy();
	}

	function copy() {
	    userArray = [];
	    randompiesliceToSequence();
	    playback();
	}

	function randompiesliceToSequence() {
	    var random = Math.floor(Math.random() * 4);
	    simonArray.push(pieslice[random].id);
	}
	function flash(id) {
		$('#' + id).addClass('active');
	    setTimeout(function() {
	        $('#' + id).removeClass('active');
	    }, 300);
	}
	function playback() {
		// disable users clicking from affecting anything during simons turn
	    disableInput();

	    $('#round').text("Round # " + simonArray.length);
	    var i = 0;
	    var intervalId = setInterval(function() {
	        flash(simonArray[i]);
	        i++;
	        if (i >= simonArray.length) {
	            clearInterval(intervalId);

	        // allow user to have meaningful clicks again
            enableInput();
	        }
	    }, 600);
	}

	function compareArrays() {
	    var sequenceMistake = false;
	    // check if simon and user arrays are the same
	    for (var i = 0; i < userArray.length; i++) {
	    	// if they are not the same change sequenceMistake var to true and call game over funtion, else if they are the same call copy function and go another round 
	      if (simonArray[i] != userArray[i]) {
	        sequenceMistake = true;
	        break;
	      }
	    }
	    if(sequenceMistake) {
	    	$('#dialog').modal('show');
	    	$('.modal-body').html('You got to round # ' + simonArray.length + '. Do you want to play again?')
	    	$('#yes').click(function(){
    			window.location.reload();
    		});
	    } else if (userArray.length == simonArray.length) {
	    	copy();
	    };
	};

	function userClick(id) {
	    var userChoice = $(this).attr('id');
	    flash("id");
	    userArray.push(userChoice);
	    compareArrays();
	}

	function enableInput() {
	    $('#0').click(userClick);
	    $('#1').click(userClick);
	    $('#2').click(userClick);
	    $('#3').click(userClick);
	}

	function disableInput() {
	    $('#0').off('click');
	    $('#1').off('click');
	    $('#2').off('click');
	    $('#3').off('click');
	}

	$('#start').click(start);

	$('#myButton').click(function(){
		setTimeout(function(){
			window.location.reload(1);
		}, 2050);
	});
});