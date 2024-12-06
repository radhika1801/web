let angle = 0;

function setup() {
  createCanvas(400, 600);
}

function draw() {
  drawBackground();
  drawCatHead(width / 2, 130);
  drawCatBody(width / 2, 200);
  drawWigglingTail(width / 2, 300, angle);
  angle += 0.05; // Increment angle for tail wiggle
}

function drawBackground() {
  // Draw walls 
  background(220, 220, 250);
  
  // Draw the floor 
  fill(180, 130, 70);
  rect(0, height - 100, width, 100);

  // Draw a window on the wall
  fill(255);
  rect(50, 50, 100, 60);
  stroke(0);
  line(50, 80, 150, 80); 
  line(100, 50, 100, 110);

  // Draw a rug
  fill(255, 200, 150);
  ellipse(width / 2, height - 50, 200, 50);

  // Draw a picture frame on the wall
  fill(255);
  stroke(150);
  rect(250, 50, 80, 60);
  fill(100, 150, 200); 
  noStroke();
  rect(260, 60, 60, 40);

  // Draw a lamp 
  fill(255, 255, 200);
  stroke(150);
  rect(300, height - 150, 10, 100); // Lamp stand
  fill(255, 200, 0);
  arc(305, height - 150, 40, 20, PI, 0); // Lamp shade

  // Emit light from the lamp
  noStroke();
  fill(255, 255, 200, 100); // Light color
  ellipse(305, height - 150, 100, 50);
}

function drawCatHead(x, y) {
  fill(0);
  stroke(0);
  strokeWeight(2);
  ellipse(x, y, 150, 150); // Head

  // Ears
  triangle(x - 60, y - 50, x - 30, y - 110, x, y - 50);
  triangle(x + 60, y - 50, x + 30, y - 110, x, y - 50);
  
  // Eyes
  fill(255);
  ellipse(x - 30, y - 20, 20, 20);
  ellipse(x + 30, y - 20, 20, 20);
  
  // Teeth
  fill(255);
  beginShape();
  vertex(x - 40, y + 30);
  vertex(x - 30, y + 50);
  vertex(x - 20, y + 30);
  vertex(x - 10, y + 50);
  vertex(x, y + 30);
  vertex(x + 10, y + 50);
  vertex(x + 20, y + 30);
  vertex(x + 30, y + 50);
  vertex(x + 40, y + 30);
  endShape(CLOSE);
  
  // Whiskers
  stroke(255);
  strokeWeight(2);
  line(x - 75, y, x - 40, y - 10);
  line(x - 75, y + 10, x - 40, y);
  line(x - 75, y - 10, x - 40, y - 20);
  line(x + 75, y, x + 40, y - 10);
  line(x + 75, y + 10, x + 40, y);
  line(x + 75, y - 10, x + 40, y - 20);
}

function drawCatBody(x, y) {
  stroke(0);
  strokeWeight(2);
  fill(214, 94, 39);
  // Body shape
  beginShape();
  vertex(x - 40, y);
  vertex(x + 40, y);
  vertex(x + 20, y + 150);
  vertex(x - 20, y + 150);
  endShape(CLOSE);
  
  // Draw hands
  drawHand(x + 40, y + 40, -PI / 3);
  drawHand(x + 30, y + 90, -PI / 3);
  drawHand(x + 25, y + 140, -PI / 3);
  drawHand(x - 40, y + 65, PI / 3);
  drawHand(x - 40, y + 115, PI / 6);
}

function drawHand(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  
  fill("brown"); // Arm color
  beginShape();
  vertex(0, 0);
  vertex(10, -10);
  vertex(20, 40);
  vertex(0, 50);
  endShape(CLOSE);
  
  fill(160, 82, 45); // Finger color
  ellipse(10, 55, 15, 15);
  pop();
}

function drawWigglingTail(x, y, a) {
  push();
  translate(x, y);
  rotate(sin(a) * 0.1); // Tail wiggle effect

  stroke(0);
  strokeWeight(2);
  fill(70, 90, 110); // Tail color

  beginShape();
  vertex(0, 0);
  vertex(-20, 50);
  vertex(0, 100);
  vertex(20, 50);
  endShape(CLOSE);
  
  fill(218, 165, 32);
  noStroke();
  beginShape();
  vertex(0, 50);
  vertex(-5, 75);
  vertex(0, 100);
  vertex(5, 75);
  endShape(CLOSE);
  
  fill(218, 165, 32);
  stroke(0);
  strokeWeight(2);
  beginShape();
  vertex(0, 100);
  vertex(-15, 150);
  vertex(0, 200);
  vertex(15, 150);
  endShape(CLOSE);
  pop();
}