var SalsaDancer = function(top, left, time, radius) {
  CircleDancer.call(this, top, left, time, radius, 'salsa');
};

SalsaDancer.prototype = Object.create(CircleDancer.prototype);
SalsaDancer.prototype.constructor = SalsaDancer;

SalsaDancer.prototype.step = function() {
  CircleDancer.prototype.step.call(this);

  this.updateAngle();
  this.updateLeft();
  this.updateTop();
};
