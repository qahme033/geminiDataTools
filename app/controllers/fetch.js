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
		tid: { type	: Sequelize.INTEGER, primaryKey: true },
		timestampms : Sequelize.BIGINT,
		price 		: Sequelize.DOUBLE,
		amount		: Sequelize.DOUBLE,
		type 		: Sequelize.STRING,
		day 		: Sequelize.INTEGER,
		month		: Sequelize.INTEGER,
		year 		: Sequelize.INTEGER,
		hour 		: Sequelize.INTEGER,
		minute		: Sequelize.INTEGER,
		second 		: Sequelize.INTEGER,
	})
	synchPromise = connection.sync();
     var currentTime = new Date()
     getNewBatches(symbol,res);

});


function getNewBatches(symbol,res, lastTime){
	var startTime = new Date().getTime();
    console.log(lastTime)
    if(!lastTime) {
    	synchPromise = synchPromise.then(function(){
	 		return TradesTable.max('timestampms').then(max => {
				console.log("Last time was " + max + "  " + new Date(max).toString())
			 	return max
			})
	 	})
    }
	synchPromise.then(function(lastTime){
		return request('https://api.gemini.com/v1/trades/'+symbol+ '?limit_trades=1000&since=' + (lastTime+1) , function(error, response, body){
	       	var trades = JSON.parse(body)
	       	insertDateRedund(trades)
		    TradesTable.bulkCreate(trades).then(function(){
		    	var endTime = new Date().getTime();
		    	var timeElapsed = endTime - startTime
		    	console.log("timeElapsed " + timeElapsed + "ms")
		    	if(timeElapsed < 250)
		    		setTimeout(function(){getNewBatch(symbol,res)}, 250 - timeElapsed)
		    	else
		    		getNewBatches(symbol, res)
		    })
		    .catch(function(e){
		    	console.log(e)
		    })
	    })
	})
}

function insertDateRedund(trades){
   	for(row in trades){
		var date = new Date(trades[row].timestampms)
		trades[row]["day"]= date.getDate()
		trades[row]["month"]= (date.getMonth() + 1) //js month starts at 0
		trades[row]["year"]= date.getFullYear()
		trades[row]["hour"]= date.getHours()
		trades[row]["minute"]= date.getMinutes()
		trades[row]["second"]= date.getSeconds()
	}
}
