function setup() { 
  createCanvas(800, 600);
  this.ball = new Ball(50, 50, 50);
  this.maxBall = 50;
  this.balls = [];
  this.failprev = 2000;
  this.count = 0;
  this.wishedBalls = 500;
  
  
  while(balls.length < this.wishedBalls && this.count < this.failprev){
    
    var ball_ = new Ball(random(width), random(height), random(5, 40));
    
    var collides_ = false;
    for(var i = 0; i < balls.length; i++){
       if(ball_.collides(balls[i])){
         collides_ = true;
       }
    }
    
    if(!collides_){
      balls.push(ball_);
    }
    
    this.count++;
  }
}

function draw() {
  background(10);

  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].render();
  }
}




this.Ball = function(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;


  this.render = function() {
    fill(255, random(255), 221);
    ellipse(x, y, r*2, r*2);
  }


  this.collides = function(other) {
    var r_2 = (this.r + other.r) * (this.r +other.r);
    return (this.dis_2(this.x, other.x, this.y, other.y) < r_2);
  }



  this.dis_2 = function(x1, x2, y1, y2) {
    var xdis = abs(x1-x2);
    var ydis = abs(y1-y2);

    return (xdis*xdis + ydis*ydis);
  }
}