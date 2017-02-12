/*
 * Our depth first search maze building routine.
 */

let stack = []; // Stack for our DFS

function DepthFirstSearch() {
  if (current == undefined) {
    current = grid[floor(grid.length / 2)];
  }
  current.visited = true;
  current.highlight();

  // Pick a random neighbor
  let next = current.randomNeighbor();
  if (next) {
    // Mark as visited
    next.visited = true;
    // Our stack
    stack.push(current);
    // Remove walls
    manipulateWalls(current, next);
    // Move to next node
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}
