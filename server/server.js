var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/public'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './public', '/index.html'));
});
app.listen(8092, function() {
    console.log('App Run On Port 8092!');
});
