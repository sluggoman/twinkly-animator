var clientRenderPage = function(frameData, delay) {
  return `
<html>
<body>
<canvas id="canvas" style="background: black;" width="510px" height="170px"></canvas>
<script type="text/javascript">
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
  var remainingFrames = frames.splice(1);
  if (remainingFrames.length > 0) {
    renderFrame(frames[0]);
    setTimeout(
      function() {
        render(remainingFrames, delay);
      }, 
      delay
   );
  } else {
    renderFrame(frames[0]);
  }
}

var animationData = ${frameData};

render(animationData, ${delay});

</script>
</body>
</html>
`
}

module.exports = class HTMLRenderer {
  constructor(debug) {
    this.debug = debug;
  }

  render(frames, delay) {
    var out = "[";
    for (var frame = 0; frame < frames.length; frame++ ) {
      out += "[";
      for (var i = 0; i < frames[frame].frameData.length; i++) {
        var data = frames[frame].frameData[i];
        out += `{r:${data.r},g:${data.g},b:${data.b}},`;
      }
      out += "],"
      if (this.debug) {
        out += "\n";
      }
    }	    
    out += "]";
    console.log(clientRenderPage(out, delay));	  
  }
}
