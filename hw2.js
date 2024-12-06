function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(240);
  drawFace();
}

function drawFace() {
  let faceSize = map(mouseX, 0, width, 50, 150);
  let eyeSize = map(mouseY, 0, height, 10, 30);
  let sparkleSize = eyeSize / 4;
  let earWidth = faceSize / 4;
  let earHeight = faceSize * 0.8;
  let mouthWidth = faceSize / 3;
  let mouthHeight = faceSize / 10;
  
  let centerX = width / 2;
  let centerY = height / 2;

  // colors and styles
  stroke(100, 100, 250);
  strokeWeight(2);
  fill(152, 255, 152, 180);

  //bunny ears
  ellipse(centerX - faceSize / 3, centerY - faceSize / 1.5, earWidth, earHeight);
  ellipse(centerX + faceSize / 3, centerY - faceSize / 1.5, earWidth, earHeight);

  //face with gradient effect
  for (let i = faceSize; i > 0; i -= 5) {
    fill(152, 255, 152, map(i, faceSize, 0, 180, 255));
    ellipse(centerX, centerY, i);
  }

  //eyes
  fill(255);
  stroke(0);
  strokeWeight(3);
  ellipse(centerX - faceSize / 5, centerY - faceSize / 10, eyeSize);
  ellipse(centerX + faceSize / 5, centerY - faceSize / 10, eyeSize);

  //pupil
  fill("orange");
  noStroke();
  ellipse(centerX - faceSize / 5, centerY - faceSize / 10, sparkleSize);
  ellipse(centerX + faceSize / 5, centerY - faceSize / 10, sparkleSize);

  //mouth
  stroke(0);
  strokeWeight(2);
  noFill();
  arc(centerX, centerY + faceSize / 5, mouthWidth, mouthHeight, 0, PI);
}

function mouseMoved() {
  redraw();
}