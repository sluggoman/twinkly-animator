module.exports = function(animation, point, 
	                  startFrame, endFrame, 
	                  startColour, endColour) {
  var numFrames = (endFrame - startFrame + 1);
  var rInc = (endColour.r - startColour.r) / numFrames / 2;
  var gInc = (endColour.g - startColour.g) / numFrames / 2;
  var bInc = (endColour.b - startColour.b) / numFrames / 2;
  var midFrame = (endFrame - startFrame) / 2 + startFrame; 
  for (var i = startFrame; i <= midFrame; i++) {
    var frame = animation.getFrame(i % animation.numFrames());
    var frameData = frame.frameData;  
    if (on(frameData[point.y + point.x * frame.height])) {
      continue;
    }
    frameData[point.y + point.x * frame.height] = {
      r: Math.round(startColour.r + rInc * (i - startFrame)),
      g: Math.round(startColour.g + gInc * (i - startFrame)),
      b: Math.round(startColour.b + bInc * (i - startFrame))
    }
  }
  for (var i = midFrame; i <= endFrame; i++) {
    var frame = animation.getFrame(i % animation.numFrames());
    var frameData = frame.frameData;
    if (on(frameData[point.y + point.x * frame.height])) {
      continue;
    }

    frameData[point.y + point.x * frame.height] = {
      r: Math.round(startColour.r + rInc * (endFrame - i)),
      g: Math.round(startColour.g + gInc * (endFrame - i)),
      b: Math.round(startColour.b + bInc * (endFrame - i))
    }
  }
}

function on(colour) {
  return colour.r != 0 || colour.g != 0 || colour.b != 0;
}	
