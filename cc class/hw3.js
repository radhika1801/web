let sleepStages = [
  { 
    name: "REM", 
    pattern: drawDream, // Function to draw the REM pattern
    colors: ['#FF5733', '#FFC300', '#DAF7A6'] 
  },
  { 
    name: "Light Sleep", 
    pattern: drawSpirals, // Function to draw the Light Sleep pattern
    colors: ['#3498DB', '#9B59B6', '#FFFFFF']
  },
  { 
    name: "Deep Sleep", 
    pattern: drawCircles, // Function to draw the Deep Sleep pattern
    colors: ['#27AE60', '#2ECC71', '#1F7A1F'] 
  }
];

let currentStageIndex = 0; // 
let stageDuration = 5000; // Duration each stage is displayed
let lastStageChange = 0; 
function setup() {
  createCanvas(600, 600);
  noStroke(); // 
  lastStageChange = millis(); 
}

function draw() {
  background(20);

  // Check if it's time to change the sleep stage
  if (millis() - lastStageChange > stageDuration) {
    currentStageIndex = (currentStageIndex + 1) % sleepStages.length; 
    lastStageChange = millis(); 
  }

  let currentStage = sleepStages[currentStageIndex]; 
  drawClock(currentStage.colors); 
  let interactionFactor = map(mouseX, 0, width, 0.5, 1.5); 
  push(); // Save current draw state
  translate(width / 2, height / 2); 
  currentStage.pattern(currentStage.colors, interactionFactor); 
  pop();

  // Display current sleep stage text
  fill(255); 
  textSize(20);
  textFont('times');
  text("Sleep Stage: " + currentStage.name, 215, 50);
}

// Function to draw clock hands
function drawClock(colors) {
  push();
  translate(width / 2, height / 2);

  let hr = hour() % 12; 
  let min = minute();
  let sec = second();

  strokeWeight(8); 
  
  // Draw hour hand
  stroke(colors[0]);
  let endX = cos(map(hr, 0, 12, 0, TWO_PI) - HALF_PI) * 100;
  let endY = sin(map(hr, 0, 12, 0, TWO_PI) - HALF_PI) * 100; 
  line(0, 0, endX, endY);
  
  // Draw minute hand
  stroke(colors[1]); 
  endX = cos(map(min, 0, 60, 0, TWO_PI) - HALF_PI) * 150; 
  endY = sin(map(min, 0, 60, 0, TWO_PI) - HALF_PI) * 150; 
  line(0, 0, endX, endY); 

  // Draw second hand
  stroke(colors[2] || color(255)); 
  endX = cos(map(sec, 0, 60, 0, TWO_PI) - HALF_PI) * 180; 
  endY = sin(map(sec, 0, 60, 0, TWO_PI) - HALF_PI) * 180; 
  line(0, 0, endX, endY); 
  fill(255);
  ellipse(0, 0, 10, 10); 
  pop(); 
}

// Function to draw REM stage pattern
function drawDream(colors, interactionFactor) {
  let numShapes = 20 * interactionFactor; 
  for (let i = 0; i < numShapes; i++) {
    let angle = map(i, 0, numShapes, 0, TWO_PI);
    let radius = 200 + 50 * sin(frameCount * 0.1 + i); 
    let x = cos(angle) * radius; // Calculate x position
    let y = sin(angle) * radius; // Calculate y position
    let size = 15 + 10 * sin(frameCount * 0.05 + i); 
    fill(random(colors)); 
    ellipse(x, y, size, size); 
  }
}

// I modified the code from these tutorials from youtube: https://www.youtube.com/watch?v=5eYoCqV19lc, https://www.youtube.com/watch?v=HQ9FO9ENMYs
// Function to draw Light Sleep stage pattern
function drawSpirals(colors, interactionFactor) {
  let rotationSpeed = 0.03 * interactionFactor; 
  let spiralRadius = 250;
  for (let i = 0; i < 150; i++) {
    let angle = map(i, 0, 150, 0, TWO_PI * 6);
    let radius = spiralRadius * (i / 150); 
    let x = cos(angle + frameCount * rotationSpeed) * radius; 
    let y = sin(angle + frameCount * rotationSpeed) * radius; 
    fill(lerpColor(color(colors[0]), color(colors[1]), i / 150)); 
    ellipse(x, y, 8, 8); 
    stroke(colors[1]);
    line(0, 0, x, y);
  }
}

// Function to draw Deep Sleep stage pattern
function drawCircles(colors, interactionFactor) {
  let circleSize = 60 * interactionFactor; // Size of circles
  let closerRadius = 180; 
  for (let i = 0; i < 8; i++) {
    let angle = map(i, 0, 8, 0, TWO_PI); 
    let x = cos(angle + frameCount * 0.02) * closerRadius;
    let y = sin(angle + frameCount * 0.02) * closerRadius; 
    fill(colors[i % colors.length]); 
    ellipse(x, y, circleSize, circleSize); 
  }
}

//mouse clicked
function mouseClicked() {
  currentStageIndex = (currentStageIndex + 1) % sleepStages.length; // Move to next stage
  lastStageChange = millis(); 
}