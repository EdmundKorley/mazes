/*
 * Our abstraction for a node in a maze.
 */
function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = { left: true, right: true, top: true, bottom: true };
  this.visited = false;

  // Draw on canvas
  this.show = function() {
    let x = this.i * side;
    let y = this.j * side;
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

  // Get all neighbors indicies
  this.getNeighbors = function() {
    let top = index(this.i, this.j-1)
    let bottom = index(this.i, this.j+1)
    let left = index(this.i+1, this.j)
    let right = index(this.i-1, this.j)
    return [top, right, bottom, left].filter(function(node) {
      return node !== -1;
    });
  }

  // Get a random unvisited neighbor
  this.randomNeighbor = function() {
    let neighbors = this.getNeighbors().filter(function(nodeId) {
      return !grid[nodeId].visited;
    }).map(function(nodeId) {
      return grid[nodeId];
    });

    if (neighbors.length) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    }
    return undefined;
  }

  // Color active cell
  this.highlight = function() {
    let x = this.i * side;
    let y = this.j * side;
    noStroke();
    fill(66, 139, 202);
    rect(x, y, side-1, side-1);
    return this;
  }
}
