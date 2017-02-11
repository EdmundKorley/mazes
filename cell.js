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
