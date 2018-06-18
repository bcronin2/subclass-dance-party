var SalsaDancer = function( top, left, timeBetweenSteps ) {

  this.radius = 50;
  this.angularPosition = 0;
  this.center = {
    top: top,
    left: left - this.radius
  };
  Dancer.call( this, top, left, timeBetweenSteps );

};

SalsaDancer.prototype = Object.create(Dancer.prototype);
SalsaDancer.prototype.constructor = SalsaDancer;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
SalsaDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  // this.$node.toggle();

  this.angularPosition += 0.5;
  this.angularPosition %= 2 * Math.PI;


  var top = this.radius * Math.sin( this.angularPosition );
  var left = this.radius * Math.cos( this.angularPosition );
  top += this.center.top;
  left += this.center.left;
  
  this.setPosition( top, left );

};
