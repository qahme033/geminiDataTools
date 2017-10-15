

var express = require('express'),
  config = require('./config/config');


var app = express();

module.exports = require('./config/express')(app, config);

app.use(express.static('public'))
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

