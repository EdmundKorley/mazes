let cols, rows, current; // The current x,y on the grid that we are on
let side = 30;
let grid = [];

function setup() {
  createCanvas(side * 15 + 1, side * 15 + 1);
  // frameRate(10);
  cols = floor(width/side);
  rows = floor(height/side);

  // Storing the cells in a linear array data structure
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let cell = new Cell(col, row);
      grid.push(cell);
    }
  }

  // Initialize the algorithm we choose
  Krusal.prototype.initialize();

  // Syntax highlighting for descript
  hljs.initHighlighting();
}

function draw() {
  background(41, 47, 52);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  // DepthFirstSearch();
  Krusal();
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1)
    return -1;
  return i + j * cols;
}

function manipulateWalls(cellA, cellB, present = false) {
  x = cellA.i - cellB.i;
  y = cellA.j - cellB.j;
  // debugger;
  if (x === 1) { // B-A
    cellA.walls.left = present;
    cellB.walls.right = present;
  } else if (x === -1) { // A-B
    cellA.walls.right = present;
    cellB.walls.left = present;
  } else if (y === 1) { // B|A
    cellA.walls.top = present;
    cellB.walls.bottom = present;
  } else if (y === -1) { // A|B
    cellA.walls.bottom = present;
    cellB.walls.top = present;
  }
}
