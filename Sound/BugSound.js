let spriteSheetFilenames = ["lady3.png"];
let spriteSheets = [];
let animations = [];
let scoreIncreased;
let squish = new Tone.Player('assets/splat.mp3').toDestination();
let win = new Tone.Player('assets/yay.mp3').toDestination();
let lose = new Tone.Player('assets/aw.mp3').toDestination();
let music;


const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 20, state: GameState.Start, targetSprite: 2 };

function preload() {
  for(let i=0; i < spriteSheetFilenames.length; i++) {
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }
  music = new Tone.Player('assets/shawty.m4a').toDestination();
  music.loop = true;
  music.autostart = true;
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);

  reset();
}

function reset() {
  game.elapsedTime = 0;
  game.score = 0;
  game.totalSprites = 30;

  music.playbackRate = 1;

  animations = [];
  for(let i=0; i < game.totalSprites; i++) {
    animations[i] = new WalkingAnimation(random(spriteSheets),80,80,random(50,350),random(50,350),2,1,6,random([0,1]));
  }
}

function draw() {
  switch(game.state) {
    case GameState.Playing:
      background('green');
  
      for(let i=0; i < animations.length; i++) {
        animations[i].draw();
      }
      fill(0);
      textSize(30);
      text("Score: " + game.score,75,40);
      let currentTime = game.maxTime - game.elapsedTime;
      text("Time: " + ceil(currentTime), 300,40);
      game.elapsedTime += deltaTime / 1000;

      if (currentTime < 0)
        game.state = GameState.GameOver;
      break;
    case GameState.GameOver:
      game.maxScore = max(game.score,game.maxScore);

      background('beige');
      fill('green');
      textSize(40);
      textAlign(CENTER);
      text("Game Over!",200,175);
      textSize(35);
      text("Score: " + game.score,200,240);
      text("Max Score: " + game.maxScore,200,280);
      music.stop();
      
      break;
    case GameState.Start:
      background('beige');
      fill('green');
      textSize(50);
      textAlign(CENTER);
      text("Bug Squish",200,200);
      textSize(20);
      text("Press Any Key to Start",200,250);
      break;
  }
  
}

function keyPressed() {
  switch(game.state) {
    case GameState.Start:
      game.state = GameState.Playing;
      break;
    case GameState.GameOver:
      reset();
      game.state = GameState.Playing;
      break;
  }
}

function mousePressed() {
  switch(game.state) {
    case GameState.Playing:
      for (let i=0; i < animations.length; i++) {
        let contains = animations[i].contains(mouseX,mouseY);
        if (contains) {
          if (animations[i].moving != 0) {
            animations[i].stop();
            game.score += 1;
            scoreIncreased = true;
            squish.start();
          }
        }
        if(scoreIncreased){
            animations[i].speed += 1;

            if(game.score > 10)
              music.playbackRate += 0.01;

            if(game.score == 30){
              music.playbackRate = 0;
              win.start();
            }
        }
      }
      if(game.elapsedTime == 30 && game.score<30){
        music.playbackRate = 0;
        lose.start();
      }
      break;
  }
  scoreIncreased = false;
}


class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength, speed, framerate, vertical = false, offsetX = 0, offsetY = 0) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.speed = speed;
    this.framerate = framerate*speed;
    this.vertical = vertical;
  }

  draw() {


    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : this.u;
    push();
    translate(this.dx,this.dy);
    if (this.vertical)
      rotate(90);
    scale(this.xDirection,1);
    


    image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw+this.offsetX,this.v*this.sh+this.offsetY,this.sw,this.sh);
    pop();

    let proportionalFramerate = round(frameRate() / this.framerate);
    if (frameCount % proportionalFramerate == 0) {
      this.currentFrame++;
    }
  
    if (this.vertical) {
      this.dy += this.moving*this.speed;
      this.move(this.dy,this.sw / 4,height - this.sw / 4);
    }
    else {
      this.dx += this.moving*this.speed;
      this.move(this.dx,this.sw / 4,width - this.sw / 4);
    }

    
  }

  move(position,lowerBounds,upperBounds) {
    if (position > upperBounds) {
      this.moveLeft();
    } else if (position < lowerBounds) {
      this.moveRight();
    }
  }

  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
    this.v = 0;
  }

  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
    this.v = 0;
  }

  contains(x,y) {
    let insideX = x >= this.dx - 26 && x <= this.dx + 25;
    let insideY = y >= this.dy - 35 && y <= this.dy + 35;
    return insideX && insideY;
  }

  stop() {
    this.moving = 0;
    this.u = 1;
    this.v = 1;
  }
}