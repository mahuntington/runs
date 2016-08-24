var WIDTH = 800;
var HEIGHT = 500;

d3.select('svg')
	.attr('width', WIDTH)
	.attr('height', HEIGHT);

var convertYDataPointToVisualPoint = d3.scaleLinear();
var convertXDataPointToVisualPoint = d3.scaleTime();

convertYDataPointToVisualPoint.range([HEIGHT,0]);
convertYDataPointToVisualPoint.domain([0, 5]);

convertXDataPointToVisualPoint.range([0,WIDTH]);
convertXDataPointToVisualPoint.domain([new Date('2016-1-1'), new Date('2017-1-1')]);

// console.log(convertXDataPointToVisualPoint(new Date('2016-12-1')));
// console.log(convertXDataPointToVisualPoint.invert(490));

// console.log(convertYDataPointToVisualPoint(0.1));
// console.log(convertYDataPointToVisualPoint.invert(490));

var render = function(){
	d3.json('/runs', function(error, data){
		var circles = d3.select('svg').selectAll('circle').data(data, function(datum){
			return datum.id;
		});
		circles.enter()
			.append('circle')
			.attr('cy', function(datum, index){
				return convertYDataPointToVisualPoint(datum.distance);
			})
			.attr('cx', function(datum, index){
				return convertXDataPointToVisualPoint(new Date(datum.date));
			});
		circles.exit().remove();
		d3.selectAll('circle').on('click', function(datum, index){
			//send delete
			d3.event.stopPropagation();
			d3.request('/runs/'+datum.id)
				.header("Content-Type", "application/json") //we're sending data
				.send('DELETE', render); //send a DELETE request
		});
	});
};

render();

d3.select('svg').on('click', function(){
	var distance = convertYDataPointToVisualPoint.invert(d3.event.offsetY);
	var date = convertXDataPointToVisualPoint.invert(d3.event.offsetX);
	var runObject = {
		distance: distance,
		date: date
	};
	d3.request('/runs') //make a request to the server
		.header("Content-Type", "application/json") //tell the server we're sending JSON data
		.post(
			//must turn data object into string
			JSON.stringify(runObject),
			render
		);
});
