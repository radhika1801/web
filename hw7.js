let currentScene = 0;
let score = 0;
let avatar = 0;
const avatars = [];
let balloons = [];
let ducks = [];
let net;
let playAgainButton;
let arcadeFont;
let catchSound;
let popSound;
let duckCatchSound;

let confetti = [];
const confettiColor = ['#FF69B4', '#FFD700', '#ADFF2F', '#00BFFF', '#FF4500'];

let screen = 0;
let y = -20;
let x = 200;
let speed = 2;

const colours = ['red', 'blue', 'green', 'yellow', 'black'];
let fade = 255;
let fadeAmount = -5;
let fading = true;

function preload() {
  // Load fonts and sounds
  arcadeFont = loadFont('ARCADE_N.TTF');
  catchSound = loadSound('catch.mp3');
  popSound = loadSound('pop.mp3');
  duckCatchSound = loadSound('duck_catch.mp3');
  // Load avatars
  avatars[0] = loadImage('avatar1.png');
  avatars[1] = loadImage('avatar2.png');
  avatars[2] = loadImage('avatar3.png');
}

function setup() {
  createCanvas(600, 400);
  textFont(arcadeFont);
  setupBalloons();
  setupDucks();
  net = new Net();

  // Create "Play Again" button
  playAgainButton = createButton('Play Again');
  playAgainButton.style('font-family', 'ARCADE_N');
  playAgainButton.style('font-size', '16px');
  playAgainButton.position(width / 2 - 40, height / 2 + 20);
  playAgainButton.mousePressed(resetGame);
  playAgainButton.hide();

  // Initialize confetti
  for (let i = 0; i < 100; i++) {
    confetti.push(new Confetti(random(width), random(-200, 0), random(1, 3)));
  }
}

function draw() {
  clear();
  switch (currentScene) {
    case 0:
      playAgainButton.hide();
      introScene();
      break;
    case 1:
      catchingGame();
      break;
    case 2:
      balloonPopGame();
      break;
    case 3:
      duckPondGame();
      break;
    case 4:
      conclusionScene();
      break;
  }
  if (fading) fadeEffect();
}

function fadeEffect() {
  noStroke();
  fill(0, fade);
  rect(0, 0, width, height);
  fade += fadeAmount;
  if (fade <= 0) {
    fading = false;
  }
}

function introScene() {
  background('#F5F5DC');
  textSize(24);
  fill(0);
  text('Choose Your Avatar:', 80, 80);

  // Display avatars and highlight selected one
  avatars.forEach((av, index) => {
    let x = 100 + index * 150;
    let y = 150;

    if (index === avatar) {
      stroke('#FF69B4');
      strokeWeight(3);
      noFill();
      ellipse(x + 50, y + 50, 110, 110);
    }
    noStroke();
    image(av, x, y, 100, 100);
  });

  textSize(10);
  fill(0);
  noStroke();
  text('Use left/right arrows to select, press Space to confirm', 25, 350);
}

function catchingGame() {
  if (screen == 0) {
    startScreen();
  } else if (screen == 1) {
    gameOn();
  } else if (screen == 2) {
    screen = 0;
    currentScene++;
  }
}

function gameOn() {
  background('#222');
  noStroke();
  fill(255);
  textSize(height / 25);
  text(`Score: ${score}`, width / 12, height / 15);
  textSize(height / 35);
  text('Use the mouse to catch the ball!', width / 12, height / 8);

  // Draw ball with gradient
  push();
  let gradient = drawingContext.createRadialGradient(x, y, 5, x, y, 20);
  gradient.addColorStop(0, color('#FF5733'));
  gradient.addColorStop(1, color('#C70039'));
  drawingContext.fillStyle = gradient;
  ellipse(x, y, 20, 20);
  pop();

  // Draw player's net
  push();
  stroke('#FFC300');
  fill('#FF5733');
  rectMode(CENTER);
  rect(mouseX, height - 10, 60, 30, 10);
  line(mouseX - 30, height - 15, mouseX + 30, height - 15);
  pop();

  // Move ball
  y += speed;

  // Check if ball hits the bottom
  if (y > height) {
    screen = 2;
  }

  // Check if ball is caught
  if (y > height - 20 && x > mouseX - 30 && x < mouseX + 30) {
    y = -20;
    speed += 0.5;
    score += 10;
    catchSound.play();
  }

  // Reset ball position
  if (y == -20) {
    pickRandom();
  }
}

function pickRandom() {
  x = random(20, width - 20);
}

function balloonPopGame() {
  background('skyblue');
  drawDart();
  
  // Draw and move balloons
  balloons.forEach(balloon => {
    if (!balloon.popped) {
      drawBalloon(balloon);
      moveBalloon(balloon);
    }
  });

  noStroke();
  fill(255);
  textSize(height / 25);
  text(`Score: ${score}`, width / 30, height / 20);
  textSize(height / 35);
  text('Click the balloons to pop!', width / 30, height / 10);

  // Check if all balloons are popped
  if (balloons.every(b => b.popped)) {
    currentScene++;
  }
}

function drawBalloon(balloon) {
  noStroke();
  fill(balloon.colour);
  circle(balloon.x, balloon.y, 40);

  triangle(balloon.x, balloon.y + 20, balloon.x + 4, balloon.y + 26, balloon.x - 4, balloon.y + 26);

  fill(255, 75);
  ellipse(balloon.x - 5, balloon.y - 8, 7, 10);

  stroke(0);
  noFill();
  bezier(balloon.x, balloon.y + 26, balloon.x - 10, balloon.y + 46, balloon.x + 10, balloon.y + 70, balloon.x, balloon.y + 80);
}

function moveBalloon(balloon) {
  balloon.y += balloon.speed;
  if (balloon.y < -20) {
    balloon.y = height + 20;
    balloon.x = random(width);
    balloon.colour = random(colours);
  }
}

function drawDart() {
  push();
  strokeWeight(2);
  stroke('#8B0000');
  fill('#FF4500');
  triangle(mouseX, mouseY, mouseX - 10, mouseY + 20, mouseX + 10, mouseY + 20);
  stroke('#000');
  line(mouseX, mouseY + 20, mouseX, mouseY + 40);
  pop();
}

function setupBalloons() {
  // Initialize balloons with random positions and speeds
  balloons = Array.from({ length: 10 }, () => ({
    x: random(width),
    y: random(height, height + 200),
    speed: random(-1, -3),
    colour: random(colours),
    popped: false
  }));
}

function duckPondGame() {
  background('#87CEEB');
  // Render and update ducks
  ducks.forEach(duck => {
    duck.update();
    duck.render();
  });

  net.render();
  net.update();

  noStroke();
  fill(255);
  textSize(height / 25);
  text(`Score: ${score}`, width / 30, height / 20);
  textSize(height / 35);
  text('Use the net to catch ducks!', width / 30, height / 10);

  // Check if all ducks are caught
  if (ducks.every(d => d.caught)) {
    currentScene++;
  }
}

function setupDucks() {
  // Initialize ducks with random positions
  ducks = Array.from({ length: 5 }, () => new Duck(random(width), random(height - 150)));
}

function conclusionScene() {
  background('#E6E6FA');
  noStroke();
  fill(0);
  textSize(height / 28);
  text(`Congratulations! Your Final Score: ${score}`, width / 25, height / 2);

  // Display confetti
  confetti.forEach(c => c.confettiDisplay());

  playAgainButton.show();
}

function keyPressed() {
  // Change scenes and select avatars
  if (key === ' ') {
    currentScene = (currentScene + 1) % 5;
  }
  if (currentScene === 0) {
    if (keyCode === LEFT_ARROW) {
      avatar = (avatar > 0) ? avatar - 1 : avatars.length - 1;
    } else if (keyCode === RIGHT_ARROW) {
      avatar = (avatar < avatars.length - 1) ? avatar + 1 : 0;
    }
  }
}

function mousePressed() {
  // Start game and pop balloons
  if (screen == 0) {
    screen = 1;
  }

  if (currentScene === 2) {
    balloons.forEach(balloon => {
      let d = dist(mouseX, mouseY, balloon.x, balloon.y);
      if (d < 20 && !balloon.popped) {
        balloon.popped = true;
        score += 10;
        popSound.play();
      }
    });
  }
}

function reset() {
  // Reset ball parameters
  speed = 2;
  y = -20;
}

function resetGame() {
  // Reset game state
  currentScene = 0;
  score = 0;
  setupBalloons();
  setupDucks();
  playAgainButton.hide();
  screen = 0;
  fade = 255;
  fading = true;
}

class Duck {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 15;
    this.caught = false;
    this.speed = createVector(random(0.5, 1.5), random(-0.5, 0.5));
  }

  render() {
    if (!this.caught) {
      push();
      translate(this.pos.x, this.pos.y);
      scale(0.3);

      // Draw duck
      noStroke();
      fill(255, 204, 0);
      ellipse(0, 118, 160, 120);

      noStroke();
      fill(255, 204, 0);
      ellipse(0, 0, 150, 140);

      noStroke();
      fill(0);
      ellipse(-35, -10, 30, 35);
      ellipse(35, -10, 30, 35);

      noStroke();
      fill(255, 255, 255);
      ellipse(-37, -15, 10, 9);
      circle(-42, -6, 5);
      ellipse(32, -15, 10, 9);
      circle(28, -6, 5);

      noStroke();
      fill(230, 105, 0);
      rect(-49, 14, 100, 40, 50);
      bezier(-25, 14, -5, 0, 5, 0, 25, 14);
      ellipse(0, 45, 60, 25);

      stroke(200, 105, 0);
      strokeWeight(6);
      bezier(-34, 34, -26, 38, 29, 38, 37, 34);

      strokeWeight(8);
      point(-34, 34);
      point(37, 34);

      noStroke();
      fill(255, 204, 0);
      bezier(-25, 0, -5, -20, 5, -20, 25, 0);

      noStroke();
      fill(255, 204, 0);
      bezier(-28, -60, -5, -90, 5, -90, 28, -60);

      noStroke();
      fill(255, 204, 0);
      ellipse(0, 140, 150, 140);

      noStroke();
      fill(255, 204, 0);
      ellipse(-50, 140, 150, 140);

      noStroke();
      fill(255, 204, 0);
      bezier(-130, 70, -122, 110, -112, 110, -100, 80);

      pop();
    }
  }

  update() {
    if (!this.caught) {
      this.pos.add(this.speed);
      if (this.pos.x < 0 || this.pos.x > width) this.speed.x *= -1;
      if (this.pos.y < 0 || this.pos.y > height) this.speed.y *= -1;
    }
  }

  isCaught(net) {
    let d = dist(this.pos.x, this.pos.y, net.pos.x, net.pos.y);
    return d < this.r + net.r;
  }

  catch() {
    this.caught = true;
    duckCatchSound.play();
  }
}

class Net {
  constructor() {
    this.pos = createVector(mouseX, mouseY);
    this.r = 25;
  }

  render() {
    push();
    strokeWeight(2);
    stroke("brown");
    fill(150, 75, 0, 100);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    line(this.pos.x - this.r, this.pos.y, this.pos.x + this.r, this.pos.y);
    line(this.pos.x, this.pos.y - this.r, this.pos.x, this.pos.y + this.r);
    pop();
  }

  update() {
    this.pos.x = mouseX;
    this.pos.y = mouseY;
    ducks.forEach(duck => {
      if (duck.isCaught(this) && !duck.caught) {
        score += 10;
        duck.catch();
        increaseDuckSpeed();
      }
    });
  }
}

function increaseDuckSpeed() {
  ducks.forEach(duck => {
    duck.speed.x *= 1.1;
    duck.speed.y *= 1.1;
  });
}

class Confetti {
  constructor(_x, _y, _s) {
    this.x = _x;
    this.y = _y;
    this.speed = _s;
    this.time = random(0, 100);
    this.color = random(confettiColor);
    this.amp = random(2, 30);
    this.phase = random(0.5, 2);
    this.size = random(width / 25, height / 50);
    this.form = round(random(0, 1));
  }

  confettiDisplay() {
    fill(this.color);
    noStroke();
    push();
    translate(this.x, this.y);
    translate(this.amp * sin(this.time * this.phase), this.speed * cos(2 * this.time * this.phase));
    rotate(this.time);
    rectMode(CENTER);
    scale(cos(this.time / 4), sin(this.time / 4));
    if (this.form === 0) {
      rect(0, 0, this.size, this.size / 2);
    } else {
      ellipse(0, 0, this.size);
    }
    pop();

    this.time = this.time + 0.1;

    this.speed += 1 / 200;

    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-100, 0);
      this.x = random(width);
    }
  }
}