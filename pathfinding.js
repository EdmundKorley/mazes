var cols, rows, current; // The current x,y on the grid that we are on
var side = 30;
var grid = [];

function setup() {
  createCanvas(side * 20 + 1, side * 20 + 1);
  // frameRate(5);
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

  DepthFirstSearch();
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
