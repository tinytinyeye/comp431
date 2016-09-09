'use strict'

var blgs = [];

var tick = 0;
var tick2 = 0;

// var img = "http://a.dryicons.com/images/icon_sets/travel_and_tourism_part_1/png/128x128/car.png"
// var img = "http://www.clipartkid.com/images/56/blue-car-clip-art-at-clker-com-vector-clip-art-online-royalty-free-TjRwNx-clipart.png";

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 
	var lightColor = ['yellow', 'black']; 

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		var blgStyle = blgColors[Math.floor(Math.random()*blgColors.length)];
		c.fillStyle= blgStyle;
		var blg = {x: x0, width: blgWidth, height: blgHeight, style: blgStyle};
		blgs.push(blg);
		// console.log(blgs);
		
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		// c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle=lightColor[Math.floor(Math.random()*lightColor.length)]
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}

	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	setInterval(repaint, 100);
}

window.onclick = function(MouseEvent) {
	var x = MouseEvent.clientX;
	var y = MouseEvent.clientY;
	var canvas = document.querySelector("canvas");
    // var ctx = canvas.getContext("2d");
    var floor = canvas.height/2;
    // console.log(blgs);
	blgs.forEach(function(blg) {
		// console.log(blg);
		// console.log("mouse is " + x + " " + y);
		// console.log("x0 is " + blg.x);
		// console.log("width is " + blg.width);
		// console.log("height is " + blg.height);
		if ((x >= blg.x) && (x <= (blg.x + blg.width)) && (y <= floor) && (y >= floor - blg.height)) {
			console.log("after if");
			blg.height += 3;
			repaint();
			// ctx.clearRect(blg.x0, floor - blg.height, blg.width, blg.height);
			// ctx.
		}
	});
}

function repaint() {
	// console.log("in repaint");
	// console.log(blgs);
	clearCanvas();
	paintSun();
	var canvas = document.querySelector("canvas");
    var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 
	var lightColor = ['yellow', 'black']; 

	blgs.forEach(function(blg) {
		var x0 = blg.x
		var blgWidth = blg.width
		var blgHeight = blg.height
		c.fillStyle= blg.style
		// console.log(blgs);
		
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		// c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle=lightColor[Math.floor(Math.random()*lightColor.length)]
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	});
	paintCar();
}

function clearCanvas() {
	var canvas = document.querySelector("canvas");
    var c = canvas.getContext("2d");
    c.clearRect(0, 0, 800, 800)
}

function paintSun() {
	var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var r = 350;
    var theta =  Math.PI - ((tick * 5) / 360) * Math.PI;
	ctx.beginPath();
    ctx.arc(400 + r * Math.cos(theta), 400 - r * Math.sin(theta), 20, 0, 2*Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    if (tick >= 72) {
    	tick = 0;
    } else {
		tick++;    	
    }
}

function paintCar() {
	var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = "http://a.dryicons.com/images/icon_sets/travel_and_tourism_part_1/png/128x128/car.png";
    ctx.drawImage(img, tick2 * 10, 315);
    if (tick2 >= 80) {
    	tick2 = 0;
    } else {
		tick2++;    	
    }
}