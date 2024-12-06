let angle = [];
let anglev = [];
let diam;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);

  let total = 35; // Total number of circles
  for (let i = 0; i < total; i++) {// loop
    angle[i] = 0; // Initialize angles to 0
    anglev[i] = i / 5 + 0.1; // Set angular velocity for each circle
  }
}

function draw() {
  backgroundGradient(); // Draw the gradient background

  let minSize = min(width, height);

  translate(width / 2, height / 2); // Center the drawing

  for (let i = 0; i < angle.length; i++) { //loop
    let x = map(i, 0, angle.length, -width / 2, width / 2);
    let y = map(sin(angle[i]), -1, 1, -height / 4, height / 4);

    angle[i] += anglev[i]; // Update angle for animation

    let threshold = width / 800;
    if (angle[i] > threshold) {
      diam = -minSize / 100 + angle[i] / 20;
    } else {
      diam = minSize / 100 - angle[i] / 20;
    }

    let a = map(i, 0, angle.length, 50, 255); // Vary transparency
    stroke(100, 150, 255, a); // Blue color with varying transparency
    strokeWeight(1.5);
    noFill();
    ellipse(x, y, diam * 1.2, diam * 0.8); // Draw ellipse
  }
}

function backgroundGradient() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(10, 20, 40), color(30, 60, 90), y / height);
    stroke(c);
    line(0, y, width, y); // Draw gradient line
  }
}