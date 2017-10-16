var express = require('express'),
  router = express.Router(),
  request = require('request');

var Sequelize = require('sequelize')
const connection = new Sequelize('trades', 'qasimahmed', 'pass', {
dialect: 'postgres'});

var TradesTable ;
var synchPromise ;


module.exports = function (app) {
  app.use('/', router);
};

router.get('/fetch',function (req, res, next) {
	 var symbol = req.query.symbol;
	TradesTable = connection.define('TradesTable_'+ symbol, {
		tid: { type: Sequelize.INTEGER, primaryKey: true },
		timestampms : Sequelize.BIGINT,
		price : Sequelize.DOUBLE,
		amount: Sequelize.DOUBLE,
		type : Sequelize.STRING,
	})
	synchPromise = connection.sync();
     console.log(symbol)
     var currentTime = new Date()
     getNewBatches(symbol,res);

});


function getNewBatches(symbol,res, lastTime){
	var startTime = new Date().getTime();
    if(!lastTime) {
    	synchPromise = synchPromise.then(function(){
	 		return TradesTable.max('timestampms').then(max => {
				console.log("Last time was " + max)
			 	return max
			})
	 	})
    }
	synchPromise.then(function(lastTime){
		return request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000&since=' + (lastTime+1), function(error, response, body){
	       	var trades = JSON.parse(body)
		    TradesTable.bulkCreate(trades).then(function(){
		    	var endTime = new Date().getTime();
		    	var timeElapsed = endTime - startTime
		    	console.log("timeElapsed " + timeElapsed + "ms")
		    	if(timeElapsed < 250)
		    		setTimeout(function(){getNewBatch(symbol,res)}, 250 - timeElapsed)
		    	else
		    		getNewBatches(symbol, res)
		    })
	    })
	})
}
