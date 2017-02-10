var cols, rows;
var side = 20;
var grid = [];
var current; // The current x,y on the grid that we are on

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
    stroke(255);
    if (this.walls.top)
      line(x, y, x+side, y);
    if (this.walls.right)
      line(x+side, y, x+side, y+side);
    if (this.walls.bottom)
      line(x+side, y+side, x, y+side);
    if (this.walls.left)
      line(x, y+side, x, y);

    if (this.visited) {
      noStroke();
      fill(255, 255, 255, 100);
      rect(x, y, side, side);
    }
  }

  this.checkNeighbors = function() {
    var top = grid[index(this.i, this.j-1)]
    var bottom = grid[index(this.i, this.j+1)]
    var left = grid[index(this.i+1, this.j)]
    var right = grid[index(this.i-1, this.j)]
    var neighbors = [top, right, bottom, left].filter(function(item) {
      return item !== undefined && !item.visited;
    });

    if (neighbors.length) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    }
    return undefined;
  }

  this.highlight = function() {
    var x = this.i * side;
    var y = this.j * side;
    noStroke();
    fill(66, 139, 202);
    rect(x, y, side, side);
  }
}

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

function draw() {
  background(41, 47, 52);

  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  // Pick a random neighbor
  var next = current.checkNeighbors();
  if (next) {
    // Mark as visited
    next.visited = true;

    // Remove walls
    removeWalls(current, next);

    // Move to next node
    current = next;
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1)
    return -1;
  return i + j * cols;
}

function removeWalls(cellA, cellB) {
  x = cellA.i - cellB.i;
  y = cellA.j - cellB.j;
  // debugger;
  if (x === 1) { // B-A
    cellA.walls.left = false;
    cellB.walls.right = false;
  } else if (x === -1) { // A-B
    cellA.walls.right = false;
    cellB.walls.left = false;
  } else if (y === 1) { // B|A
    cellA.walls.top = false;
    cellB.walls.bottom = false;
  } else if (y === -1) { // A|B
    cellA.walls.bottom = false;
    cellB.walls.top = false;
  }
}
