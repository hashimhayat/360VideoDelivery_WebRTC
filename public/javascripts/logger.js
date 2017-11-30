

var v = document.getElementById('video');

config = {
	start_time : Date.now(),
	interval : 5000,
	stay : 500,
	color : {r: 0, g: 255, b: 0}
}	

window.addEventListener('DOMContentLoaded', function() {

	var colors = new tracking.ColorTracker(['magenta']);
	var signal = document.getElementById('flash');
	flash.style.width = window.innerWidth;
	flash.style.height = window.innerHeight;
	var flasher = setTimeout(flashOn, config.interval);
	var fOff = null;

	var flashedAt = undefined;

	function flashOn(){
		
		signal.style.display = 'block';
		fOff = setTimeout(flashOff, config.stay);
		flashedAt = Date.now();

	}

	function flashOff(){
		signal.style.display = 'none';
	}

	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	
	if (navigator.getUserMedia) {
		navigator.getUserMedia({ video:true, audio:false },       
		function(stream) { 

			var url = window.URL || window.webkitURL;
            v.src = url ? url.createObjectURL(stream) : stream;
            v.play();

		},
		function(error) {

		});
	} else {
		alert('Sorry, the browser you are using doesn\'t support getUserMedia');
		return;
	}

	    colors.on('track', function(event) {            
            if (event.data.length > 0) {
            	if (flashedAt){
               		console.log("Delay", Date.now() - flashedAt);
               		flasher = setTimeout(flashOn, config.interval);
               		flashedAt = undefined;
               }
            }
        });

        tracking.track('#video', colors);

});

