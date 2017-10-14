$( document ).ready(function() {
    symbol = window.location.href.split("=")[1];//don't know about robustness
	main();
});

var tradesBuffer = [];


function main(){
	var graph = new Graph();
	graph.draw();
	var socket = new WebSocket("wss://api.gemini.com/v1/marketdata/" + symbol + "?heartbeat=true");
	socket.onmessage = handleMessage;
	//socket.run_forever(ping_interval=10000)
}

function handleMessage(event) {
	var data = JSON.parse(event.data)
	console.log(data.events[0].type)
  	if(data.type == "heartbeat"){
  		console.log("heartbeat")
  	} else if(data.events[0].type == "trade"){
  		tradesBuffer.push({timestampms : data.timestampms, price : data.price})
  		console.log(tradesBuffer)

  	}
}