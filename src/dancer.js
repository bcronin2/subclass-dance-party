var offset = 20;

// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps, radius) {
  // use jQuery to create an HTML <span> tag
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

Dancer.prototype.lineUp = function(top) {
  this.center.top = top;
};

Dancer.prototype.pairWith = function(lead) {
  var self = this;
  var newPosition = { top: lead.position.top, left: lead.position.left + offset };

  self.moveTo(newPosition.top, newPosition.left);
  self.timeBetweenSteps = lead.timeBetweenSteps;

  self.step = function() {
    Dancer.prototype.step.call(self);
    self.followPosition(lead);
  };
};

Dancer.prototype.unpair = function() {
  this.step = this.__proto__.step;
  this.timeBetweenSteps = Math.random() * 1000;
  this.scatter();
};

Dancer.prototype.followPosition = function(lead) {
  this.setPosition(lead.position.top, lead.position.left + offset);
};

Dancer.prototype.scatter = function() {
  var left = $('body').width() * Math.random();
  var top = $('body').height() * Math.random();
  var self = this;

  this.moveTo(top, left + this.radius);
  this.center = { top: top, left: left };
};

Dancer.prototype.moveTo = function(top, left) {
  var self = this;
  this.canUpdate = false;
  self.$node.animate({ top: top, left: left }, self.timeBetweenSteps, 
    function() {
      self.canUpdate = true;
    }
  );

};
