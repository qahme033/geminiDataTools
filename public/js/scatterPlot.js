
class ScatterPlot {
  constructor(){
    let self = this;
      self.svg = d3.select("svg");
      self.margin = {top: 20, right: 20, bottom: 30, left: 50};
      self.width = +self.svg.attr("width") - self.margin.left - self.margin.right;
      self.height = +self.svg.attr("height") - self.margin.top - self.margin.bottom;
      self.g = self.svg.append("g").attr("transform", "translate(" + self.margin.left + "," + this.margin.top + ")");
      self.parseTime = d3.timeParse("%d-%b-%y");
      self.x = d3.scaleTime()
          .rangeRound([0, self.width]);
      self.y = d3.scaleLinear()
          .rangeRound([self.height, 0]);
      self.line = d3.line()
          .x(function(d) { return self.x(d.timestampms); })
          .y(function(d) { return self.y(parseFloat(d.price)); });
      self.verticleAxis    = self.g.append("g");
      self.horizontalAxis  = self.g.append("g");
      self.liveCurve       = self.g.append("path");
      self.dots            = self.g.append("g");
    }
}

ScatterPlot.prototype.update = function(data){
let self = this;
allData.push(data);
data = [data]

self.x.domain(d3.extent(allData.concat(restData), function(d) { return d.timestampms; }));
self.y.domain(d3.extent(allData.concat(restData), function(d) { return parseFloat(d.price); }));


    //dots.attr("clip-path", "url(#clip)");
    self.dots.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr('class', 'dot')
        .attr("r",5)
        .style("opacity", .5)
        .attr("cx", function(d) { return self.x(d.timestampms); })
        .attr("cy", function(d) { return self.y(parseFloat(d.price)); })

}

allData = [];
restData = [];

ScatterPlot.prototype.draw = function (){
let self = this;
d3.json("http:/graph/data?symbol=" + symbol, function(error, data) {
  if (error) throw error;
    console.log(data)
    restData = data;
    console.log(self, this)
    self.x.domain(d3.extent(data, function(d) { return d.timestampms; }));
    self.y.domain(d3.extent(data, function(d) { return parseFloat(d.price); }));

  self.horizontalAxis
      .attr("transform", "translate(0," + self.height + ")")
      .call(d3.axisBottom(self.x).ticks(6).tickFormat(d3.timeFormat("%X")))
    .select(".domain")
      .remove();

  self.verticleAxis
      .call(d3.axisLeft(self.y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
     // .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

  self.liveCurve
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", self.line);

   self.since = self.x.domain()[0]
   console.log(self.since)

  });

}

