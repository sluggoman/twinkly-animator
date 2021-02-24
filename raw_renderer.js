module.exports = class RawRenderer {
  render(frames, delay) {
    var data = [];
    for (var frame = 0; frame < frames.length; frame++ ) {
      var frameRgb = [];
      for (var i = 0; i < frames[frame].frameData.length; i++) {
        frameRgb.push(frames[frame].frameData[i]);
      }
      data.push(frameRgb);
    }

    return { delay: delay,
             data: data };
  }
}
