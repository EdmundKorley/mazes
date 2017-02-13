/*
 * Our depth first search maze building routine.
 */

let stack = []; // Stack for our DFS

function DepthFirstSearch(resize = false) {
  console.log('DepthFirstSearch');
  algorithmCallback = DepthFirstSearch;
  if (resize) {
    setup();
  }
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

DepthFirstSearch.prototype.initialize = function () {
  // Set starting node to be the top-left one
  current = grid[0];
}

// Descript and psuedocode
DepthFirstSearch.prototype.descript = function () { return `
  A maze generator that uses a randomized depth-first search approach with a <em>recursive</em> backtracker.
  You may use actual function recursion and the call stack to implement this or, in our case, a stack (on the heap) for lighter stack frames.
  This algorithm can be abstracted as the following routine:
  `; }
DepthFirstSearch.prototype.algorithm = function () { return `
  // Given a grid (array-like representation of maze) and stack,
  // make the center cell the current cell and mark it as visited
  let current = grid[middle];
  // While there are unvisited cells
  while (grid.hasUnvisitedNeighbors()) {
    current.visited = true;
    // Pick a random unvisited neighbor
    let next = current.randomNeighbor();
    if (next) {
      // Mark as visited
      next.visited = true;
      // Push the current cell to the stack
      stack.push(current);
      // Remove the wall between the current and chosen cell
      removeWallsBetween(current, next);
      // Move to next node
      current = next;
    // Else if the stack isn't empty,
  } else if (stack.empty() != false) {
      current = stack.pop(); // pop a cell off (backtrack)
    }
  }
  `; }
