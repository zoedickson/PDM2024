
let soundFX, button1, button2, button3, button4; 


function preload (){
  soundFX = new Tone.Players ({
    drum : "assets/drum.mp3", 
    boo : "assets/boo.mp3",
    random : "assets/random.m4a",
    oof : "assets/oof.mp3"
  }).toDestination(); 
}

function setup() {
  createCanvas(400, 400);

  
  button1 = createButton('Drums');
  button1.position (60, 140);
  button1.class('custom-button');
  button1.mousePressed (() =>soundFX.player ('drum').start());

  button2 = createButton('Boo Tomato Tomato');
  button2.position (180, 140);
  button2.class('custom-button');
  button2.mousePressed (() => soundFX.player ('boo').start());

  button3 = createButton('Surprise');
  button3.position (55, 210);
  button3.class('custom-button');
  button3.mousePressed (() =>soundFX.player ('random').start());

  button4 = createButton('Oof');
  button4.position (240, 210);
  button4.class('custom-button');
  button4.mousePressed (() => soundFX.player ('oof').start());

}

function draw() {
  background('orange');


}