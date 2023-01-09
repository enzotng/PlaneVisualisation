const fruits = [
    { name: "8 heures", value: 15, color: "#ffe135" },
    { name: "9 heures", value: 205, color: "#66b447" },
    { name: "10 heures", value: 174, color: "#fc5a8d" },
    { name: "11 heures", value: 170, color: "#6f2da8" },
    { name: "12 heures", value: 102, color: "#ffa500" },
    { name: "13 heures", value: 250, color: "#32cd32" },
  ];
  
  const margin = { top: 100, right: 100, bottom: 100, left: 100 };
  const width = 600;
  const height = 600;
  
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleBand().rangeRound([height, 0], 0);
  
  var xAxis = d3.axisBottom().scale(x).ticks(5);
  x.domain([0, 250]);
  
  var yAxis = d3.axisLeft().scale(y).tickSize(0);
  y.domain(
    fruits.map(function (d) {
      return d.name;
    })
  );
  
  var svg = d3
    .select("#chart3")
    .append("svg:svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg
    .selectAll("bar")
    .data(fruits)
    .enter()
    .append("g")
    .attr("class", "bar-group")
    .append("rect")
    .style("fill", "#052453")
    .attr("y", (d) => y(d.name) + margin.top/2)
    .attr("height", 30)
    .attr("x", (d) => x(0))
    .attr("width", (d) => x(d.value));
  
  svg
    .selectAll(".bar-group")
    .append("text")
    .text((d) => d.value)
    .attr("fill", "black")
    .attr("x", (d) => x(d.value) + 12)
    .attr("y", (d) => y(d.name) + margin.top )
    .style("font", "16px sans-serif");
  
  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-0.5em")
    .style("font", "16px sans-serif");
  
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dy", "1em")
    .style("font", "16px sans-serif");
  
  var serializer = new XMLSerializer();
  var src = serializer.serializeToString(document.getElementById("svg"));
  src = '<?xml version="1.0" standalone="no"?>\r\n' + src;
  var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(src);
  