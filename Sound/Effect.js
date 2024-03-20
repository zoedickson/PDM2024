let img;
let initTone = true;
let baseFreq = 200; 
let osc = new Tone.Oscillator(baseFreq, 'square').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.5,
  sustain: 1.0,
  release: 1.0
}).connect(pan);
osc.connect(ampEnv);


let lfo = new Tone.LFO({
  type: 'sine', 
  frequency: 0.5, 
  amplitude: 200, 
}).start();
lfo.connect(osc.frequency); 
let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.8,
  sustain: 1.0,
  release: 0.8
}).connect(gain);

function preload(){
  img = loadImage('assets/trombone.webp');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('black');
  if(mouseIsPressed){
    background(img);
  }
  fill(250);
  text('press to start trombone',130,50);
}

function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    console.log('spacebar pressed');

    Tone.start();
    initTone = false;
  }
}

function mousePressed() {
 
  let notes = ['D4', 'C#4', 'C4', 'B3'];

  let lastNoteRelease = '8n';


  notes.forEach((note, index) => {
    let time = index * 0.8; 
    osc.frequency.setValueAtTime(Tone.Frequency(note).toFrequency(), Tone.now() + time);
    ampEnv.triggerAttackRelease('6n', Tone.now() + time);
  });

 
  let freq = map(mouseX, 0, width, 0.1, 10); 
  lfo.frequency.value = freq;
}


