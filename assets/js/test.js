"use strict";

const addr =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
req = new XMLHttpRequest();
req.open("GET", addr, true);
req.send();
req.onload = function () {
  const json = JSON.parse(req.responseText);
  const dataset = json.data;
  const w = 800;
  const h = 400;
  const xPadding = 50;
  const yPadding = 20;
  const yearsDate = dataset.map((d) => new Date(d[0]));
  const xMax = new Date(d3.max(yearsDate));
  const xMin = new Date(d3.min(yearsDate));
  const svg = d3
    .select("section")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
  const xScale = d3
    .scaleTime()
    .domain([xMin, xMax])
    .range([xPadding, w - xPadding]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1]) + 1000])
    .range([h - yPadding, 0]);
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  const tooltip = d3
    .select("section")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);
  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (h - yPadding) + ")")
    .call(xAxis);
  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(" + xPadding + ",0)")
    .call(yAxis);
  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(new Date(d[0])))
    .attr("y", (d) => yScale(d[1]))
    .attr("width", 2)
    .attr("height", (d) => h - yPadding - yScale(d[1]))
    .attr("class", "bar")
    .attr("fill", "#2c82c9")
    .attr("data-date", (d, i) => dataset[i][0])
    .attr("data-gdp", (d) => d[1])
    .on("mouseover", (d, i) => {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(d[0])
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px")
        .attr("data-date", dataset[i][0]);
    })
    .on("mouseout", (d) =>
      tooltip
        .transition()
        .duration(500)
        .style("opacity", 0)
        .attr("data-date", d[0])
    );
};
