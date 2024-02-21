let bug, moveAni, deadAni;
let bugSprites = [];
let score = 0;
let timeRemaining = 30;
let startTime;
let timerIsDone = false;
let allBugs;
let rotationAngles = [0,90,180,-90];
let topWall, bottomWall, leftWall, rightWall;
let gameState = "start";

function preload() {
  for(let i = 0; i < 4;i++){
    bugSprites[i] = loadImage("assets/sprite" + i + ".png");
  }
}

function setup() {
  createCanvas(800,800);
  score = 0;
  gameTime = 30;
  timerIsDone = false;
  startTime = 0;
  gameState = "start";
  walls();
  allBugs = new Group();

}

function draw() {
  background('green');

  if(gameState === "start"){
    startScreen();
    if(mouseIsPressed){
      moreBugs(20);
      startTime = millis();
      gameState = 'play';
    }
  } else if(gameState === "play"){
    timer();
           allBugs.overlap(allBugs)
        allBugs.collides(topWall, teleBot);
        allBugs.collides(bottomWall, teleTop);
        allBugs.collides(leftWall, teleRight);
        allBugs.collides(rightWall, teleLeft);

    allSprites.forEach(function(e){
      if(e.mouse.pressing()) {
        squish(e);
      }
    });
    
    push();
    textSize(20);
    text('Time Ellapsed: ${gameTime} / 30',30,40);
    text('Bugs Squished: ${score} / 30',30,70);
    pop();

    if(timerIsDone === true) {
      allBugs.remove();
      gameState = "end";
    }
  } else if(gameState === "end") {
    endScreen();

    if(keyIsPressed){
      if(keyCode === 13){
        setup();
      }
    }
  }
}

function moreBugs(num) {
  for(let i = 0; i < num; i++) {
    bug = new Sprite(random(10,width-10),random(10,height-12),50,50);

    deadAni = bug.addAnimation("dead",bugSprites[4]);

    moveAni = bug.addAnimation("move", bugSprites[0],bugSprites[1],bugSprites[2],bugSprites[3]);

    moveAni.frameDelay = 6;
    bug.scale = 0.5;
    bug.rotation = floor(random(rotationAngles));

    if(bug.rotation === 0) {
      bug.move("up",5,8000);
    } else if (bug.rotation === 90) {
      bug.move("right",5,8000);
    } else if (bug.rotation === 180) {
      bug.move("down",5,8000);
    } else if (bug.rotation -90) {
      bug.move("left",5,8000);
    }
    bug.isDead = false;
    allBugs.add(bug);
    bug.overlaps(allBugs);
    bug.rotation = floor(random(rotationAngles));
  }
}

function timer() {
  gameTime = int((millis() - startTime)/1000);
  if(gameTime > 30) {
    timerIsDone = true;
  }
  return gameTime;
}

function startScreen() {
  let startText = 'Click the bugs to save the picnic!\nSquish as many as you can in 30 seconds';
  push();
  stroke(0);
  strokeWeight(3);
  fill("cyan");
  rect(width/2-300,height/2-100,600,200);
  strokeWeight(0);
  fill(0);
  textAlign(CENTER);
  textSize(20);
  text(startText,width/2,height/2);
  pop();
}

function endScreen() {
  let endText = 'You squished ${score} bugs!\nPress RETURN to play again';
  push();
  stroke(0);
  strokeWeight(3);
  fill("cyan");
  rect(width/2-300,height/2-100,600,200);
  strokeWeight(0);
  fill(0);
  textAlign(CENTER);
  textSize(20);
  text(endText,width/2,height/2-25);
  pop();
}

function walls() {
  topWall = new Sprite(width/2,-100,width,50);
  bottomWall = new Sprite(width/2,+100,width,50);
  leftWall = new Sprite(-100,height/2,30,height);
  rightWall = new Sprite(width+100,height/2,30,height);

  topWall.collider = "static";
  bottomWall.collider = "static";
  leftWall.collider = "static";
  rightWall.collider = "static";
}

function squish(item) {
  if (item.isDead === false) {
    item.isDead = true;
    item.ani = "dead";
    item.vel.x = 0;
    item.vel.y = 0;
    item.life = 60;
    score++
  }
  if (allBugs.size() < 1) {
    moreBugs(random(5,30));
  }
}

function teleTop(bug){
  bug.y = -10;
  bug.rotation = 180;
  bug.move("down",5,8000);
}
function teleBot(bug){
  bug.y = height+10;
  bug.rotation = 0;
  bug.move("up",5,8000);
}
function teleLeft(bug){
  bug.x = -10;
  bug.rotation = 90;
  bug.move("right",5,8000);
}
function teleRight(bug){
  bug.x = width+10;
  bug.rotation = -90;
  bug.move("left",5,8000);
}