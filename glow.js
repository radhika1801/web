let font;
let letters = [];
let baseSize = 120;
let glowOffset = 0;
function preload() {
  font = loadFont('STIXGeneral.TTF');
}

function setup() {
  createCanvas(600, 600);
  textFont(font);
  let textToAnimate = "glow";
  let xOffset = 80; // Starting x position for the first letter
  for (let i = 0; i < textToAnimate.length; i++) {
    letters.push({
      char: textToAnimate[i],
      x: xOffset + i * 130, // Spacing between letters
      y: height / 2,
      angle: random(TWO_PI),
      scaleFactor: 1,
      speed: random(0.01, 0.03),
    });
  }
}

function draw() {
  background(10, 30, 60);
  noStroke();
  textAlign(CENTER, CENTER);

  // Loop through each letter
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];

    // Pulsating scale effect
    letter.scaleFactor = 1 + sin(frameCount * 0.02 + i) * 0.2;

    // Rotating effect
    letter.angle += letter.speed;

    // Glowing effect
    let coreColor = color(255, 255, 200);
    let outerColor = color(255, 255, 100);

    for (let j = 8; j > 0; j--) {
      fill(outerColor.levels[0], outerColor.levels[1], outerColor.levels[2], 10 * j); // Gradient transparency
      textSize(baseSize * letter.scaleFactor * (1 + j * 0.02));
      push();
      translate(letter.x, letter.y);
      rotate(letter.angle);
      text(letter.char, 0, 0);
      pop();
    }
    fill(coreColor);
    textSize(baseSize * letter.scaleFactor);
    push();
    translate(letter.x, letter.y);
    rotate(letter.angle);
    text(letter.char, 0, 0);
    pop();
  }
}