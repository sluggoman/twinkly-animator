var Point = require('./point.js');
var Font = require('./font.js');

var Frame = class Frame {
  constructor(width, height, options = {}) { 
     this.width = width;
     this.height = height;
     this.numLights = width * height;
     this.frameData = options.frameData || this.generateFullFrame(
                             {r: 0, b: 0, g: 0}, this.numLights);
     this.viewPort = options.viewPort || this.defaultViewPort();
     this.cropViewPort();
  }

  defaultViewPort() {
    return { x: 0, y: 0, width: this.width, height: this.height };
  }

  cropViewPort() {
    this.viewPort.x = Math.min(Math.max(0, this.viewPort.x), this.width - 1);
    this.viewPort.y = Math.min(Math.max(0, this.viewPort.y), this.height - 1);
    this.viewPort.width = 
      Math.min(this.viewPort.width, this.width - this.viewPort.x);
    this.viewPort.height = 
      Math.min(this.viewPort.height, this.height - this.viewPort.y);
  }

  generateFullFrame(colour, lightCount) {
    var frame = []
    for (var x = 0; x < lightCount; x++) {
	      frame.push({r: colour.r,g: colour.g,b: colour.b});
    }
    return frame;
  }

  setLight(point, colour) {
    if (point.x >= this.width) {
      return;
    }
    if (point.y >= this.height) {
      return;
    }
    this.frameData[point.x*this.height + point.y] = colour;
  }

  scrollViewPort(options = {}) {
    if (options.horizontal) {
      this.viewPort.x = Math.max(
        0, 
        Math.min(
          this.viewPort.x + options.horizontal,
          this.width - this.viewPort.width
        )
      );
    }
    if (options.vertical) {
      this.viewPort.y = Math.max(
        0, 
        Math.min(
          this.viewPort.y + options.vertical,
          this.height - this.viewPort.height
        )
      );
    }
  }

  scrollRight(amount = 1) {
    var oldviewx = this.viewPort.x;
    this.scrollViewPort({ horizontal: amount });
    return this.viewPort.x - oldviewx == amount;
  }
    
  scrollLeft(amount = 1) {
    var oldviewx = this.viewPort.x;
    this.scrollViewPort({ horizontal: -amount });
    return oldviewx - this.viewPort.x == amount;
  }

  scrollDown(amount = 1) {
    var oldviewy = this.viewPort.y;
    this.scrollViewPort({ vertical: amount });
    return this.viewPort.y - oldviewy == amount;
  }
    
  scrollUp(amount = 1) {
    var oldviewy = this.viewPort.y;
    this.scrollViewPort({ vertical: -amount });
    return oldviewy - this.viewPort.y == amount;
  }
    
  getViewPortData() {
    var horizData = this.frameData.slice(
      this.viewPort.x * this.height,
      this.viewPort.x * this.height + this.viewPort.width * this.height
    );

    var result = [];
    for (var i = 0; i < this.viewPort.width; i++) {
      result = result.concat(
        horizData.slice(
          this.viewPort.y + i * this.height,
          this.viewPort.y + i * this.height + this.viewPort.height
        )
      )
    }
    return result;
  }

  drawLine(p0, p1, colour) {
    var points = line(p0, p1);
    for (var i = 0; i < points.length; i++) {
      this.setLight(points[i], colour);
    }
  }
 
  drawChar(char, at, colour, options = {}) {
    var font = new Font(options.fontName || 'basic');
    var bitmap = font.getBitMap(char);
    for (var i = 0; i < bitmap.length; i++) {
      var column = options.reverse ? 7 : 0;
      for (var j = 0x80; j > 0; j >>= 1) {
        if (bitmap[i] & j) {
          var point = new Point(at.x+column, at.y+i);
          this.setLight(point, colour);
        }
        column += options.reverse ? -1 : 1;
      }
    }
  }
}

function lerp(start, end, t) {
  return start + t * (end - start);
}

function lerp_point(p0, p1, t) {
  return new Point(lerp(p0.x, p1.x, t), 
                         lerp(p0.y, p1.y, t));
}

function diagonal_distance(p0, p1) {
    var dx = p1.x - p0.x, dy = p1.y - p0.y;
    return Math.max(Math.abs(dx), Math.abs(dy));
}

function round_point(p) {
    return new Point(Math.round(p.x), Math.round(p.y));
}

function line(p0, p1) {
    var points = [];
    var N = diagonal_distance(p0, p1);
    for (var step = 0; step <= N; step++) {
        var t = N == 0? 0.0 : step / N;
        points.push(round_point(lerp_point(p0, p1, t)));
    }
    return points;
}
 
module.exports = Frame;
