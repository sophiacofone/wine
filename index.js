import { dropdown_menu } from './dropdown_menu';
import { bar } from './bar';

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

let data;
let yColumn;
const onYColumnClicked = column => {
  yColumn = column;
  render();
};

const render = () => {
  
  d3.select('#y-menu')
	.call(dropdown_menu, {
  	options: ['fixed_acidity','volatile_acidity','citric_acid','residual_sugar','chlorides','free_sulfur_dioxide','pH','sulphates','alcohol','quality'],
    onOptionClicked: onYColumnClicked 
});    
	const titley = String(yColumn)
  const title_text = "White Wine Quality ranked by " + titley
	svg.call(bar, {
		xAxisLabel: 'Quality',
    title: title_text,
		yValue: d => d[yColumn],
    xValue: d => d.quality,
		yAxisLabel: yColumn,
    margin: { top: 80, right: 100, bottom: 150, left: 100 },
    width,
    height,
    data
  });
  
};

d3.dsv(';','data.csv').then(loadedData => {
  data = loadedData;
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
  yColumn = data.columns[0]
  render();
});