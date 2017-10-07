var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article');
var request = require('request');

module.exports = function (app) {
app.use('/', router);
};

router.get('/graph', function (req, res, next) {
    res.render('graph', {
        title: 'Main Graph',
       // articles: articles
      });
});

router.get('/graph/data', function (req, res, next) {
    request('https://api.gemini.com/v1/symbols', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var symbol = JSON.parse(body)[1]
          console.log(symbol)
          var date = new Date().getTime()
          date = Math.floor(date/1000)-1000000
          request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000&since=' + date + "", function(error, response, body){
            if(!error){
              res.send(body)
            }
          })
        }
    })
});
  