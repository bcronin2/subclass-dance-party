var BlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps, 0, 'blinky');
  this.setPosition(this.center.top, this.center.left);
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  this.$node.toggle();
};

BlinkyDancer.prototype.pairWith = function(lead) {
  Dancer.prototype.pairWith.call(this, lead);
  this.$node.show();
};
