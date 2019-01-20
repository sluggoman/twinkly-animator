module.exports = class Animation {
  constructor(renderer, frames) {
    this.renderer = renderer;
    this.frames = frames || [];
  }

  addFrame(frame) {
    this.frames.push(frame);
  }

  render(delay) {
    this.renderer.render(this.frames, delay);
  }

  getFrame(idx) {
    return this.frames[Math.floor(idx)];
  }

  numFrames() {
    return this.frames.length;
  }
}
