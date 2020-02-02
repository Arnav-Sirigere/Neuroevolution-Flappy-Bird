const TOTAL = 500;
let birds = [];
let pipes = [];
let savedBirds = [];

let slider;
let counter = 0;
let gen = 1;
let gen_ele;

function setup() {
  createCanvas(600, 400);
  slider = createSlider(1, 100, 1);
  gen_ele = createP('');
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function draw() {
  background(0);
  let cycles = slider.value();
  for (let n = 0; n < cycles; n++) {
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = birds.length - 1; i >= 0; i--) {
      birds[i].think(pipes);
      birds[i].update();
      if (
        birds[i].y + birds[i].r / 2 > height ||
        birds[i].y - birds[i].r / 2 < 0
      ) {
        savedBirds.push(birds.splice(i, 1));
      }
      for (let pipe of pipes) {
        if (birds[i] && pipe.hits(birds[i])) {
          savedBirds.push(birds.splice(i, 1));
        }
      }
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].x < 0) {
        pipes.splice(i, 1);
      }
    }

    if (birds.length == 0) {
      nextGeneration();
      counter = 0;
      pipes = [];
      gen++;
    }
    gen_ele.html(`Generation: ${gen}`);
  }

  for (let bird of birds) {
    bird.show();
  }
  for (let pipe of pipes) {
    pipe.show();
  }
}
