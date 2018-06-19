var SlowDancer = function(top, left, timeBetweenSteps, radius) {

  CircleDancer.call(this, top, left, timeBetweenSteps, radius);

};

SlowDancer.prototype = Object.create(CircleDancer.prototype);
SlowDancer.prototype.constructor = SlowDancer;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
SlowDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);

  this.angularPosition += 0.5;
  this.angularPosition %= 2 * Math.PI;

  this.updateLeft();
};
