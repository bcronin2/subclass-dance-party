$(document).ready(function() {
  window.dancers = [];

  var $lineUpDancers = $('.lineUpDancersButton');
  var $scatterDancers = $('.scatterDancersButton');
  var $pairDancers = $('.pairDancersButton');
  var $unpairDancers = $('.unpairDancersButton');

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var position = getRandomPosition();


    var dancer = new dancerMakerFunction(position.top, 
      position.left, getRandomSpeed(), env.defaultRadius);

    // dancer.dancerId = dancers.length;

    dancers.push(dancer);

    
    
    $('#dancers').append(dancer.$node);

    if (dancers.length > 1) {
      $('.disabled').removeClass('disabled');
    }
  });

  $lineUpDancers.on('click', function(event) {
    if (dancers.length > 1) {
      dancers.forEach(function(dancer, i, dancers) {
        var left = i * $('body').width() / dancers.length;
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

  $('#dancers').on('click', '.dancer', function(event) {
    // move this dancer to center;
    // form circle with all other dancers
    // var top = 
    var dancer = dancers[ $(this).data('id') ];
    var radius = $('#dancers').width() / 3;
    var center = { top: $('#dancers').height() / 2, left: $('#dancers').width() / 2 };
    
    var angle = 0;
    dancers.forEach(function(circleDancer) {
      if (circleDancer !== dancer) {
        var top = radius * Math.sin(angle) + center.top;
        var left = radius * Math.cos(angle) + center.left;
        circleDancer.moveTo(top, left, dancer.pause);
        angle += 2 * Math.PI / (dancers.length - 1);
      }
    });
    dancer.moveTo(center.top, center.left, function() {
      dancer.pause();
      dancer.specialMove();
    });
  });
  
});
