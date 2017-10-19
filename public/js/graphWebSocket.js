$( document ).ready(function() {
    symbol = window.location.href.split("=")[1];//don't know about robustness
	main();
});

var tradesBuffer = [];
var scatterPlot ;



function main(){
	scatterPlot = new ScatterPlot();
	scatterPlot.draw();
	var socket = new WebSocket("wss://api.gemini.com/v1/marketdata/" + symbol + "?heartbeat=true");
	socket.onmessage = handleMessage;


}



function handleMessage(event) {
	var data = JSON.parse(event.data)
	var pData = {	
		"timestampms" 	: data.timestampms,		"type" : data.type, 
		"price" 		: data.events[0].price, "side" : data.events[0].side, 
		"subType" 		: data.events[0].type, 	"reason" : data.events[0].reason
	}
	scatterPlot.update(pData)
  	if(data.type == "heartbeat"){
  		console.log("heartbeat")
  	} else if(data.events[0].type == "trade"){
  		tradesBuffer.push({timestampms : data.timestampms, price : data.price});

  	}
}