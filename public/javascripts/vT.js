/**
 * Created by Hashim Hayat on 6/29/17.
 */

const socket = io();

navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {

    var Peer = require('simple-peer');

    var tranmitter = new Peer({
        initiator: location.hash === '#transmitter',
        trickle: false,
        stream: stream
    });

    socket.on('accept handshake', function(handshake) {
        document.getElementById('connection').innerHTML = "Accepting Handshake!";
        tranmitter.signal(handshake);
    });

    tranmitter.on('connect', function () {
        document.getElementById('connection').innerHTML = "Connected!";
    });

    tranmitter.on('close', function () {
        document.getElementById('connection').innerHTML = "Disconnected!";
        tranmitter.destroy();
    });

    tranmitter.on('signal', function (data) {
        document.getElementById('connection').innerHTML = "Sending Handshake Request."
        socket.emit('sending handshake', data);
    });

    tranmitter.on('stream', function (stream) {
        var video = document.getElementById('video');
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });

}, function (err) {
    console.error(err);
});
