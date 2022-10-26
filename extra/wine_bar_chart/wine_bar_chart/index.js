import { dropdown_menu } from './dropdown_menu';

const titleText = 'White Wine Quality vs fff';
const yAxisLabelText = 'fff';

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
  const xValue = d => d.quality;
  const yValue = d => d.alcohol;
  const margin = { top: 80, right: 40, bottom: 50, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
     // sort data
  data.sort(function(b, a) {
    return b.quality - a.quality;
    
  });
  
  const yScale = d3.scaleLinear()
  	.domain([0,d3.max(data, yValue)])
  	.range([innerHeight,0]);
  const xScale = d3.scaleBand()
  	.domain(data.map(xValue))
  	.range([0,innerWidth])
  	.padding(0.05);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
//   const yAxisTickFormat = number =>
//     d3.format('.3s')(number)
//       .replace('G', 'B');
  
  const xAxis = d3.axisBottom(xScale)
  
  const yAxis = d3.axisLeft(yScale)
  	// .tickFormat(yAxisTickFormat)
  
  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);
  
  const yAxisG = g.append('g').call(yAxis)
  
  xAxisG.select('.domain').remove();
  yAxisG.select('.domain').remove();

  yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', -15)
      .attr('x', 0)
      .attr('fill', 'black')
      .text(yAxisLabelText);
  
  g.append('text')
      .attr('class', 'title')
      .attr('y', -40)
  		.attr('x', -70)
      .text(titleText);
	
  g.selectAll('rect').data(data)
  	.enter().append('rect')
  		.attr('x', d =>xScale(xValue(d)))
  		.attr('y', d =>yScale(yValue(d)))
  		.attr('width', xScale.bandwidth())
  		.attr('height', d=> innerHeight - yScale(yValue(d)))
};

d3.dsv(';','data.csv').then(data => {
  data.forEach(d => {
    d.fixed_acidity = +d.fixed_acidity;
      d.volatile_acidity = +d.volatile_acidity;
      d.citric_acid = +d.citric_acid;
      d.residual_sugar = +d.residual_sugar;
      d.chlorides = +d.chlorides;
      d.free_sulfur_dioxide = +d.free_sulfur_dioxide;
      d.density = +d.density;
      d.pH = +d.pH;
      d.sulphates = +d.sulphates;
      d.alcohol = +d.alcohol;
      d.quality = +d.quality;
  });
  render(data);
});