var express = require('express'),
  router = express.Router();

var Sequelize = require('sequelize')
const connection = new Sequelize('trades', 'qasimahmed', 'pass', {
dialect: 'postgres'});

var TradesTable = connection.define('TradeTable', {
	data : Sequelize.JSONB,
})

connection.sync().then(function(trade){
    	console.log(trade)
    })


module.exports = function (app) {
  app.use('/', router);
};

router.get('/fetch', function (req, res, next) {
    res.render('fetch', {
      title: 'Fetching Page',
     // articles: articles
    });
    // TradeTable.findById(1).then(function(trade){
    // 	console.log(trade)
    // })
});
