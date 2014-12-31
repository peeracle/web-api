var raven = require('raven');
var ravenClient = new raven.Client('http://dfcf5661afda4552bb80816576fd3239:4282bc54c4944fd680f37b4a8ea1d5d3@sentry.dotstar.fr/3');
ravenClient.patchGlobal();

var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hello World!')
})

var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})
