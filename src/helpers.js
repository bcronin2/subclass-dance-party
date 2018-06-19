
var getRandomPosition = function() {
  var top = ($('body').height() - 2 * 20) * Math.random() + 20;
  var left = ($('body').width() - 2 * 20) * Math.random() + 20;
  return { top: top, left: left };
};

var getRandomSpeed = function() {
  return 1000 + Math.random() * 2000;
};

var getRandomImage = function() {
  return './' + env.dancerImages[Math.floor(Math.random() * env.dancerImages.length)];
};

var env = {
  offset: 20,
  defaultRadius: 20,
  slowSpeed: 1000,
  fastSpeed: 200,
  dancerImages: ['homer.gif', 'brianPBJ.gif', 'mario.gif']
};
