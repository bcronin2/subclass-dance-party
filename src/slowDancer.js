var SlowDancer = function(top, left, timePerCycle, radius) {
  CircleDancer.call(this, top, left, timePerCycle, radius);
};

SlowDancer.prototype = Object.create(CircleDancer.prototype);
SlowDancer.prototype.constructor = SlowDancer;

SlowDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);

  this.updateAngle();
  this.updateLeft();
};
