export const bar = (selection, props) => {
 const {
   margin,
   height,
   width,
   data,
   xValue,
   yValue,
   title,
   xAxisLabel,
   yAxisLabel,
   wine_type,
   titleLabel
 } = props;
  
  //filtering by wine type
  let filtered_data;
  if (wine_type === 'White Wine') {
    filtered_data = data.filter(d => d.wine_type === 'white')
  } else {
      filtered_data = data.filter(d => d.wine_type === 'red')
    }
  
  //setting size of chart element
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  //sort bars via quality ranking
  filtered_data.sort(function(b, a) {
    return b.quality - a.quality;
  });
  
  //defining scales
  const yScale = d3.scaleLinear()
  	.domain([0,d3.max(filtered_data, yValue)])
  	.range([innerHeight,0])
  	.nice();
  const xScale = d3.scaleBand()
  	.domain(filtered_data.map(xValue))
  	.range([0,innerWidth])
  	.padding(0.05);
  
  const g = selection.selectAll('.container').data([null]);
  const gEnter = g
    .enter().append('g')
      .attr('class', 'container');
  	gEnter
  		.merge(g)
    		.attr('transform', `translate(${margin.left},${margin.top})`);
  
  //const yAxisTickFormat = number =>
  	//d3.format('.3s')(number)
  			//.replace('G', 'B');
  
  //domain lines
  const xAxis = d3.axisBottom(xScale)
  
  const yAxis = d3.axisLeft(yScale)
  	// .tickFormat(yAxisTickFormat)
  
  //creating y axis lables
  const yAxisG = g.select('.y-axis');
  const yAxisGEnter = gEnter
		.append('g')
  		.attr('class', 'y-axis');
  yAxisG
  	.merge(yAxisGEnter)
  	.transition().duration(1000)
			.call(yAxis);
        
  const yAxisLabelText = yAxisGEnter
		.append('text')
      .attr('class', 'axis-label')
      .attr('y', -50)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
  	.merge(yAxisG.select('.axis-label'))
  	  .attr('x', -innerHeight / 2)
      .text(yAxisLabel);
  
  //creating x axis lables
  const xAxisG = g.select('.x-axis');
  const xAxisGEnter = gEnter
		.append('g')
  		.attr('class', 'x-axis');
  xAxisG
  	.merge(xAxisGEnter)
  		.attr('transform', `translate(0,${innerHeight})`)
			.call(xAxis)
  		.selectAll('.domain').remove();
        
  const xAxisLabelText = xAxisGEnter
		.append('text')
      .attr('class', 'axis-label')
      .attr('y', 55)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
  	.merge(xAxisG.select('.axis-label'))
  	  .attr('x', innerWidth / 2)
      .text(xAxisLabel);
  
  //creating vis title
  const titleG = g.select('.title');
  const titleGEnter = gEnter
		.append('g')
  		.attr('class', 'title');
  titleG
  	.merge(titleGEnter)
  	.transition().duration(1000)
        
  const titleText = titleGEnter
		.append('text')
      .attr('class', 'title')
      .attr('y', -30)
  		.attr('x', 80)
  	.merge(titleG.select('.title'))
      .text(titleLabel);
  
const rect = g.merge(gEnter)
  	.selectAll('rect').data(filtered_data);
  rect
    .enter().append('rect')
  	.merge(rect)
  		.transition().duration(1000)
			.attr('x', d =>xScale(xValue(d)))
  		.attr('y', d =>yScale(yValue(d)))
  		.attr('width', xScale.bandwidth())
  		.attr('height', d=> innerHeight - yScale(yValue(d)))
}
  
  
  
  
  
  