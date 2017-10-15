var express = require('express'),
  router = express.Router(),
  request = require('request');

var Sequelize = require('sequelize')
const connection = new Sequelize('trades', 'qasimahmed', 'pass', {
dialect: 'postgres'});

var TradesTable = connection.define('TradesTable', {
	tid: { type: Sequelize.INTEGER, primaryKey: true },
	timestampms : Sequelize.BIGINT,
	price : Sequelize.DOUBLE,
	amount: Sequelize.DOUBLE,
	type : Sequelize.STRING,
})
var synchPromise = connection.sync()


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

    synchPromise.then(function(){
     	return TradesTable.max('timestampms').then(max => {
 		 console.log("Last time was " + max)
 		 return max
		})
	//	return lastTimePromise;
     })
    .then(function(lastTime){
		request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000&since=' + (lastTime+1), function(error, response, body){
	        if(!error){
	          res.send(body)
	        }
	       	var trades = JSON.parse(body)
		    TradesTable.bulkCreate(trades)
	    })


    })


    // console.log(lastTimePromise)

    //  lastTimePromise.then(function(lastTime){
    //  	request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000&since=' + lastTime, function(error, response, body){
    //     if(!error){
    //       res.send(body)
    //     }
    //     var trades = JSON.parse(body)

    //     // for(trade in trades) //changing structure to tid with data 
    //     // 	trades[trade] = {tid : trades[trade].tid, data : trades[trade]}
    //     // console.log(trades)

    //     //TradesTable.bulkCreate(trades)
    //   })
    //  })
     
});
