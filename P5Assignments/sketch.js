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

}
