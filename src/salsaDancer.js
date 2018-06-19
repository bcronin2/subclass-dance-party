var SalsaDancer = function(top, left, timePerCycle, radius) {

  CircleDancer.call(this, top, left, timePerCycle, radius);

};

SalsaDancer.prototype = Object.create(CircleDancer.prototype);
SalsaDancer.prototype.constructor = SalsaDancer;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
SalsaDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);

  this.updateAngle();
  this.updateLeft();
  this.updateTop();
};
