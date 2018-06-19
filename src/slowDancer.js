var SlowDancer = function( top, left, timeBetweenSteps ) {

  this.radius = 50;
  this.angularPosition = 0;
  this.center = {
    top: top,
    left: left - this.radius
  };
  Dancer.call( this, top, left, timeBetweenSteps );

};

SlowDancer.prototype = Object.create(Dancer.prototype);
SlowDancer.prototype.constructor = SlowDancer;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
SlowDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);

  this.angularPosition += 0.5;
  this.angularPosition %= 2 * Math.PI;

  var left = this.radius * Math.cos( this.angularPosition );
  left += this.center.left;
  
  this.setPosition( this.center.top, left );

};

SlowDancer.prototype.lineUp = function() {
  this.center.top = 200;
};
