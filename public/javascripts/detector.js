(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// video capture object
var capture;

// color we want to track
var r = 0;
var g = 0;
var b = 0;

// scaling factor (how much are we increasing the size of video by to draw it?)
var scalingFactor = 2;

// our sensitivity threshold
var threshold = 20;

// var Peer = require('simple-peer');

var receiver = new Peer({
    trickle: false
});

var http = new XMLHttpRequest();
http.open("GET", '/signal', true);
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.send();

http.onreadystatechange = function() {

    if(http.readyState === 4 && http.status === 200) {
        receiver.signal(http.responseText);
    }
};

receiver.on('connect', function () {
    document.getElementById('connection').innerHTML = "Connected!";
});

receiver.on('close', function () {
    document.getElementById('connection').innerHTML = "Disconnected!";
    receiver.destroy();
});

receiver.on('signal', function (data) {

    document.getElementById('connection').innerHTML = "Received Handshake Request."

    var response = new XMLHttpRequest();
    response.open("POST", '/response', true)
    response.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var params = "response=" + JSON.stringify(data);
    response.send(params);
});

// send.addEventListener('click', function () {
//     var message =  document.getElementById('message').value;
//     receiver.send(message);
// });

receiver.on('data', function (data) {
    document.getElementById('messages').textContent += data + '\n';
});

receiver.on('stream', function (stream) {
    console.log('stream available');

    capture = window.URL.createObjectURL(stream);

    var video = document.getElementById('video');
    video.src = window.URL.createObjectURL(stream);
    // video.play();
});

function setup() {

    background(100);
    createCanvas(640, 420);
    background(100);

    console.log("Setup!")
    // // start up our web cam
    // capture = createCapture({
    //     video: {
    //         mandatory: {
    //             minWidth: 320,
    //             minHeight: 240,
    //             maxWidth: 320,
    //             maxHeight: 240
    //         }
    //     }
    // });
    // capture.hide();

    // stroke(0, 255, 0);
    // noFill();
    // rectMode(CENTER);
}

function draw() {

    background(150);
    image(capture, 50, 50);


    // // expose the pixels in the incoming video stream
    // capture.loadPixels();
    //
    // // if we have some pixels to work wtih them we should proceed
    // if (capture.pixels.length > 0) {
    //
    //     // mirror our video
    //     mirrorVideo();
    //
    //     // set up variables to test for the best pixel
    //     var bestLocations = [];
    //
    //     for (var i = 0; i < capture.pixels.length; i += 4) {
    //         // determine how close of a match this color is to our desired color
    //         var match = dist(r, g, b, capture.pixels[i], capture.pixels[i + 1], capture.pixels[i + 2]);
    //         if (match < threshold) {
    //             // this pixel qualifies!  store its location into our array
    //             bestLocations.push(i);
    //         }
    //     }
    //
    //     // draw the video
    //     image(capture, 0, 0);
    //
    //     // do we have a best match?  it's possible that no pixels met our threshold
    //     if (bestLocations.length > 0) {
    //         // average up all of our locations
    //         var xSum = 0;
    //         var ySum = 0;
    //         for (var i = 0; i < bestLocations.length; i++) {
    //             xSum += (bestLocations[i] / 4) % 320;
    //             ySum += (bestLocations[i] / 4) / 320;
    //         }
    //
    //         // average our sums to get our 'centroid' point
    //         var xPos = xSum / bestLocations.length;
    //         var yPos = ySum / bestLocations.length;
    //
    //         // now we know the best match!  draw a box around it
    //         rect(xPos, yPos, 25, 25);
    //     }
    // }
}

function mousePressed() {
    // memorize the color the user is clicking on
    var loc = int( (mouseX + mouseY * capture.width) * 4);
    r = capture.pixels[loc];
    g = capture.pixels[loc + 1];
    b = capture.pixels[loc + 2];

    console.log("Looking for: R=" + r + "; G=" + g + "; B=" + b);
}

function keyPressed() {
    if (key == 'A') {
        threshold--;
        console.log("Threshold is now: " + threshold);
    }
    if (key == 'D') {
        threshold++;
        console.log("Threshold is now: " + threshold);
    }
}

// mirror our video
function mirrorVideo() {
    // iterate over 1/2 of the width of the image & the full height of the image
    for (var x = 0; x < capture.width / 2; x++) {
        for (var y = 0; y < capture.height; y++) {
            // compute location here
            var loc1 = (x + y * capture.width) * 4;
            var loc2 = (capture.width - x + y * capture.width) * 4;

            // swap pixels from left to right
            var tR = capture.pixels[loc1];
            var tG = capture.pixels[loc1 + 1];
            var tB = capture.pixels[loc1 + 2];

            capture.pixels[loc1] = capture.pixels[loc2];
            capture.pixels[loc1 + 1] = capture.pixels[loc2 + 1];
            capture.pixels[loc1 + 2] = capture.pixels[loc2 + 2];

            capture.pixels[loc2] = tR;
            capture.pixels[loc2 + 1] = tG;
            capture.pixels[loc2 + 2] = tB;
        }
    }
    capture.updatePixels();
}
},{}]},{},[1]);
