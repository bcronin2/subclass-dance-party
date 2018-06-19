
var getRandomPosition = function() {
  var top = ($('body').height() - 2 * 20) * Math.random() + 20;
  var left = ($('body').width() - 2 * 20) * Math.random() + 20;
  return { top: top, left: left };
};

var getRandomSpeed = function() {
  return Math.random() * 1000;
};

var env = {
  defaultRadius: 20,
  slowSpeed: 1000,
  fastSpeed: 200,
};
