var SlowDancer = function(top, left, timeBetweenSteps, radius) {
  CircleDancer.call(this, top, left, timeBetweenSteps, radius, 'slow');
};

SlowDancer.prototype = Object.create(CircleDancer.prototype);
SlowDancer.prototype.constructor = SlowDancer;

SlowDancer.prototype.step = function() {
  CircleDancer.prototype.step.call(this);

  this.updateAngle();
  this.updateLeft();
};
