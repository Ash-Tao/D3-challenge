
// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 600;

// Define the chart's margins as an object
var margin = {
  top: 20,
  right: 60,
  bottom: 80,
  left: 20,
};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select scatter, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
var file = "assets/data/data.csv"

// call the function
d3.csv(file).then(init, errorHandle);

// Use error handling function to append data and SVG objects
// If error exist it will be only visible in console
function errorHandle(error) {
  throw error;
} 

// Function takes in argument statesData
function init(statesData) {

//   // Loop through the data and pass argument data
//   statesData.map(function (data) {
//     data.poverty = +data.poverty;
//     data.obesity = +data.obesity;
//   });
  
  XValue = statesData.map(x => +x.poverty);
  YValue = statesData.map(x => +x.obesity);
  
  //  Create scale functions
  // Linear Scale takes the min to be displayed in axis, and the max of the data
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(XValue)-1,d3.max(XValue)+1])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(YValue)-1,d3.max(YValue)+1])
    .range([height, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xLinearScale).ticks(10);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append the axes to the chart group 
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
  // Left axis is already at 0,0
  chartGroup.append("g")
    .call(leftAxis);

  // Create scatter plot
  var circlesGroup = chartGroup.selectAll("circle")
    .data(statesData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "13")
    .attr("fill", "#1f6a85")
    .attr("opacity", ".60")


  // Append text to circles 
  var circlesGroup = chartGroup.selectAll()
    .data(statesData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.obesity))
    .style("font-size", "10px")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .text(d => (d.abbr));

  
}