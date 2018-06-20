var JumpyDancer = function(top, left, time, radius) {
  Dancer.call(this, top, left, time, radius, 'jumpy');
};

JumpyDancer.prototype = Object.create(Dancer.prototype);
JumpyDancer.prototype.constructor = JumpyDancer;

JumpyDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);

  var radius = Math.random() * this.radius;
  var angle = Math.random() * Math.PI * 2; 
  var newTop = this.center.top + radius * Math.sin(angle);
  var newLeft = this.center.left + radius * Math.cos(radius);
  this.setPosition(newTop, newLeft);
};
