var CircleDancer = function( top, left, timeBetweenSteps ) {

  this.radius = 50;
  this.angularPosition = 0;
  this.center = {
    top: top,
    left: left - this.radius
  };
  Dancer.call( this, top, left, timeBetweenSteps );

};

CircleDancer.prototype = Object.create(Dancer.prototype);
CircleDancer.prototype.constructor = CircleDancer;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
// CircleDancer.prototype.step = function() {
//   Dancer.prototype.step.call(this);

//   this.angularPosition += 0.5;
//   this.angularPosition %= 2 * Math.PI;

//   var top = this.radius * Math.sin( this.angularPosition );
//   var left = this.radius * Math.cos( this.angularPosition );
//   top += this.center.top;
//   left += this.center.left;
  
//   this.setPosition( top, left );

// };

// CircleDancer.prototype.lineUp = function() {
//   this.center.top = 200;
// };