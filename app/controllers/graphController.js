var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article');
var request = require('request');
var symbols = { 'btcusd' : 0, 'ethbtc' : 1, 'ethusd': 2}


module.exports = function (app) {
app.use('/', router);
};

router.get('/graph', function (req, res, next) {
    var symbol = req.query.symbol;
    res.render('graph', {
        title: 'Main Graph',
        symbol: symbol
       // articles: articles
      });
});

router.get('/graph/data', function (req, res, next) {
      var symbol = req.query.symbol;
      console.log(req.query.symbol)
      var date = new Date().getTime()
      //date = Math.floor(date/1000)-1000000
      request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000' , function(error, response, body){
        if(!error){
          res.send(body)
        }
      })
})
  
// router.get('/graph/ethbtc', function (req, res, next) {
//       var symbol = "ethbtc"
//       var date = new Date().getTime()
//       date = Math.floor(date/1000)-1000000
//       request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000&since=' + date + "", function(error, response, body){
//         if(!error){
//           res.send(body)
//         }
//       })
// })

// router.get('/graph/data', function (req, res, next) {
//       var symbol = "ethusd"
//       var date = new Date().getTime()
//       date = Math.floor(date/1000)-1000000
//       request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000&since=' + date + "", function(error, response, body){
//         if(!error){
//           res.send(body)
//         }
//       })
// })