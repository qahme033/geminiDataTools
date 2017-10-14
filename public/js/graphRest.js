
console.log("hello world")
var symbol;

$( document ).ready(function() {
    symbol = window.location.href.split("=")[1];//don't know about robustness
   var graph = new Graph();
   console.log(graph)
   graph.draw();
  setInterval(graph.draw.bind(graph), 5000);
});

