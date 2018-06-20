var SlowDancer = function(top, left, time, radius) {
  CircleDancer.call(this, top, left, time, radius, 'slow');
};

SlowDancer.prototype = Object.create(CircleDancer.prototype);
SlowDancer.prototype.constructor = SlowDancer;

SlowDancer.prototype.step = function() {
  CircleDancer.prototype.step.call(this);

  this.updateAngle();
  this.updateLeft();
};
