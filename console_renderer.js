module.exports = class ConsoleRenderer {
  render(frames, delay) {
    console.clear();
    var remainingFrames = frames.splice(1);
    var _this = this;
    if (remainingFrames.length > 0) {
      renderFrame(frames[0]);
      setTimeout(
        function() {
          _this.render(remainingFrames, delay);
        }, 
        delay
     );
   } else {
     renderFrame(frames[0]);
   }
  }
}

function renderFrame(frame) {
  for (var row = 0; row < frame.height; row++) {
    var rowData = '';
    for (var col = 0; col < frame.width; col++) {
      if (on(frame.frameData[col*frame.height+row])) {
        rowData += '\u220e';
      } else {
        rowData += ' ';
      }
    }
    console.log(rowData);
  }
}

function on(colour) {
  return colour.r != 0 || colour.g != 0 || colour.b != 0;
}
