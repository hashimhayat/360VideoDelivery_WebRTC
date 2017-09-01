/**
 * Created by Hashim Hayat on 6/29/17.
 */

const socket = io();

//navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {

    var Peer = require('simple-peer');

    var video = document.getElementById('video');
    var demoSrc = "/video/demo.mp4";
    var stream;

    var receiver = new Peer({
        trickle: false
        //stream: stream
    });

    socket.emit('handshake available');

    socket.on('receive handshake', function(handshake) {
        document.getElementById('connection').innerHTML = "Received Handshake Request!";
        receiver.signal(handshake);
    });

    receiver.on('connect', function () {
        document.getElementById('connection').innerHTML = "Connected!";
    });

    receiver.on('close', function () {
        document.getElementById('connection').innerHTML = "Disconnected!";
        receiver.destroy();
    });

    receiver.on('signal', function (data) {
        document.getElementById('connection').innerHTML = "Received Signal!."
        socket.emit('respond handshake', data);
    });

    document.addEventListener('keydown', function(event) {


        if (event.key === 'd') {
            video.src = demoSrc;
            console.log("Entering Demo Mode");
        }

        if (event.key === 'l') {
            video.src = window.URL.createObjectURL(stream);
            console.log("Exiting Demo Mode");
        }

    }, false);

    receiver.on('stream', function (stream) {
        stream = stream
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });

// }, function (err) {
//     console.error(err);
// });
