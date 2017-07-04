var circle;
var time;
var gamestate;
var button_yes;

var STARTSCREEN = 0;
var COUNTDOWN = 1;
var GAME = 2;
var END = 3;
var text_ = "PREPARE!"
var score = 0;
var ref;
var startTime = 5;

function setup() {
  canvas = createCanvas(800,600);
  canvas.parent('game');
  circle =  new Circle(random(800), random(600),30 + random(50));
  frameRate(30);
  time = startTime;
  gamestate = 0;
  button_yes = new Button(width/2, height - 150, "HELL YEAH!");
  
  
   var config = {
    apiKey: "AIzaSyDGARbd4r5c6mB7FnlUUrUfhaAtunkqDd0",
    authDomain: "projekt-de842.firebaseapp.com",
    databaseURL: "https://projekt-de842.firebaseio.com",
    projectId: "projekt-de842",
    storageBucket: "",
    messagingSenderId: "1003649235465"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  ref = database.ref("scores");

  ref.orderByChild("score").limitToFirst(20).on('value', gotData, errData);
  
  
  
}

function draw() {
  background(0);
  fill(255);
  
  switch(gamestate){
    case 0:
        startscreen();
        break;
    case COUNTDOWN:
        countdown();
        break;
    case GAME:
        gameItself();
        break;
    case END:
        end();
        break;
  }
  
}

function gotData(data){
   var scorelists = selectAll('.scorelist');
   for(var i = 0; i < scorelists.length; i++){
      scorelists[i].remove(); 
   }

     var descList = [];
     data.forEach(function(child){
           var fi = child.val().name+":  "+child.val().score;
           descList.unshift(fi);
     });
     

     for(var i = 0; i < 20; i++){
        if(descList[i] != null){
            var li = createElement('li',descList[i] +"");
            li.class('scorelist');
            li.parent('scores');
        }
     }

   }
//}

function errData(err){
  
}


function Circle(x, y, r){
     this.x = x;
     this.y = y;
     this.r = r;
     this.mx = this.x + this.r;
     this.my = this.y + this.r;
     this.color = 255;
     this.active = true;
     
     this.inside = function(x_ , y_){
       var xdist = x_ - this.x;
       var ydist = y_ - this.y;
       var dist = sqrt(xdist * xdist + ydist * ydist);
       return( dist <= this.r);
     }
     
     this.pop = function(){
        active = false;
        circle = new Circle(random(800), random(600),30 + random(50));
        score++;
        time += 0.2;
     }    
}

function gameItself(){
     if(mouseIsPressed){
    if(circle.inside(mouseX, mouseY)){
       circle.pop(); 
    }
  }
 
 time -= 1/30;
 time = Math.round(time * 100) / 100
 if(time <= 0) gamestate = END;
  
  text( time + "", width-100, 90)
  ellipse(circle.x, circle.y, circle.r * 2, circle.r * 2); 
}

function startscreen(){
 
  
  
  
  
  textAlign(CENTER);
  textSize(100);
  strokeWeight(10);
  textFont("IMPACT");
  textStyle(BOLD);
  text("WANNA PLAY \n A GAME?", width/2, 100); 
  button_yes.pulse();
  button_yes.checkMouse(mouseX, mouseY);
  button_yes.draw_();

}

function Button(x, y, text_){
  
  this.x = x;
  this.y = y;
  this.w = textWidth
  this.size = 90;
  this.text_ = text_;
  this.dir = 1;
  
  this.pulse = function(){
         this.size += 1*this.dir; 
         if(this.size > 95 || this.size < 85) this.dir *= -1; 
  }
  
  this.draw_ = function(){
      textAlign(CENTER);
      textSize(this.size);
      strokeWeight(10);
      textFont("IMPACT");
      textStyle(BOLD);
      text(text_ + "", this.x, this.y); 
  }
  
  this.checkMouse = function(x , y){
      if(x >= 0 && x <= width){
        if(y >= 0 && y <= height){
           this.size = 150; 
           fill(255);
           if(mouseIsPressed){
              gamestate++;
              score = 0;
           }
        }else this.else_();
      }else this.else_();
      
  }
  
  this.else_ = function(){
    this.size= 90;
    fill(150);
  }
}

function countdown(){
   
   if(frameCount%30 == 0){
      if(text_ == "PREPARE!") text_ = 2;
      else text_ -=1;
      if(text_ == 0) gamestate++;
   }
       
      fill(255);
      textAlign(CENTER);
      textSize(100);
      strokeWeight(10);
      textFont("IMPACT");
      textStyle(BOLD);
      text(text_ + "", width/2, height/2); 
}

function end(){
   text("TIME'S UP! \n SCORE: " + score, width/2, height/2); 
    

  
  var name  = prompt("Please Enter Your Name: ");
  
  if(name != ""){
   var data = {
    name: name,
    score: score
    }
    ref.push(data); 
  }
  
  
  //////////////////////////////////
  score = 0;
  text_ = "PREPARE!"
  time = startTime;
  gamestate = 0;
  //////////////////////////////////

}