function nextGeneration() {
  calcFitness();
  for (let i = 0; i < TOTAL; i++) {
    let child = pickOne();
    birds[i] = child;
  }
  savedBirds = [];
}

function calcFitness() {
  let sum = 0;
  for (let bird of savedBirds) {
    sum += bird.score;
  }
  for (let bird of savedBirds) {
    bird.fitness = bird.score / sum;
  }
}

function pickOne() {
  let r = random(1);
  let index = 0;
  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;
  let bird = savedBirds[index];
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}
