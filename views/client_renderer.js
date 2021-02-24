function renderFrame(frameData) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var j = 0; j < 8; j++) { 
    for (var i = 0; i < 25; i++) {
      ctx.beginPath();
      ctx.arc(10+20*i, 10+20*j, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(" + 
		    frameData[j+i*8].r + "," +
		    frameData[j+i*8].g + "," +
		    frameData[j+i*8].b + ")";
      ctx.fill();
    }
  }
}

function render(frames, delay) {
  var remainingFrames = frames.slice(1);
  if (remainingFrames.length > 0) {
    renderFrame(frames[0]);
    if ($('#render').prop("disabled")) {
      setTimeout(
        function() {
          render(remainingFrames, delay);
        }, 
        delay
     );
   }
  } else {
    renderFrame(frames[0]);
  }
}

var repeater = null;

function loopRender(animationData, delay) {
  var totalDelay = delay * (animationData.length + 1);

  render(animationData, delay);
  repeater = setTimeout(function() {
    loopRender(animationData, delay);
  }, totalDelay);
}

function stopRender() {
  if (repeater) {
    clearTimeout(repeater);
  }
  repeater = null;
}
