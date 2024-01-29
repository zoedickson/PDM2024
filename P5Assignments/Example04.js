function setup() {
  createCanvas(800, 800);
}

function draw() {
  background('navy');
  stroke(400);
  strokeWeight(10);
  fill('green');
  circle(400,400,400);

  fill('red')
  beginShape();
    vertex(400,200);
    vertex(450,325);
    vertex(600,325);
    vertex(475,425);
    vertex(525,575);
    vertex(400,475);
    vertex(275,575);
    vertex(325,425);
    vertex(200,325);
    vertex(350,325);
  endShape(CLOSE);
}
