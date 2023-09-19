// var students = [160, 170, 120, 100, 140, 150];
var students = [];

//terms
var terms = [];
//terms

d3.json('hw3data.json')
    .then(function (data) {
        // for (key in data) {
        for (var i = 0; i < data.length; i++) {
            students.push(+data[i].students);
            terms.push(data[i].term);
        }

        var tooltip = d3.select('body').append('div')
            .style('position', 'absolute')
            .style('padding', '0 10px')
            .style('background', 'white')
            .style('opacity', 0);
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        };
        var height = 300 - margin.top - margin.bottom,
            width = 600 - margin.left - margin.right,
            barW = 45,
            barSpace = 45;
        var yS = d3.scaleLinear()
            .domain([0, d3.max(students)])
            .range([0, height]);
        var xS = d3.scaleBand()
            // .domain(d3.range(0, students.length))
            //added
            .domain(terms)
            .range([0, width])
            .padding(.125);
        var graph = d3.select('#chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .style('background', '#d9dadb')
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
        var verticalGuide = d3.scaleLinear()
            .domain([0, d3.max(students)])
            .range([height, 0]);
        graph.selectAll('rect')
            .data(students)
            .enter()
            .append('rect')
            .style('fill', '#022ce6')
            // .attr('width', barW)
            .attr('width', xS.bandwidth)
            // .attr('height', function(d){
            .attr('height', function (d) {
                return yS(d);
            })
            .attr('x', function (d, i) {
                return i * (barW + barSpace);
                // return xS(i);
            })
            .attr('y', function (d) {
                return height - yS(d);
            })
            .on('mouseover', function (event, d) {
                const [x, y] = d3.pointer(event)
                tooltip.transition()
                    .style('opacity', .8)
                tooltip.html(d)
                    .style('left', (x + 15) + 'px')
                    .style('top', (y + 10) + 'px')
                d3.select(this)
                    .style('opacity', .5)
            })
            .on('mouseout', function (event, d) {
                d3.select(this)
                    .style('opacity', 1)
            });
        graph.append('g')
            .call(d3.axisLeft(yS).scale(verticalGuide))
        // .attr('transform', 'translate(35, 0)');
        graph.append('g')
            .call(d3.axisBottom(xS))
            .attr('transform', 'translate(0, ' + height + ')');
    });