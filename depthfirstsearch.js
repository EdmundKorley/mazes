/*
 * Our depth first search maze building routine.
 */

var stack = []; // Stack for our DFS

function DepthFirstSearch() {
  current.visited = true;
  current.highlight();

  // Pick a random neighbor
  var next = current.checkNeighbors();
  if (next) {
    // Mark as visited
    next.visited = true;
    // Our stack
    stack.push(current);
    // Remove walls
    removeWalls(current, next);
    // Move to next node
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}
