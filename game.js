$(document).ready(function() {
  // Insert game here

  var canvas = {
    id: 'canvas',
    size: {
      width: 700,
      height: 700
    },
    color: 'white',
    draw: function() {
      $('#canvas').css('height', this.height + 'px');
      $('#canvas').css('width', this.height + 'px');
      $('#canvas').css('background-color', this.color);
    }
  };

  var Block = function(canvas, location) {
    this.genID = function() {
      return 'Block' + Math.round(new Date().getTime() + (Math.random() * 10000000));
    }
    this.canvas = canvas;
    this.id = this.genID();
    this.visible = false;
    this.size = {
      width: 10,
      height: 10
    };
    this.color = 'green';
    this.loc = {
      x: location.x,
      y: location.y
    };

    this.create = function() {
      var element = $("<div/>", {
        "class": "block",
        id: this.id,
        height: this.size.height,
        width: this.size.width,
      });

      return element;
    };

    this.draw = function() {
      if (!$('#' + this.id).length) {
        $('#' + this.canvas.id).prepend(this.create());
      }
      $('#' + this.id).css('bottom', this.loc.y);
      $('#' + this.id).css('left', this.loc.x);
    };

    this.move = function(destination, length) {
      var startTime = $.now();
      var endTime = startTime + length;
      var currTime;

      var thisBlock = this;

      var startLoc = {
        x: thisBlock.loc.x,
        y: thisBlock.loc.y
      };

      function calcDistance() {
        var a = thisBlock.loc.x - destination.x;
        var b = thisBlock.loc.y - destination.y;
        return Math.sqrt(a * a + b * b);
      }

      var interval = setInterval(function (){
        if (calcDistance() > 1) {
          currTime = $.now() - startTime;
          if (currTime <= length) {
              thisBlock.loc.x = startLoc.x + ((destination.x - startLoc.x) * (currTime / length));
              thisBlock.loc.y = startLoc.y + ((destination.y - startLoc.y) * (currTime / length));
          } else {
            thisBlock.loc.x = destination.x;
            thisBlock.loc.y = destination.y;
          }
          thisBlock.draw();
        } else {
          clearInterval(interval);
        }
      }, 10);
    }

    this.draw();

  };

  function randomLocation(canvas) {
    var randomX = Math.random() * canvas.size.width;
    var randomY = Math.random() * canvas.size.height;
    return {
      x: randomX,
      y: randomY
    };
  }



var blocks = [];

for (var i = 0; i < 200; i++) {
  blocks.push(new Block(canvas, randomLocation(canvas) ));
}

blocks.forEach( function(block) {
  var randomLoc = randomLocation(canvas);
  block.move(randomLoc, Math.random() * 100000);
});

});
