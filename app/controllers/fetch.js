var express = require('express'),
  router = express.Router(),
  request = require('request');

var Sequelize = require('sequelize')
const connection = new Sequelize('trades', 'qasimahmed', 'pass', {
dialect: 'postgres'});
var TradesTable = connection.define('TradesTable', {
	tid: { type: Sequelize.INTEGER, primaryKey: true },
	data : Sequelize.JSONB,
})
connection.sync().then(function(trade){
    	//console.log(trade)
 })


module.exports = function (app) {
  app.use('/', router);
};

router.get('/fetch',function (req, res, next) {
    // res.render('fetch', {
    //   title: 'Fetching Page',
    //  // articles: articles
    // });
     var symbol = req.query.symbol;
     console.log(symbol)
     request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000&since=1444311607801', function(error, response, body){
        if(!error){
          res.send(body)
        }
        var trades = JSON.parse(body)

        for(trade in trades) //changing structure to tid with data 
        	trades[trade] = {tid : trades[trade].tid, data : trades[trade]}
        console.log(trades)

        TradesTable.bulkCreate(trades)
      })
});
