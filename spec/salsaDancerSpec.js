describe('salsaDancer', function() {

  var salsaDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    salsaDancer = new SalsaDancer(10, 20, timeBetweenSteps, 10);
  });

  it('should have a jQuery $node object', function() {
    expect(salsaDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should change position after each step', function() {
    var originalPosition = salsaDancer.position;
    salsaDancer.step();
    
    clock.tick(timeBetweenSteps);

    expect( originalPosition ).to.not.be.eql( salsaDancer.position );
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      var interval = timeBetweenSteps;

      sinon.spy(salsaDancer, 'step');
      expect(salsaDancer.step.callCount).to.be.equal(0);
      clock.tick(interval);

      expect(salsaDancer.step.callCount).to.be.equal(1);

      clock.tick(interval);
      expect(salsaDancer.step.callCount).to.be.equal(2);
    });  
  });
});
