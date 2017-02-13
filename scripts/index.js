let cols, rows, current; // The current x,y on the grid that we are on
let side = 30;
let grid = [];
let speed = 30;
let algorithmCallback;

// Setup our menu
// debugger;
document.getElementById("kruskalAlgorithm").addEventListener("click", displayAlgorithm("kruskalAlgorithm"));
document.getElementById("depthFirstSearch").addEventListener("click", displayAlgorithm("depthFirstSearch"));
// Syntax highlighting for descript
hljs.initHighlighting();

function displayAlgorithm(category) {
  if (category === "kruskalAlgorithm") {
      algorithmCallback = Kruskal;
      return function() {
        Kruskal(true);
      };
  }
  if (category === "depthFirstSearch") {
      algorithmCallback = DepthFirstSearch;
      return function() {
        DepthFirstSearch(true);
      };
  }
}

function setup() {
  console.log('Setup');
  // Populate descript and algorithm text
  document.getElementById("descript").innerHTML = algorithmCallback.prototype.descript();
  document.getElementById("algorithm").innerHTML = algorithmCallback.prototype.algorithm();

  createCanvas(side * 15 + 1, side * 15 + 1);
  if (speed)
    frameRate(speed);
  cols = floor(width/side);
  rows = floor(height/side);
  // Storing the cells in a linear array data structure
  grid = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let cell = new Cell(col, row);
      grid.push(cell);
    }
  }
  // Current defaults to middle
  current = grid[grid.length / 2];
  // Initialize the algorithm we choose
  algorithmCallback.prototype.initialize();
  // Syntax highlighting for descript
  let code = document.getElementById("algorithm");
  hljs.highlightBlock(code);
}

function draw() {
  background(41, 47, 52);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  // DepthFirstSearch();
  // Kruskal();
  algorithmCallback();
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
