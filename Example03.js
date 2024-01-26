function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(0);
  noStroke();
  fill('yellow');
  arc(200,200,300,300,PI+QUARTER_PI,HALF_PI+QUARTER_PI,PIE);
  fill('red')
  rect(450,200,300,150);
  circle(600,200,300);
  fill('white');
  circle(525,200,80);
  circle(675,200,80);
  fill('blue');
  circle(525,200,50);
  circle(675,200,50);
}
