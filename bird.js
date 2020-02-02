class Bird {
  constructor(nn) {
    this.x = 50;
    this.y = height / 2;
    this.r = 25;
    this.vel = 0;
    this.gravity = 0.6;
    this.lift = -10;
    if (nn) {
      this.brain = nn;
    } else {
      this.brain = new NeuralNetwork(5, 16, 2);
    }
    this.score = 0;
    this.fitness = 0;
  }

  show() {
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.x, this.y, this.r);
  }

  think(pipes) {
    // Find the closest pipe
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x + pipes[i].w - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }

    let xs = [];
    xs[0] = this.y / height;
    xs[1] = closest.x / width;
    xs[2] = closest.top / height;
    xs[3] = closest.bottom / height;
    xs[4] = this.vel / 10;
    let ys = this.brain.predict(xs);
    if (ys[0] > ys[1]) {
      this.up();
    }
  }

  update() {
    this.y += this.vel;
    this.vel *= 0.9;
    this.vel += this.gravity;
    this.score++;
  }

  up() {
    this.vel += this.lift;
  }

  mutate(rate) {
    this.brain.mutate(rate);
  }
}
