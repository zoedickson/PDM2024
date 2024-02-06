let brushColor;

function setup() {
  createCanvas(800, 400);
  background(300);
  brushColor = 'black';
}

function drawColorPalette() {
   // stroke('white');
   strokeWeight(2);
    fill('red');
    square(0,0,height/16,0);
    fill('orange');
    square(0,1*height/16,height/16,0);
    fill('yellow');
    square(0,2*height/16,height/16,0);
    fill('green');
    square(0,3*height/16,height/16,0);
    fill('cyan');
    square(0,4*height/16,height/16,0);
    fill('blue');
    square(0,5*height/16,height/16,0);
    fill('magenta');
    square(0,6*height/16,height/16,0);
    fill('brown');
    square(0,7*height/16,height/16,0);
    fill('white');
    square(0,8*height/16,height/16,0);
    fill('black');
    square(0,9*height/16,height/16,0);

}

function mousePressed()
{
    if(mouseX < 50)
    {
        if(mouseY < 25)
        {
            brushColor = color('red');
        }
        else if(mouseY < 50)
        {
            brushColor = color('orange');
        }
        else if(mouseY < 75)
        {
            brushColor = color('yellow');
        }
        else if(mouseY < 100)
        {
            brushColor = color('green');
        }
        else if(mouseY < 125)
        {
            brushColor = color('cyan');
        }
        else if(mouseY < 150)
        {
            brushColor = color('blue');
        }
        else if(mouseY < 175)
        {
            brushColor = color('magenta');
        }
        else if(mouseY < 200)
        {
            brushColor = color('brown');
        }
        else if(mouseY < 225)
        {
            brushColor = color('white');
        }
        else if(mouseY < 250)
        {
            brushColor = color('black');
        }
    }
}

function draw() {
  brushX = mouseX;
  brushY = mouseY;

  drawColorPalette();

  if (mouseIsPressed) {
    stroke(brushColor);
    strokeWeight(5);
    line(brushX,brushY,pmouseX,pmouseY);
  }
}
