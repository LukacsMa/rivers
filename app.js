let dataset = data;

let w = 1000;
let h = 600;

let datas = dataset.COD.length;

let barPadding = 0.2;
let svgPadding = 60;
let barWidth = (w - 2 * svgPadding) / datas / 3;
let xMin = new Date(dataset.COD[0][0]);
let xMax = new Date(dataset.COD[datas - 1][0] + 1);

let xScale = d3.scaleTime()
    .domain([xMin, xMax])
    .range([svgPadding, w - svgPadding]);

let max1 = d3.max(dataset.COD, (d) => d[1]);
let max2 = d3.max(dataset.pH, (d) => d[1]);
let max = Math.max(max1, max2);

let yScale = d3.scaleLinear()
    .domain([0, max])
    .range([h, svgPadding]);

const svg = d3.select(".svgContainer")
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style("background-color", "ivory")
    .style("border", "1px solid")

let div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white")

let barChart = svg.selectAll(".rectCOD")
    .data(dataset.COD)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(new Date(d[0])))
    .attr("y", (d, i) => yScale(d[1]) - svgPadding)
    .attr("width", (d, i) => barWidth - barPadding)
    .attr("height", (d) => h - yScale(d[1]))
    .attr("class", "CODbar")
    .attr("fill", "navy")
    .on("mouseover", function (d, i) {
        div
            .style("opacity", 1)
            .html("COD" + " : " + d[1])
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px")
    })
    .on('mouseout', function (d) {
        div
            .style('opacity', 0)
    })

let barChart2 = svg.selectAll(".rectpH")
    .data(dataset.pH)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(new Date(d[0])) + barWidth)
    .attr("y", (d, i) => yScale(d[1]) - svgPadding)
    .attr("width", (d, i) => barWidth - barPadding)
    .attr("height", (d) => h - yScale(d[1]))
    .attr("class", "phBar")
    .attr("fill", "red")
    .on("mouseover", function (d, i) {
        div
            .style("opacity", 1)
            .html("pH" + " : " + d[1])
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px")
    })
    .on('mouseout', function (d) {
        div
            .style('opacity', 0)
    })

const xAxis = d3.axisBottom().scale(xScale);
const yAxis = d3.axisLeft().scale(yScale);

svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0, 540)")
    .call(xAxis)

svg.append("g")
    .attr("transform", "translate(60, -60)")
    .attr("id", "y-axis")
    .call(yAxis)

svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -280)
    .attr('y', 20)
    .attr('class', 'info')
    .text('COD(mg/l) and pH values')