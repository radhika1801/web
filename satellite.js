let font;
let points = [];
let distortionStrength = 50;
let waveFrequency = 0.05;
let rotationSpeed = 0.02;

function preload() {
  font = loadFont('STIXGeneral.otf');
}

function setup() {
  createCanvas(600, 600);
  textFont(font);

  // Generate points for the word satellite
  points = font.textToPoints('satellite', -200, 0, 150, {
    sampleFactor: 0.2
  });
}

function draw() {
  background(204, 230, 202); 

  translate(width / 2, height / 2); // Center the text
  rotate(frameCount * rotationSpeed); // Add rotation
  let scaleFactor = 1 + sin(frameCount * waveFrequency) * 0.2; // Pulsating scaling
  scale(scaleFactor);

  // Draw animated concentric circles behind the text
  push();
  noFill();
  stroke(255, 182, 193, 50); // Light pink glow for circles
  strokeWeight(1.5);
  for (let r = 200; r <= 300; r += 20) {
    ellipse(0, 0, r + sin(frameCount * 0.05) * 10, r + cos(frameCount * 0.05) * 10); // Wavy distortion
  }
  pop();

  noStroke();

  // Loop through each point to create the dot formation
  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    // Calculate distortion based on frame count and mouse position
    let distance = dist(mouseX, mouseY, width / 2, height / 2);
    let distortionX =
      sin(frameCount * waveFrequency + p.y * 0.05) *
      distortionStrength *
      (1 / (distance + 1));
    let distortionY =
      cos(frameCount * waveFrequency + p.x * 0.05) *
      distortionStrength *
      (1 / (distance + 1));
    let distortedX = p.x + distortionX;
    let distortedY = p.y + distortionY;

    // Diffused glow effect
    for (let j = 4; j > 0; j--) {
      fill(255, 182, 193, 50 / j); 
      ellipse(distortedX, distortedY, j * 8, j * 8); 
    }
    fill(255, 182, 193);
    ellipse(distortedX, distortedY, 6, 6);
  }
}