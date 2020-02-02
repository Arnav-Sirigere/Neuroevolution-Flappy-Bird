class Pipe {
  constructor() {
    this.x = width;
    this.w = 40;
    this.spacing = 150;
    this.top = random(height - this.spacing); //height / 6, height * 0.75);
    this.bottom = this.top + this.spacing;
    this.speed = 2;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(0, 255, 0);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.bottom);
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > this.bottom) {
      if (bird.x > this.x) {
        return true;
      }
    } else {
      return false;
    }
  }
}
