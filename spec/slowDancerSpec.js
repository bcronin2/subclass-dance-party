describe('slowDancer', function() {

  var slowDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    slowDancer = new SlowDancer(10, 20, timeBetweenSteps, 10);
  });

  it('should have a jQuery $node object', function() {
    expect(slowDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should change position after each step', function() {
    var originalPosition = slowDancer.position;
    slowDancer.step();
    
    clock.tick(timeBetweenSteps);

    expect(originalPosition).to.not.be.eql(slowDancer.position);
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      var interval = timeBetweenSteps;

      sinon.spy(slowDancer, 'step');
      expect(slowDancer.step.callCount).to.be.equal(0);
      clock.tick(interval);

      expect(slowDancer.step.callCount).to.be.equal(1);

      clock.tick(interval);
      expect(slowDancer.step.callCount).to.be.equal(2);
    });
  });
});
