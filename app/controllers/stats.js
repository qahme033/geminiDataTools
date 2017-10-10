var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article');

var request = require('request');
var symbols = { 'btcusd' : 0, 'ethbtc' : 1, 'ethusd': 2}


module.exports = function (app) {
app.use('/', router);
};



router.get('/stats', function (req, res, next) {
    var symbol = req.query.symbol;
    request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000', function(error, response, body){
      if(!error){
        res.render('stats',{
          title : response.statusMessage,
          body : body, 
          symbol : symbol
        })
      }
    })
  })



// router.get('/stats/btcusd', function (req, res, next) {
//     var symbol = "btcusd"
//     request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000', function(error, response, body){
//       if(!error){
//         res.render('stats',{
//           title : response.statusMessage,
//           body : body
//         })
//       }
//     })
//   })

// router.get('/stats/ethusd', function (req, res, next) {
//     var symbol = "ethusd"
//     request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000', function(error, response, body){
//       if(!error){
//         res.render('stats',{
//           title : response.statusMessage,
//           body : body
//         })
//       }
//     })
//   })


//     // Article.find(function (err, articles) {
//     //     if (err) return next(err);
//     //     res.render('stats', {
//     //       title: 'Stats Page',
//     //      // articles: articles
//     //     });
//     //   });
