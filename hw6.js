let spiceData = [
  [3, 2, 0, 4, 2, 3], // Sunday
  [2, 3, 3, 0, 1, 0], // Monday
  [0, 0, 2, 3, 3, 2], // Tuesday
  [1, 2, 0, 3, 3, 0], // Wednesday
  [3, 3, 1, 0, 4, 2], // Thursday
  [2, 4, 2, 1, 0, 3], // Friday
  [0, 2, 3, 4, 1, 0]  // Saturday
];

// let spices = ['Turmeric', 'Chili', 'Cumin', 'Coriander', 'Salt', 'Garam Masala'];
let colors = ['#FFD700', '#FF6347', '#CD853F', '#32CD32', '#FFFFFF', '#8B4513'];
let days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
let maxAngle = 0; //controls the animation for the spcice arcs

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
}

function draw() {
  background(30, 30, 50);
  translate(width / 2, height / 2);

  // increment maxAngle for animation
  maxAngle = min(maxAngle + 2, 360);

  for (let day = 0; day < spiceData.length; day++) {
    // Calculate center for each day's dial
    let baseAngle = (360 / spiceData.length) * day - 90;
    let xCenter = 200 * cos(baseAngle);
    let yCenter = 200 * sin(baseAngle);
    
    // draw day circle
    fill(118, 166, 161);
    noStroke();
    ellipse(xCenter, yCenter, 50);

    // days of the week
    fill(255);
    textSize(12);
    textFont('courier new');
    textAlign(CENTER, CENTER);
    text(days[day], xCenter, yCenter - 0);

    for (let i = 0; i < spiceData[day].length; i++) {
      // calculate end angle for each spice
      let targetAngle = map(spiceData[day][i], 0, 5, 0, 360);
      let angle = min(targetAngle, maxAngle);
      let dialRadius = 40 + i * 15;
      
      // draw spice usage arc
      stroke(colors[i]);
      strokeWeight(3);
      noFill();
      arc(xCenter, yCenter, dialRadius, dialRadius, -90, -90 + angle);
      
      // draw label dot
      fill(colors[i]);
      noStroke();
      let labelX = xCenter + (dialRadius / 2) * cos(-90 + angle);
      let labelY = yCenter + (dialRadius / 2) * sin(-90 + angle);
      ellipse(labelX, labelY, 5);
    }
  }
}