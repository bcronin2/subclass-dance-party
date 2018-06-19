var SalsaDancer = function(top, left, timePerCycle, radius) {
  CircleDancer.call(this, top, left, timePerCycle, radius);
};

SalsaDancer.prototype = Object.create(CircleDancer.prototype);
SalsaDancer.prototype.constructor = SalsaDancer;

SalsaDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);

  this.updateAngle();
  this.updateLeft();
  this.updateTop();
};
