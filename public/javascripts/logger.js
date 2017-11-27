
const socket = io();

config = {
	start_time : Date.now(),
	interval : 5000,
	stay : 500,
	color : {r: 0, g: 255, b: 0}
}	

window.onload = function() {

	socket.emit('logger init', config);

	var signal = document.getElementById('flash');
	flash.style.width = window.innerWidth;
	flash.style.height = window.innerHeight;
	var flasher = setInterval(flashOn, config.interval);
	var fOff = null;

	function flashOn(){
		
		signal.style.display = 'block';
		socket.emit('flashed', Date.now());
		fOff = setTimeout(flashOff, config.stay);
	}

	function flashOff(){
		signal.style.display = 'none';
	}
}

