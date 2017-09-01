var express = require('express');
var router = express.Router();

var signal = {};
var response = {};

router.get('/', function(req, res) {
    res.render('index', { title: 'VideoTransmitter' });
});

router.get('/sender', function(req, res) {
  res.render('sender', { title: 'VideoTransmitter' });
});

router.get('/receiver', function(req, res) {
    res.render('receiver', { title: 'VideoTransmitter' });
});

router.post('/signal', function(req, res) {

    if (req.body.signal){
        console.log("Handshake Request Sent!");
        signal = JSON.parse(req.body.signal);
    }
});

router.get('/signal', function(req, res) {
    res.send(signal);
});

router.post('/response', function(req, res) {

    if (req.body.response){
        console.log("Handshake Request Received!");
        response = JSON.parse(req.body.response);
    }
});

router.get('/response', function(req, res) {
    res.send(response);
});

module.exports = router;
