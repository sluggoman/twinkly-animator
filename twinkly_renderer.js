Twinkly = require('twinkly-api');

module.exports = class TwinklyRenderer {
  constructor(host) {
    this.twinkly = new Twinkly(host);
  }

  render(frames, delay) {
    var frameData = [];
    for (var i = 0; i < frames.length; i++) {
      frameData.push(frames[i].frameData);
    }
    this.twinkly.newMovieUpload({frames: frameData, delay: delay});
  }
}
