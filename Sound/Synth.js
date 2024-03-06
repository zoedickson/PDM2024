let synth = new Tone.PolySynth(Tone.Synth);
let bend = new Tone.PitchShift();

bend.pitch = 0;
synth.connect(bend);
bend.toDestination();

let notes = {
  'a' : 'C4',
  's' : 'D4',
  'd' : 'E4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'A4',
  'j' : 'B4',
  'k' : 'C5'
}

function setup() {
  createCanvas(400, 400);

pitchSlider = createSlider(-12, 12, 0, 0.1); //pitch down -12, pitch up 12, starting point is 0
pitchSlider.position (120, 200);
pitchSlider.mouseMoved(()=> bend.pitch = pitchSlider.value());

}

function keyPressed(){
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
}

function keyReleased(){
  let playNotes = notes[key];
  synth.triggerRelease(playNotes,'+0.03');
}

function draw() {
  background('pink');
  text ('play A-K for synth', 140, 180)
}