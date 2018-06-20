describe('dancer', function() {

  var dancer, clock;
  var timeBetweenSteps = 100;
  var radius = 10;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    dancer = new Dancer(10, 20, timeBetweenSteps, radius);
  });

  it('should have a jQuery $node object', function() {
    expect(dancer.$node).to.be.an.instanceof(jQuery);
  });

  it('setPosition should update position of jQuery $node', function() {
    dancer.setPosition(20, 20);
    expect(dancer.$node[0].style.top).to.be.equal('20px');
    expect(dancer.$node[0].style.left).to.be.equal('20px');
  });

  it('position of $node should never be more than "radius" distance from center', function() {
    for (var i = 0; i < 1000; i++) {
      clock.tick(timeBetweenSteps);
      var topOffset = Math.abs(dancer.$node[0].style.top - dancer.center.top);
      var leftOffset = Math.abs(dancer.$node[0].style.left - dancer.center.left);
      expect(dancer.$node[0].style.top).is.at.most(dancer.radius);
      expect(dancer.$node[0].style.left).is.at.most(dancer.radius);
    }
  });

  it('should calculate distances properly', function() {
    var pairDancer = new Dancer(50, 50, timeBetweenSteps, radius);
    clock.tick(timeBetweenSteps);
    expect(dancer.getDistanceTo(pairDancer)).to.be.equal(50);
  });

  it('should pair dancers properly', function() {
    var pairDancer = new Dancer(50, 50, timeBetweenSteps, radius);
    dancer.pairWith(pairDancer);
    clock.tick(timeBetweenSteps);
    expect(dancer.getDistanceTo(pairDancer)).to.be.equal(dancer.radius);
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(dancer, 'step');
      expect(dancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps);

      expect(dancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(dancer.step.callCount).to.be.equal(2);
    });
  });
});
