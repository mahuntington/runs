var WIDTH = 800;
var HEIGHT = 500;

d3.select('svg')
	.attr('width', WIDTH)
	.attr('height', HEIGHT);

d3.json('/runs', function(error, data){
	d3.select('svg').selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('r', 5)
		.attr('cx', function(datum, index){
			console.log(datum);
			//console.log(index);
			return index*100;
		});
});
