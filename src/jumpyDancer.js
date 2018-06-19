var JumpyDancer = function(top, left, timeBetweenSteps, radius) {
  Dancer.call(this, top, left, timeBetweenSteps, radius);
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

JumpyDancer.prototype.follow = function( lead ) {
  this.$node.show();
  Dancer.prototype.follow.call( this, lead );
};
