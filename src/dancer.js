var offset = 20;

// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps, radius) {
  this.$node = $('<span class="dancer"></span>');

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
  var newPosition = { top: lead.position.top, left: lead.position.left + offset };

  self.moveTo(newPosition.top, newPosition.left, self.play);
  self.timeBetweenSteps = lead.timeBetweenSteps;

  self.step = function() {
    Dancer.prototype.step.call(self);
    self.followPosition(lead);
  };
};

Dancer.prototype.unpair = function() {
  this.step = this.__proto__.step;
  this.timeBetweenSteps = getRandomSpeed();
  this.scatter();
};

Dancer.prototype.followPosition = function(lead) {
  this.setPosition(lead.position.top, lead.position.left + offset);
};

Dancer.prototype.scatter = function() {
  var newPosition = getRandomPosition();
  this.moveTo(newPosition.top, newPosition.left + this.radius, this.play.bind(this));
};

Dancer.prototype.moveTo = function(top, left, cb) {
  var self = this;
  self.pause();

  self.center = self.position = { top: top, left: left };

  self.$node.animate({ top: top, left: left }, self.timeBetweenSteps, cb.bind(self));
};

Dancer.prototype.pause = function() {
  this.canUpdate = false;
};

Dancer.prototype.play = function() {
  this.canUpdate = true;
};
