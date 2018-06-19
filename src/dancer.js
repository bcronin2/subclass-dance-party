// Creates and returns a new dancer object that can step
var Dancer = function( top, left, timeBetweenSteps ) {

  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  
  this.timeBetweenSteps = timeBetweenSteps;
  this.oldStep = this.step;  

  this.setPosition( top, left );
  this.step();

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body

};

Dancer.prototype.step = function() {

  // setTimeout( this.step.bind(this), this.timeBetweenSteps );
  var self = this;

  setTimeout( function() {
    self.step();
  }, this.timeBetweenSteps );

};

Dancer.prototype.setPosition = function(top, left) {

  this.position = { top: top, left: left };
  this.$node.css(this.position);

};

Dancer.prototype.lineUp = function() {
  this.setPosition( 200, this.position.left );
};

Dancer.prototype.follow = function( lead ) {
  var self = this;
  var newPosition = { top: lead.position.top, left: lead.position.left + 20 };
  
  self.$node.animate( newPosition, self.timeBetweenSteps); 

  self.timeBetweenSteps = lead.timeBetweenSteps;
  self.step = function () {
    // inheriting the propertys needed
    Dancer.prototype.step.call( self );
    self.followPosition( lead );    

    // setInterval( this.followPosition.bind(this, lead), 
    //   this.timeBetweenSteps );
  };

};

Dancer.prototype.unfollow = function() {
  var self = this;
  self.step = self.__proto__.step;
  self.timeBetweenSteps = Math.random() * 1000;
  var top = $("body").height() * Math.random();
  var left = $("body").width() * Math.random();
  self.$node.animate( { top: top, left: left }, self.timeBetweenSteps, function() {
    self.setPosition(top, left);
  }); 
};

Dancer.prototype.followPosition = function( lead ) {
  // this.position = { 
  //   top: lead.position.top, 
  //   left: lead.position.left + 20 
  // };
  this.setPosition( lead.position.top, lead.position.left + 20 );
};
// var extend = function( dest, src ) {
//   for (var key in src) {
//     if ( !dest.hasOwnProperty( key ) ) {
//       dest[key] = src[key];
//     }
//   }
// }
