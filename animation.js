module.exports = class Animation {
  constructor(renderer, frames) {
    this.renderer = renderer;
    this.frames = frames || [];
  }

  addFrame(frame) {
    this.frames.push(frame);
  }

  render(delay) {
    return this.renderer.render(this.frames, delay);
  }

  getFrame(idx) {
    return this.frames[Math.floor(idx)];
  }

  numFrames() {
    return this.frames.length;
  }

  fixedLight(point, colour, options = {}) {
    var startFrame = Math.max(0, options.startFrame || 0);
    var endFrame = 
      Math.min(options.endFrame || this.numFrames() - 1, this.numFrames() - 1);
    for (var i = startFrame; i <= endFrame; i++) {
      var frame = this.getFrame(i);
      frame.setLight(point, colour);
    }
  }	  
}
