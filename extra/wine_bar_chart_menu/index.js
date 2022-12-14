import { dropdown_menu } from './dropdown_menu';
import { bar } from './bar';

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');
      

let data;

let yColumn;
let wine_type;

const onYColumnClicked = column => {
  yColumn = column;
  render();
};

const onDatasetClicked = column => {
  wine_type = column;
  render();
};

const render = () => {

  d3.select('#y-menu')
	.call(dropdown_menu, {
  	options: ['fixed_acidity','volatile_acidity','citric_acid','residual_sugar','chlorides','free_sulfur_dioxide','pH','sulphates','alcohol','quality'],
    onOptionClicked: onYColumnClicked 
});    
  
  d3.select('#data-menu')
    .call(dropdown_menu, {
      options: ['White Wine','Red Wine'],
      onOptionClicked: onDatasetClicked
    });
	
  const titley = String(yColumn)

  svg.call(bar, {
		xAxisLabel: 'Quality',
    titleLabel: "White Wine Quality ranked by " + yColumn,
		yValue: d => d[yColumn],
    xValue: d => d.quality,
		yAxisLabel: yColumn,
    margin: { top: 80, right: 100, bottom: 150, left: 100 },
    width,
    height,
    wine_type,
    data
  });

};
d3.csv('data_wine.csv').then(loadedData => {
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
    	d.wine_type = d.wine_type;
  });
  yColumn = 'fixed_acidity'
  wine_type = 'White Wine'
  render();

});