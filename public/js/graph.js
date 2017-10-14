
class Graph {
  constructor(){
    let thisGraph = this;
      thisGraph.svg = d3.select("svg");
      thisGraph.margin = {top: 20, right: 20, bottom: 30, left: 50};
      thisGraph.width = +thisGraph.svg.attr("width") - thisGraph.margin.left - thisGraph.margin.right;
      thisGraph.height = +thisGraph.svg.attr("height") - thisGraph.margin.top - thisGraph.margin.bottom;
      thisGraph.g = thisGraph.svg.append("g").attr("transform", "translate(" + thisGraph.margin.left + "," + this.margin.top + ")");
      thisGraph.parseTime = d3.timeParse("%d-%b-%y");
      thisGraph.x = d3.scaleTime()
          .rangeRound([0, thisGraph.width]);
      thisGraph.y = d3.scaleLinear()
          .rangeRound([thisGraph.height, 0]);
      thisGraph.line = d3.line()
          .x(function(d) { return thisGraph.x(d.timestampms); })
          .y(function(d) { return thisGraph.y(parseFloat(d.price)); });
      thisGraph.verticleAxis    = thisGraph.g.append("g");
      thisGraph.horizontalAxis  = thisGraph.g.append("g");
      thisGraph.liveCurve       = thisGraph.g.append("path");
    }
}


Graph.prototype.draw = function (){
var thisGraph = this;
d3.json("http:/graph/data?symbol=" + symbol, function(error, data) {
  if (error) throw error;
    console.log(data)
    console.log(thisGraph, this)
    thisGraph.x.domain(d3.extent(data, function(d) { return d.timestampms; }));
    thisGraph.y.domain(d3.extent(data, function(d) { return parseFloat(d.price); }));

  thisGraph.horizontalAxis
      .attr("transform", "translate(0," + thisGraph.height + ")")
      .call(d3.axisBottom(thisGraph.x).ticks(6).tickFormat(d3.timeFormat("%X")))
    .select(".domain")
      .remove();

  thisGraph.verticleAxis
      .call(d3.axisLeft(thisGraph.y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
     // .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

  thisGraph.liveCurve
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", thisGraph.line);
   thisGraph.since = thisGraph.x.domain()[0]
   console.log(thisGraph.since)

  });

}

