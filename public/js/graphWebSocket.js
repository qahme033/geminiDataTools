$( document ).ready(function() {
    symbol = window.location.href.split("=")[1];//don't know about robustness
	main();
});

var tradesBuffer = [];


function main(){
	var socket = new WebSocket("wss://api.gemini.com/v1/marketdata/" + symbol);
	socket.onmessage = handleMessage;
	//socket.run_forever(ping_interval=10000)
}

function handleMessage(event) {
	var data = JSON.parse(event.data)
	if(data.events[0].type == "trade"){
  		tradesBuffer.push(data)
  	}
}