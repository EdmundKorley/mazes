/*
 * A randomized implementation of Krusal's algorithm for maze generation.
 */

let edges = new Set();
let edgesList, vertexA, vertexB, edgesDisjointSet;

function Krusal() {
  if (edgesList.length) {
    // Splice out random edge
    let randomIndex = floor(random(0, edgesList.length));
    let edge = edgesList[randomIndex];
    edgesList.splice(randomIndex, 1);
    vertexA = grid[edge[0]];
    vertexB = grid[edge[1]];
    // If they belong to distinct sets, remove walls
    let rootA = edgesDisjointSet.find(edge[0]);
    let rootB = edgesDisjointSet.find(edge[1]);
    if (edgesList.length && rootA !== rootB) {
      vertexA.highlight();
      vertexB.highlight();
      vertexA.visited = true;
      vertexB.visited = true;      
      manipulateWalls(vertexA, vertexB);
      edgesDisjointSet.union(rootA, rootB);
    }
  }
}

// Our intialization routine
Krusal.prototype.initialize = function () {
  for (let i = 0; i < grid.length; i++) {
    // Creating the set of edges for Krusal's algorithm
    let neighborIndicies = grid[i].getNeighbors()
    neighborIndicies.forEach(function (index) {
      let key = [i, index].sort().toString();
      if (edges.has(key) == false)
        edges.add(key);
    });
    // Giving each vertex an 'index'
    grid[i].index = i;
  }
  // Convert set into list of tuples
  edgesList = Array.from(edges).map(item => item.split(",").map(str => Number(str)));
  // Intialize our disjoint set data structure
  edgesDisjointSet = new DisjointSet(grid);
  // Zero walls
  Cell.prototype.walls = { left: false, right: false, top: false, bottom: false };
}
