var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article');

var request = require('request');


module.exports = function (app) {
app.use('/', router);
};



router.get('/stats/', function (req, res, next) {
    
  request('https://api.gemini.com/v1/symbols', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var symbol = JSON.parse(body)[1]
      console.log(symbol)
      request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000', function(error, response, body){
        if(!error){
          res.render('stats',{
            title : response.statusMessage,
            body : body
          })
        }
      })
    }
  })

    // Article.find(function (err, articles) {
    //     if (err) return next(err);
    //     res.render('stats', {
    //       title: 'Stats Page',
    //      // articles: articles
    //     });
    //   });
});