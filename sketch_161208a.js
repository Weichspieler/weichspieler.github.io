var field;
var field_new;
var num_row;
var num_col;
var f_size;



function setup() {
  frameRate(1);
  

  
  createCanvas(800 , 800);
  this.f_size = 8;
  this.num_col = floor(width/f_size);
  this.num_row = floor(height/f_size);

  print(num_col);
  this.field = new Array(num_row);
  this.field_new = new Array(num_row);

  for (var i = 0; i < this.field.length; i++) {
    this.field[i] = new Array(num_col);
    this.field_new[i] = new Array(num_col);
    for (var j = 0; j < this.field[i].length; j++) {
      this.field[i][j] = 0;
      this.field_new[i][j] = 0;
    }
  }

  this.field[5][5] = 1;
  this.field[6][6] = 1;
  this.field[7][6] = 1;
  this.field[7][5] = 1;
  this.field[7][4] = 1;
  
  
  button = createButton('RANDOM');
  button.position(900, 100);
  button.mousePressed(fillR);
  
  slider = createSlider(1,60,1);
  slider.position(900, 200);
  

  
}

function draw() {
  frameRate(slider.value());
  background(255);
  
  updateField();
  swap();
  showField();
}

function showField() {
  for (var i = 0; i < this.field.length; i++) {
    for (var j = 0; j < this.field[i].length; j++) {
      if (this.field[j][i]) fill('red');
      else fill(255);
      stroke(0);
      rect(j*f_size, i*f_size, f_size, f_size);
    }
  }
}

function swap() {
  for (var i = 0; i < this.field.length; i++) {
    for (var j = 0; j < this.field[i].length; j++) {
      var temp = this.field[i][j];
      this.field[i][j] = this.field_new[i][j];
      this.field_new[i][j] = temp;
    }
  }
}

function updateField() {
  for (var i = 0; i < this.field.length; i++) {
    for (var j = 0; j < this.field[i].length; j++) {
      var n = check(j, i);
      field_new[j][i] = 0;

      if (this.field[j][i]) {
        if (n < 2) this.field_new[j][i] = 0;
        if (n == 3 || n == 2) this.field_new[j][i] = 1;
        if (n > 3) this.field_new[j][i] = 0;
      } else {
        if (n == 3) this.field_new[j][i] = 1;
        else field_new[j][i] = 0;
      }
    }
  }
}

function check(x, y) {
  var top = y == 0;
  var bot = y == num_row-1;
  var left = x == 0;
  var right = x == num_col-1;
  var n = 0;

  for (var i = -1 + top; i <= 1 - bot; i++) {
    for (var j = -1 +  left; j <= 1- right; j++) {
      if ((this.field[x+j][y+i]) && !(i == 0 && j == 0)) n++;
    }
  }

  return n;
}

function fillR() {
  print('salli');
  for (var i = 0; i < field.length; i++) {
    for (var j = 0; j < field[i].length; j++) {
      field[i][j] = floor(random(2));
      field_new[i][j] = floor(random(2));
    }
  }
}