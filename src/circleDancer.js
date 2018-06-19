var CircleDancer = function(top, left, timeBetweenSteps, radius) {
  this.angularPosition = 0;
  Dancer.call(this, top, left, timeBetweenSteps, radius);
};

CircleDancer.prototype = Object.create(Dancer.prototype);
CircleDancer.prototype.constructor = CircleDancer;

CircleDancer.prototype.updateLeft = function() {
  var left = this.radius * Math.cos(this.angularPosition) + this.center.left;
  this.setPosition(this.position.top, left);
};

CircleDancer.prototype.updateTop = function() {
  var top = this.radius * Math.sin(this.angularPosition) + this.center.top;
  this.setPosition(top, this.position.left);
};

CircleDancer.prototype.reposition = function() {
  this.angularPosition = 0;
  Dancer.prototype.reposition.call(this);
};
