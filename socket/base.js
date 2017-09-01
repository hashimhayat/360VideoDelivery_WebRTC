/**
 * Created by student on 6/30/17.
 */

var handshake = {};
var response = {};

module.exports = function (io) {

    io.on('connection', function(socket) {

        // Transmitter Sends the handshake request that server stores
        socket.on('sending handshake', function (data) {
            handshake = data;
        });

        // Receiver connects and ask for a handshake request
        socket.on('handshake available', function () {
            io.emit('receive handshake', handshake);
        });

        // Receiver responds to the handshake with its on handshake data for the transmitter
        socket.on('respond handshake', function (data) {
            response = data;
            socket.broadcast.emit('accept handshake', response);
        });

        socket.on('disconnect', function(){
            console.log(socket.id,' disconnected');
        });

    });
}