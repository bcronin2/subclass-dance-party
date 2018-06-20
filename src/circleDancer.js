var CircleDancer = function(top, left, time, radius, type) {
  this.angularPosition = 0;
  Dancer.call(this, top, left, time, radius, type);
};

CircleDancer.prototype = Object.create(Dancer.prototype);
CircleDancer.prototype.constructor = CircleDancer;

CircleDancer.prototype.setTimeBetweenSteps = function(time) {
  this.timeBetweenSteps = time / 12;
};

CircleDancer.prototype.updateAngle = function() {
  this.angularPosition += Math.PI / 6;
  this.angularPosition %= 2 * Math.PI;
};

CircleDancer.prototype.updateTop = function() {
  var top = -this.radius * Math.sin(this.angularPosition) + this.center.top;
  this.setPosition(top, this.position.left);
};

CircleDancer.prototype.updateLeft = function() {
  var left = -this.radius * Math.cos(this.angularPosition) + this.center.left;
  this.setPosition(this.position.top, left);
};

CircleDancer.prototype.scatter = function() {
  this.angularPosition = 0;
  Dancer.prototype.scatter.call(this);
};
