var BlinkyDancer = function( top, left, timeBetweenSteps ) {

  Dancer.call(this, top, left, timeBetweenSteps);

};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
BlinkyDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);

  this.setPosition(this.center.top, this.center.left);
  this.$node.toggle();
};


BlinkyDancer.prototype.follow = function( lead ) {

  this.$node.show();
  Dancer.prototype.pairWith.call(this, lead);

};