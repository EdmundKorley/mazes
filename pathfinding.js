var cols, rows;
var side = 80;
var grid = [];
var current; // The current x,y on the grid that we are on

function setup() {
  createCanvas(802, 802);
  frameRate(5);
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

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1)
    return -1;
  return i + j * cols;
}

function draw() {
  background(253, 213, 0);

  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    current = next;
  }
}

/*
 * Our abstraction for a node in a maze.
 */
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

  this.checkNeighbors = function() {
    var top = grid[index(this.i, this.j-1)]
    var bottom = grid[index(this.i, this.j+1)]
    var left = grid[index(this.i+1, this.j)]
    var right = grid[index(this.i-1, this.j)]
    var neighbors = [top, right, bottom, left];
    neighbors.filter(function(item) {
      return item && !item.visited;
    });

    if (neighbors.length) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    }
  }
}
