var WIDTH = 800;
var HEIGHT = 500;

d3.select('svg')
	.attr('width', WIDTH)
	.attr('height', HEIGHT);

var convertYDataPointToVisualPoint = d3.scaleLinear();
var convertXDataPointToVisualPoint = d3.scaleTime();

// console.log(convertXDataPointToVisualPoint(new Date('2016-12-1')));
// console.log(convertXDataPointToVisualPoint.invert(490));

// console.log(convertYDataPointToVisualPoint(0.1));
// console.log(convertYDataPointToVisualPoint.invert(490));

var generateCircles = function(data){
	var circles = d3.select('#points').selectAll('circle').data(data, function(datum){
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

	//....
	//define callbacks for dragging
	var dragEnd = function(d){ //d is the data for the dragged object
		var x = d3.event.x;
		var y = d3.event.y;

		var date = convertXDataPointToVisualPoint.invert(x);
		var distance = convertYDataPointToVisualPoint.invert(y);

		d.date = date;
		d.distance = distance;

		d3.request('/runs/'+d.id)
			.header("Content-Type","application/json") //we're sending JSON
			.send('PUT', JSON.stringify(d), render);//pass alterted 'd' object to API
	}
	var drag = function(d){ //d is the data for the dragged object
		var x = d3.event.x; //x position of cursor
		var y = d3.event.y; //y position of cursor
		d3.select(this).attr('cx', x);
		d3.select(this).attr('cy', y);
	}
	//create the behavior
	var dragBehavior = d3.drag()
		// .on('start', dragStart)
		.on('drag', drag)
		.on('end', dragEnd);
	//...
	//apply it to a selection
	d3.selectAll('circle').call(dragBehavior);
}
var render = function(){
	d3.json('/runs', function(error, data){
		generateCircles(data);
	});
};

// window.setTimeout(function(){
// 	render();
// },2000)

var lastTransform = null;
d3.select('svg').on('click', function(){
	var x = d3.event.offsetX; //use offset to get point within svg container
	var y = d3.event.offsetY;

	if(lastTransform !== null){
		x = lastTransform.invertX(d3.event.offsetX); //use offset to get point within svg container
		y = lastTransform.invertY(d3.event.offsetY);
	}

	var distance = convertYDataPointToVisualPoint.invert(y);
	var date = convertXDataPointToVisualPoint.invert(x);
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

d3.json('/runs', function(error, data){
	var distanceDomain = d3.extent(data, function(element){
		return element.distance;
	});
	var dateDomain = d3.extent(data, function(element){
		return new Date(element.date);
	});
	convertYDataPointToVisualPoint.range([HEIGHT,0]);
	convertYDataPointToVisualPoint.domain(distanceDomain);

	convertXDataPointToVisualPoint.range([0,WIDTH]);
	convertXDataPointToVisualPoint.domain(dateDomain);

	var leftAxis = d3.axisLeft(convertYDataPointToVisualPoint); //create a left axis based on the yScale
	var bottomAxis = d3.axisBottom(convertXDataPointToVisualPoint); //create a left axis based on the yScale
	d3.select('svg')
		.append('g') //append a group element
		.attr('id', 'y-axis')
		.call(leftAxis); //apply the axis to it
	d3.select('svg')
		.append('g') //append a group element
		.attr('id', 'x-axis')
		.attr('transform', 'translate(0,'+HEIGHT+')')
		.call(bottomAxis); //apply the axis to it


	var zoomCallback = function(){
		lastTransform = d3.event.transform; //save the transform for later inversion with clicks
		d3.select('#points').attr("transform", d3.event.transform);
		d3.select('#x-axis').call(bottomAxis.scale(d3.event.transform.rescaleX(convertXDataPointToVisualPoint)));
		d3.select('#y-axis').call(leftAxis.scale(d3.event.transform.rescaleY(convertYDataPointToVisualPoint)));
	}
	var zoom = d3.zoom().on('zoom', zoomCallback);
	d3.select('svg').call(zoom);

	generateCircles(data);
});



//Date Parsing/Formatting
// var dateSting = '20160101';
// var dateFormat = '%Y%m%d';

// var parseSAPDateString = d3.timeParse(dateFormat);
// console.log(parseSAPDateString('20160101'));

// var formatDateForSAP = d3.timeFormat(dateFormat);
// console.log(formatDateForSAP(new Date()));
