var JumpyDancer = function(top, left, timeBetweenSteps, radius) {
  Dancer.call(this, top, left, timeBetweenSteps, radius, 'jumpy');
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

// JumpyDancer.prototype.specialMove = function() {
//   // var angle = 0;
//   // this.$node.animate({ 'transform': 'rotate(360deg)' });
//   // while (angle < 360) {
//   //   // setTimeout((function(angle) {
//   //   //   return function() {
//   //       node.css({ 'transform': 'rotate(' + angle + 'deg)' });
//   //     // };
//   //   // }( angle )), 50);
//   //   angle += 60;
//   // }
//   // var self = this;

//   // rotate = function(degree) {

//   //   // For webkit browsers: e.g. Chrome
//   //   this.$node.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
//   //   // For Mozilla browser: e.g. Firefox
//   //   this.$node.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});

//   //   // Animate rotation with a recursive call
//   //   setTimeout(function() { degree < 360 && rotate(++degree); }, 65);
//   // };
//   // rotate.call(this, 0);
// };
