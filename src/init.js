$(document).ready(function() {
  window.dancers = [];


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

    dancers.push(dancer);
    
    $('body').append(dancer.$node);
  });

  $('.lineUpDancersButton').on('click', function(event) {
    dancers.forEach(function(dancer, i, dancers) {
      var left = i * $('body').width() / dancers.length;
      dancer.moveTo(500, left, dancer.pause);
    });
    $(this).hide();
    $('.scatterDancersButton').show();
  });

  $('.scatterDancersButton').on('click', function(event) {
    dancers.forEach(function(dancer) {
      dancer.scatter();
    });
    $(this).hide();
    $('.lineUpDancersButton').show();
  });

  $('.pairDancersButton').on('click', function(event) {
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
    $('.unpairDancersButton').show();

  });

  $('.unpairDancersButton').on('click', function(event) {
    dancers.forEach(function(dancer) {
      dancer.unpair();
    });
    $(this).hide();
    $('.pairDancersButton').show();
  });
  
});
