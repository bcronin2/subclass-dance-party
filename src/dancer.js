// Creates and returns a new dancer object that can step
var Dancer = function(top, left, time, radius, type) {
  this.dancerId = (window.dancers || []).length;
  this.$node = $('<img class="dancer" ' +
    'src="' + env.dancerImages[type] + '"' +
    ' data-id="' + this.dancerId + '">');  

  this.setTimeBetweenSteps(time);
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
  }, self.timeBetweenSteps);
};

Dancer.prototype.setTimeBetweenSteps = function(time) {
  this.timeBetweenSteps = time;
};

Dancer.prototype.setPosition = function(top, left) {
  if (this.canUpdate) {
    this.position = { top: top, left: left };
    this.$node.css(this.position);
  }
};  

Dancer.prototype.pairWith = function(lead) {
  var self = this;
  var newPosition = { top: lead.position.top, left: lead.position.left + this.radius };

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
  this.setTimeBetweenSteps(getRandomSpeed());
  this.moveTo(newPosition.top, newPosition.left + this.radius, this.play.bind(this));
};

Dancer.prototype.followPosition = function(lead) {
  this.setPosition(lead.position.top, lead.position.left + this.radius);
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
  var squaredDistance = Math.pow(this.position.top - dancer.position.top, 2)
    + Math.pow(this.position.left - dancer.position.left, 2);
  return Math.sqrt(squaredDistance);
};

Dancer.prototype.specialMove = function() {
  var $node = this.$node;

  rotate = function(degree) {
    $node.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
    $node.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
    setTimeout(function() { degree < 360 && rotate(degree + 10); }, 65);
  };
  rotate(0);
};

