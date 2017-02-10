var cols, rows;
var side = 30;
var grid = [];
var current; // The current x,y on the grid that we are on

function setup() {
  createCanvas(1200, 1200);
  cols = floor(width/side);
  rows = floor(height/side);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      var cell = new Cell(col, row);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function draw() {
  background(253, 213, 0);

  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = { left: true, right: true, top: true, bottom: true };
  this.visited = false;

  this.show = function() {
    var x = this.i * side;
    var y = this.j * side;
    stroke(0);
    if (this.walls.top)
      line(x, y, x+side, y);
    if (this.walls.right)
      line(x+side, y, x+side, y+side);
    if (this.walls.bottom)
      line(x+side, y+side, x, y+side);
    if (this.walls.left)
      line(x, y+side, x, y);

    if (this.visited) {
      fill(41, 47, 52);
      rect(x,y,side,side);
    }
  }
}
