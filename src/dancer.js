// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps, radius) {
  this.dancerId = window.dancers.length;
  this.$node = $('<img class="dancer" ' +
      'src="' + getRandomImage() + '"' +
      ' data-id="' + this.dancerId + '">');

  this.timeBetweenSteps = timeBetweenSteps;
  this.radius = radius;
  this.center = { top: top, left: left };
  this.position = this.center;
  this.canUpdate = true;
  this.step();
};

Dancer.prototype.step = function() {
  var self = this;
  setTimeout(function() {
    self.step();
  }, this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  if (this.canUpdate) {
    this.position = { top: top, left: left };
    this.$node.css(this.position);
  }
};

Dancer.prototype.pairWith = function(lead) {
  var self = this;
  var newPosition = { top: lead.position.top, left: lead.position.left + env.offset };

  self.moveTo(newPosition.top, newPosition.left, self.play);
  self.timeBetweenSteps = lead.timeBetweenSteps;

  self.step = function() {
    Dancer.prototype.step.call(self);
    self.followPosition(lead);
  };
};

Dancer.prototype.scatter = function() {
  var newPosition = getRandomPosition();

  this.step = this.__proto__.step;
  this.timeBetweenSteps = getRandomSpeed();
  this.moveTo(newPosition.top, newPosition.left + this.radius, this.play.bind(this));
};

Dancer.prototype.followPosition = function(lead) {
  this.setPosition(lead.position.top, lead.position.left + env.offset);
};

Dancer.prototype.moveTo = function(top, left, cb) {
  this.pause();

  this.center = this.position = { top: top, left: left };

  this.$node.animate({ top: top, left: left }, this.timeBetweenSteps, cb.bind(this));
};

Dancer.prototype.pause = function() {
  this.canUpdate = false;
};

Dancer.prototype.play = function() {
  this.canUpdate = true;
};

Dancer.prototype.getDistanceTo = function(dancer) {
  return Math.pow(this.position.top - dancer.position.top, 2)
    + Math.pow(this.position.left - dancer.position.left, 2);
};

Dancer.prototype.specialMove = function() {
  // var angle = 0;
  // this.$node.animate({ 'transform': 'rotate(360deg)' });
  // while (angle < 360) {
  //   // setTimeout((function(angle) {
  //   //   return function() {
  //       node.css({ 'transform': 'rotate(' + angle + 'deg)' });
  //     // };
  //   // }( angle )), 50);
  //   angle += 60;
  // }
  var $node = this.$node;

  rotate = function(degree) {

    // For webkit browsers: e.g. Chrome
    $node.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
    // For Mozilla browser: e.g. Firefox
    $node.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});

    // Animate rotation with a recursive call
    setTimeout(function() { degree < 360 && rotate(degree + 10); }, 65);
  };
  rotate(0);
};

