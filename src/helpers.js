var defaultRadius = 20;
var slowSpeed = 1000;
var fastSpeed = 200;

var getRandomPosition = function() {
  var top = ($("body").height() - 2 * 20) * Math.random() + 20;
  var left = ($("body").width() - 2 * 20) * Math.random() + 20;
  return { top: top, left: left };
};

var getRandomSpeed = function() {
  return Math.random() * 1000;
};