
function setup() {
	createCanvas(400, 400);
}
//speed and on variables
var speed = 2.5;
var on = false;

//x-axis and green variables
var car = {
	x: 0,
	g: 250
};

//sky colour
var sky = {
	col1: 255,
	col2: 100,
	col3: 0,
	col4: 200
};

function draw() {
	//mapping for the colour of the sky and the car
	//as it travels along the x-axis
	sky.col1 = map(car.x, 0, 500, 255, 0);
	sky.col2 = map(car.x, 0, 500, 220, 0);
	sky.col3 = map(car.x, 0, 500, 0, 255);
	sky.col4 = map(car.x, 0, 500, 150, 80);
	car.g = map(car.x, 0, 500, 250, 0);

	//the sky background changing as the car travels
	background(0, sky.col2, sky.col1);


	//sun
  push()
  	noStroke();
	fill(255, 255, sky.col3);
	ellipse(50, 50, 60, 60);
  pop()

	//road
  push()
  	noStroke();
	fill(sky.col4);
	rect(0, 250, 499, 250);
pop()
  
	//car
  fill("yellow");
	rect(car.x, 198, 110, 50, 20);
  push()
    blendMode(BLEND)
	fill(0);
	ellipse(car.x, 250, 40, 40);
	ellipse(car.x + 110, 250, 40, 40);
  pop()

  //boolean statement for the car turning around	
	if (car.x + 110 >= width || car.x < 0) {
		speed = speed * -1;
	}

	//speed of the car
	car.x = car.x + speed;

}

