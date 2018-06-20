$(document).ready(function() {
  window.dancers = [];
    
  var $dancers = $('#dancers');
  var $lineUpDancers = $('.lineUpDancersButton');
  var $scatterDancers = $('.scatterDancersButton');
  var $pairDancers = $('.pairDancersButton');
  var $unpairDancers = $('.unpairDancersButton');
  var $deleteDancers = $('.deleteDancersButton');

  $('.addDancerButton').on('click', function(event) {
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    var position = getRandomPosition();

    var dancer = new dancerMakerFunction(position.top, 
      position.left, getRandomSpeed(), env.radius);

    dancers.push(dancer);
  
    $('#dancers').append(dancer.$node);

    $deleteDancers.removeClass('disabled');
    if (dancers.length > 1) {
      $lineUpDancers.removeClass('disabled');
      $pairDancers.removeClass('disabled');
    }
  });

  $lineUpDancers.on('click', function(event) {
    var adjustedWidth = $('body').width() - 2 * env.radius;
    if (dancers.length > 1) {
      dancers.forEach(function(dancer, i, dancers) {
        var left = i * adjustedWidth / dancers.length + env.radius;
        dancer.moveTo(500, left, dancer.pause);
      });
      $(this).hide();
      $scatterDancers.show();
      $pairDancers.show();
      $unpairDancers.hide();
    }
  });

  $scatterDancers.on('click', function(event) {
    dancers.forEach(function(dancer) {
      dancer.scatter();
    });
    $(this).hide();
    $lineUpDancers.show();
    $pairDancers.show();
    $unpairDancers.hide();
  });

  $pairDancers.on('click', function(event) {
    if (dancers.length > 1) {
      var unpaired = dancers.concat();  

      while (unpaired.length) {
        let nextDancer = unpaired.pop();
        let minDistance = Number.POSITIVE_INFINITY;
        let pairIndex;
        
        for (let i = 0; i < unpaired.length; i++) {
          var distance = nextDancer.getDistanceTo(unpaired[i]);
          if (distance < minDistance) {
            minDistance = distance;
            pairIndex = i;
          }
        }
        
        if (pairIndex >= 0) {
          unpaired[pairIndex].pairWith(nextDancer);
          unpaired.splice( pairIndex, 1);
          nextDancer.play();
        }
        
      }
      $(this).hide();
      $unpairDancers.show();
    }
  });

  $unpairDancers.on('click', function(event) {
    dancers.forEach(function(dancer) {
      dancer.scatter();
    });
    $(this).hide();
    $pairDancers.show();
  });

  $deleteDancers.on('click', function(event) {
    $('.dancer').remove();
    window.dancers = [];
    initializeButtons();
  });

  $dancers.on('click', '.dancer', function(event) {
    restoreDefaultButtons();
    var dancer = dancers[ $(this).data('id') ];
    var radius = Math.min($('body').width(), $('body').height()) / 3;
    var center = { top: $('body').height() / 2, left: $('body').width() / 2 };
    
    var angle = 0;
    dancers.forEach(function(circleDancer) {
      if (circleDancer !== dancer) {
        var top = radius * Math.sin(angle) + center.top;
        var left = radius * Math.cos(angle) + center.left;
        circleDancer.moveTo(top, left, circleDancer.pause);
        angle += 2 * Math.PI / (dancers.length - 1);
      }
    });
    dancer.moveTo(center.top, center.left, function() {
      dancer.pause();
      dancer.specialMove();
    });
  });

  var initializeButtons = function() {
    restoreDefaultButtons();
  
    $lineUpDancers.addClass('disabled');
    $pairDancers.addClass('disabled');
    $deleteDancers.addClass('disabled');
  };

  var restoreDefaultButtons = function() {
    $lineUpDancers.show();
    $pairDancers.show();
    $unpairDancers.hide();
    $scatterDancers.hide();
  }; 
  
});
