describe('jumpyDancer', function() {

  var jumpyDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    jumpyDancer = new JumpyDancer(10, 20, timeBetweenSteps, 10);
  });

  it('should have a jQuery $node object', function() {
    expect(jumpyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should change position after each step', function() {
    var originalPosition = jumpyDancer.position;
    jumpyDancer.step();
    
    clock.tick(timeBetweenSteps);

    expect(originalPosition).to.not.be.eql(jumpyDancer.position);
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(jumpyDancer, 'step');
      expect(jumpyDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps);

      expect(jumpyDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(jumpyDancer.step.callCount).to.be.equal(2);
    });
  });
});
