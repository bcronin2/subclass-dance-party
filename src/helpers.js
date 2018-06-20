
var getRandomPosition = function() {
  var top = getRandomNumberBetween(6 * env.radius, $('body').height() - 5 * env.radius);
  var left = getRandomNumberBetween(6 * env.radius, $('body').width() - 5 * env.radius);
  return { top: top, left: left };
};

var getRandomSpeed = function() {
  return Math.random() * 500 + 500;
};

var getRandomNumberBetween = function(min, max) {
  return Math.random() * (max - min) + min;
};

var env = {
  radius: 50,
  dancerImages: { 
    blinky: './assets/mario.gif', 
    jumpy: './assets/vader.gif',
    slow: './assets/brian.gif',
    salsa: './assets/homer.gif'
  }
};
