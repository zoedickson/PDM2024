let purple;
let gold;
let x;
let y;
const size = 100;
let dragging = false;

function setup() {
  createCanvas(400, 400);
  purple = color('#461D7C');
  gold = color('#FDD023');
  x = width / 2;
  y = height / 2;
  //rectMode(CENTER);
}

function draw() {
  background(220);
 
  // if(mouseIsPressed) {
  //   if (mouseX >= x && mouseX <= x + size && mouseY >= y && <= y + size) {
  //     fill(purple);
  //     stroke(gold);
  
  //     x += mouseX - pmouseX;
  //     y += mouseY - pmouseY;
  //   }
  
  // }
  // else {
  //   fill(gold);
  //   stroke(purple);
  // }
  square(x,y,size);
}

function mousePressed() {
  // console.log("mouseX: " + mouseX);
  // console.log("x: " + x);
  if (mouseX >= x && mouseX <= x + size && mouseY >= y && <= y + size) {
    dragging = true;
    console.log("dragging");
  }
}

function mouseReleased() {
  dragging = false;
}

function mouseDragged() {
  console.log(dragging);
  if (dragging) {
    x += mouseX - pmouseX;
    y += mouseY - pmouseY;
    console.log(x);
  }
}