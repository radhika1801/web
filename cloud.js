let font;
let points = [];

function preload() {
  font = loadFont('STIXGeneral.otf');
}

function setup() {
  createCanvas(600, 600);
  textFont(font);

  // convert clouds into points
  points = font.textToPoints('clouds', 100, 300, 150, {
    sampleFactor: 0.1, // Determines point density
  });
}

function draw() {
  background("#6A8FE2");
  noStroke();

  // Loop through each point
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let offsetX = sin((frameCount + p.y) * 0.02) * 5; 
    let offsetY = cos((frameCount + p.x) * 0.02) * 5;

    // Pulsating effect for size
    let size = 5 + sin((frameCount + p.x * 0.1 + p.y * 0.1) * 0.05) * 3;

    fill(255, 255, 255, 200);
    ellipse(p.x + offsetX, p.y + offsetY, size, size);
  }
}