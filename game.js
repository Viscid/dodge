$(document).ready(function() {
  // Insert game here

  var canvas = {
    id: 'canvas',
    size: {
      width: 640,
      height: 480
    },
    color: 'white',
    draw: function() {
      $('#canvas').css('height', this.height + 'px');
      $('#canvas').css('width', this.height + 'px');
      $('#canvas').css('background-color', this.color);
    }
  };

  var Block = function(canvas) {
    this.genID = function() {
      return 'Block' + Math.round(new Date().getTime() + (Math.random() * 100));
    }
    this.canvas = canvas;
    this.id = this.genID();
    this.visible = false;
    this.size = {
      width: 10,
      height: 10
    };
    this.color = 'black';
    this.loc = {
      x: 400,
      y: 100
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

    return this;

  };

  function move_block(block, destination, length) {

    var startTime = $.now();
    var endTime = startTime + length;
    var currTime = $.now() - startTime;

    var currLoc = {
      x: block.loc.x,
      y: block.loc.y
    };
    var startLoc = {
      x: block.loc.x,
      y: block.loc.y
    };

    function reDraw() {
      if ((currLoc.x < destination.x) ||
        (currLoc.y < destination.y)) {
        currTime = $.now() - startTime;
        if (currTime <= length) {
          debugger;
          block.loc.x = startLoc.x + (destination.y * (currTime / length));
          block.loc.y = startLoc.y + (destination.y * (currTime / length));
        } else {
          block.loc.x = destination.x;
          block.loc.y = destination.y;
        }
        currLoc.x = block.loc.x;
        currLoc.y = block.loc.y;
        block.draw();
      }
    }

    setInterval(reDraw, 10);


  }


  var new_block = new Block(canvas);
  var new_block2 = new Block(canvas);
  move_block(new_block, {x: 200, y: 200}, 5000);
  move_block(new_block2, {x: 300, y: 300}, 2000);
});
