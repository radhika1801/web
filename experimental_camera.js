let capture;
let slitImages = [];
let cap = 5;
let memoryFrames = [];
let sharedMemories = [];
let divergentMemories = [];
let identityShift = 0;
let snapshots = [];
let particles = [];
let emotionColors = ["#FF5555", "#55FF55", "#5555FF", "#FFFF55", "#FF55FF"];
let clickTime = 0;
let yellowText = "#FFD700";
let snowflakePoints = [];
let showInstructions = true;

function setup() {
  createCanvas(800, 400);
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(width/cap, height/cap);
  capture.hide();
  
  for (let i = 0; i < 15; i++) {
    memoryFrames[i] = createImage(Math.floor(width/3), height);
    if (i < 7) sharedMemories[i] = createImage(Math.floor(width/6), Math.floor(height/6));
    if (i < 5) divergentMemories[i] = createImage(Math.floor(width/8), Math.floor(height/8));
  }
  
  generateSnowflakePoints();
  createInstructions();
}

function generateSnowflakePoints() {
  let arms = 6, centerX = 0, centerY = 0, radius = 12;
  
  for (let a = 0; a < TWO_PI; a += TWO_PI / arms) {
    let x1 = centerX + cos(a) * radius * 0.4;
    let y1 = centerY + sin(a) * radius * 0.4;
    let x2 = centerX + cos(a) * radius;
    let y2 = centerY + sin(a) * radius;
    
    snowflakePoints.push({x1, y1, x2, y2});
    
    let branch1Angle = a + PI/6;
    let x3 = x2 + cos(branch1Angle) * radius * 0.4;
    let y3 = y2 + sin(branch1Angle) * radius * 0.4;
    
    snowflakePoints.push({x1: x2, y1: y2, x2: x3, y2: y3});
    
    let branch2Angle = a - PI/6;
    let x4 = x2 + cos(branch2Angle) * radius * 0.4;
    let y4 = y2 + sin(branch2Angle) * radius * 0.4;
    
    snowflakePoints.push({x1: x2, y1: y2, x2: x4, y2: y4});
  }
}

function draw() {
  if (showInstructions) {
    displayInstructions();
    return;
  }
  
  background(20);
  textStyle(NORMAL);
  textFont('Helvetica, Arial, sans-serif');
  
  if (frameCount % 45 === 0) {
    let memoryIndex = frameCount % 15;
    memoryFrames[memoryIndex] = capture.get();
    
    if (random() > 0.7 && frameCount % 90 === 0) {
      let sharedIndex = frameCount % 7;
      sharedMemories[sharedIndex].copy(capture, 0, 0, capture.width, capture.height, 
                                      0, 0, sharedMemories[sharedIndex].width, sharedMemories[sharedIndex].height);
    }
    
    if (random() > 0.6 && frameCount % 75 === 0) {
      let divergentIndex = frameCount % 5;
      divergentMemories[divergentIndex].copy(capture, 0, 0, capture.width, capture.height, 
                                            0, 0, divergentMemories[divergentIndex].width, divergentMemories[divergentIndex].height);
    }
  }
  
  identityShift = map(sin(frameCount * 0.01), -1, 1, 0, 1);
  
  // LEFT SECTION
  push();
  let selfOffsetX = sin(frameCount * 0.03) * 5;
  image(capture, selfOffsetX, 0, width/3, height);
  
  for (let i = 0; i < height; i += 15) {
    if (noise(i, frameCount * 0.01) > 0.6) {
      stroke(255, 120);
      strokeWeight(1);
      line(0, i, width/3, i + random(-5, 5));
    }
  }
  
  push();
  tint(255, 0, 0, 60 + (identityShift * 40)); 
  image(capture, selfOffsetX - 3, -2, width/3, height);
  tint(0, 255, 0, 70); 
  image(capture, selfOffsetX, 0, width/3, height);
  tint(0, 0, 255, 60 + ((1-identityShift) * 40));
  image(capture, selfOffsetX + 3, 2, width/3, height);
  pop();
  
  if (frameCount > 100) {
    for (let i = 0; i < 3; i++) {
      let memIndex = (frameCount + i * 123) % memoryFrames.length;
      if (memoryFrames[memIndex]) {
        push();
        tint(255, 90 + sin(frameCount * 0.1 + i) * 40);
        let fragmentX = random(width/10, width/4);
        let fragmentY = random(height/10, height-height/4);
        let fragmentW = random(40, 80);
        let fragmentH = random(30, 60);
        
        image(memoryFrames[memIndex], 
              fragmentX, fragmentY, fragmentW, fragmentH,
              fragmentX, fragmentY, fragmentW, fragmentH);
        
        noFill();
        stroke(255, 120);
        strokeWeight(1);
        rect(fragmentX-2, fragmentY-2, fragmentW+4, fragmentH+4);
        pop();
      }
    }
  }
  
  if (snapshots.length > 0) {
    for (let i = 0; i < min(snapshots.length, 2); i++) {
      push();
      tint(255, 180);
      let snapshotX = 20;
      let snapshotY = height - 100 - (i * 80);
      let snapshotSize = 70;
      
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = color(255, 180);
      image(snapshots[i], snapshotX, snapshotY, snapshotSize, snapshotSize * 0.75);
      
      fill(yellowText);
      noStroke();
      textSize(10);
      text("My memory", snapshotX + snapshotSize/2, snapshotY + snapshotSize * 0.75 + 12);
      pop();
    }
  }
  
  // Title with black background highlight
  drawTitleWithHighlight("MY PERCEPTION", width/6, 30);
  
  for (let i = 0; i < 200; i++) {
    let x = random(0, width/3);
    let y = random(0, height);
    let thoughtSize = random(1, 2);
    let thoughtOpacity = random(30, 150) * identityShift;
    fill(255, thoughtOpacity);
    noStroke();
    rect(x, y, thoughtSize, thoughtSize);
  }
  
  if (mouseX < width/3 && frameCount % 5 === 0 && pmouseX !== mouseX && pmouseY !== mouseY) {
    let moveSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
    if (moveSpeed > 2) {
      particles.push({
        x: mouseX,
        y: mouseY,
        size: random(3, 8),
        color: color(255, random(150, 255), random(150, 255), 150),
        vx: random(-0.5, 0.5),
        vy: random(-0.5, 0.5),
        life: 60
      });
    }
  }
  pop();

  // MIDDLE SECTION
  push();
  image(capture, width/3, 0, width/3, height);
  
  noFill();
  stroke(255, 100);
  strokeWeight(2);
  rect(width/3 + 5, 5, width/3 - 10, height - 10);
  
  // Title with black background highlight
  drawTitleWithHighlight("HOW OTHERS SEE US BOTH", width/2, 30);
  
  if (mouseX > width/3 && mouseX < 2*width/3) {
    fill(yellowText);
    textSize(10);
    textAlign(CENTER);
    text("Double-click to take a snapshot", width/2, height - 25);
    
    if (frameCount % 4 === 0 && pmouseX !== mouseX && pmouseY !== mouseY) {
      let moveSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
      if (moveSpeed > 2) {
        particles.push({
          x: mouseX,
          y: mouseY,
          size: random(2, 6),
          color: color(random(200, 255), random(200, 255), 255, 150),
          vx: (mouseX - pmouseX) * 0.1,
          vy: (mouseY - pmouseY) * 0.1,
          life: 40
        });
      }
    }
  }
  pop();

  // RIGHT SECTION
  push();
  translate(width, 0);
  scale(-1, 1);
  
  capture.loadPixels();
  
  let scaleX = (width/3) / (capture.width * cap);
  let scaleY = height / (capture.height * cap);
  
  for (let x = 0; x < capture.width; x++) {
    for (let y = 0; y < capture.height; y++) {
      let pNum = (x + y * (capture.width)) * 4;
      let r = capture.pixels[pNum];
      let g = capture.pixels[pNum + 1];
      let b = capture.pixels[pNum + 2];
      
      let mouseInfluence = 0;
      if (mouseX > 2*width/3) {
        let mouseDistX = abs(mouseX - (2*width/3 + x*cap*scaleX));
        let mouseDistY = abs(mouseY - y*cap*scaleY);
        mouseInfluence = constrain(1 - (mouseDistX + mouseDistY) / 200, 0, 1);
      }
      
      let clr = map(r, 0, 255, 0, 230) * (1 + identityShift * 0.2 + mouseInfluence * 0.5);
      let clg = map(g, 0, 255, 0, 230) * (1 - identityShift * 0.1 + mouseInfluence * 0.3);
      let clb = map(b, 0, 255, 51, 255) * (1 + mouseInfluence * 0.2);
      
      let alp = 80 + (identityShift * 60);
      
      fill(clr, clg, clb, alp);
      noStroke();
      rectMode(CENTER);
      
      let rightX = x * cap * scaleX + sin(frameCount * 0.01 + y * 0.1) * 2;
      let rightY = y * cap * scaleY;
      
      let pixelSize = 4 + identityShift * 2 + (mouseInfluence * 4);
      
      rect(rightX, rightY, pixelSize, pixelSize);
    }
  }
  pop();
  
  // Title with black background highlight for right section
  drawTitleWithHighlight("MY TWIN'S PERCEPTION", width - width/6, 30);
  
  if (mouseX > 2*width/3) {
    fill(yellowText);
    textSize(10);
    textAlign(CENTER);
    text("Move mouse to influence twin's perception", width - width/6, height - 25);
    
    if (frameCount % 3 === 0 && pmouseX !== mouseX && pmouseY !== mouseY) {
      let moveSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
      if (moveSpeed > 1.5) {
        let emotionColor = color(emotionColors[floor(random(emotionColors.length))]);
        particles.push({
          x: mouseX,
          y: mouseY,
          size: random(6, 12),
          color: emotionColor,
          vx: (mouseX - pmouseX) * 0.2,
          vy: (mouseY - pmouseY) * 0.2,
          life: 60
        });
      }
    }
  }
  
  if (frameCount > 200) {
    for (let i = 0; i < divergentMemories.length; i++) {
      if (random() > 0.93) {
        push();
        tint(200 + identityShift * 55, 
             100 + (1-identityShift) * 155, 
             255, 180);
        
        let divergentX = 2*width/3 + random(width/15, width/3 - width/8);
        let divergentY = random(height/4, 3*height/4);
        
        image(divergentMemories[i], divergentX, divergentY);
        
        if (random() > 0.7) {
          fill(yellowText);
          textSize(10);
          text("Different perception", divergentX + divergentMemories[i].width/2, 
               divergentY + divergentMemories[i].height + 10);
        }
        pop();
      }
    }
  }
  
  push();
  stroke(255, 80 + sin(frameCount * 0.05) * 40);
  strokeWeight(0.5);
  let lineCount = 8;
  for (let i = 0; i < lineCount; i++) {
    let y = map(i, 0, lineCount-1, height*0.2, height*0.8);
    line(width/3 - 5, y, width/3 + 5, y);
    line(2*width/3 - 5, y, 2*width/3 + 5, y);
  }
  pop();
  
  if (sin(frameCount * 0.01) > 0.8) {
    push();
    let titleOpacity = map(sin(frameCount * 0.01), 0.8, 1, 0, 255);
    
    // Title with highlight for main title
    let mainTitle = "Same/Different: Twin Reality";
    let titleWidth = textWidth(mainTitle);
    fill(0, 120);
    noStroke();
    rect(width/2 - titleWidth/2 - 5, height - 35, titleWidth + 10, 25, 5);
    
    fill(255, 215, 0, titleOpacity);
    textSize(18);
    textAlign(CENTER);
    text(mainTitle, width/2, height - 20);
    pop();
  }
  
  updateParticles();
  drawSnowflakeButton();
}

function drawTitleWithHighlight(titleText, x, y) {
  push();
  textSize(14);
  let txtWidth = textWidth(titleText);
  
  // Black background with low opacity
  fill(0, 160);
  noStroke();
  rect(x - txtWidth/2 - 6, y - 14, txtWidth + 12, 20, 4);
  
  // Yellow text on top
  fill(yellowText);
  textAlign(CENTER);
  text(titleText, x, y);
  pop();
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 1;
    
    noStroke();
    fill(p.color);
    circle(p.x, p.y, p.size * (p.life/100));
    
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function drawSnowflakeButton() {
  push();
  fill(40, 40, 40, 200);
  noStroke();
  circle(width - 25, 25, 36);
  
  stroke(255, 215, 0);
  strokeWeight(1.5);
  translate(width - 25, 25);
  
  rotate(frameCount * 0.01);
  
  for (let p of snowflakePoints) {
    line(p.x1, p.y1, p.x2, p.y2);
  }
  
  if (frameCount % 5 === 0) {
    fill(255, 215, 0);
    noStroke();
    let sparkSize = 2;
    circle(random(-8, 8), random(-8, 8), sparkSize);
  }
  pop();
}

function mousePressed() {
  if (showInstructions) {
    showInstructions = false;
    return;
  }
  
  if (dist(mouseX, mouseY, width - 25, 25) < 18) {
    showInstructions = true;
    return;
  }
  
  if (mouseX > width/3 && mouseX < 2*width/3) {
    let currentTime = millis();
    if (currentTime - clickTime < 300) {
      takeSnapshot();
    }
    clickTime = currentTime;
  }
}

function takeSnapshot() {
  let snapshot = capture.get();
  snapshots.push(snapshot);
  
  if (snapshots.length > 5) snapshots.shift();
  
  for (let i = 0; i < 30; i++) {
    let angle = random(TWO_PI);
    let speed = random(2, 5);
    particles.push({
      x: mouseX,
      y: mouseY,
      size: random(5, 15),
      color: color(255, 255, 200, 200),
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      life: random(50, 100)
    });
  }
}

function displayInstructions() {
  push();
  fill(0, 0, 0, 220);
  rect(0, 0, width, height);
  
  fill(255, 215, 0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Twin Identity Experience", width/2, 60);
  
  textSize(16);
  text("Interact with each section to explore twin identity", width/2, 100);
  
  textSize(14);
  textAlign(CENTER);
  
  fill(255, 215, 0);
  text("LEFT: Your perception - Move your mouse to create particle trails", width/2, 160);
  text("MIDDLE: How others see both twins - Double-click to take snapshots", width/2, 200);
  text("RIGHT: Your twin's perception - Move mouse to influence their reality", width/2, 240);
  text("Click anywhere to begin", width/2, 280);
  
  for (let i = 0; i < 15; i++) {
    let snowX = random(width);
    let snowY = random(height);
    let snowSize = random(4, 10);
    
    push();
    translate(snowX, snowY);
    stroke(255, 255, 255, 100);
    strokeWeight(1);
    for (let j = 0; j < 6; j++) {
      let angle = j * PI/3;
      line(0, 0, cos(angle) * snowSize, sin(angle) * snowSize);
    }
    pop();
  }
  
  pop();
}

function createInstructions() {
  showInstructions = true;
}

function keyPressed() {
  if (showInstructions) {
    showInstructions = false;
  }
}