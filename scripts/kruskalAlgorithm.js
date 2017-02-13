/*
 * A randomized implementation of Kruskal's algorithm for maze generation.
 */

let edges = new Set();
let edgesList, vertexA, vertexB, edgesDisjointSet;

function Kruskal(resize = false) {
  console.log('Krusal');
  // debugger;
  algorithmCallback = Kruskal;
  if (resize) {
    setup();
  }
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
Kruskal.prototype.initialize = function () {
  for (let i = 0; i < grid.length; i++) {
    // Creating the set of edges for Kruskal's algorithm
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

// Descript and psuedocode
Kruskal.prototype.descript = function () { return `
  A maze generator that uses a randomized version of Krusal's algorithm for finding a minimum spanning tree in an undirected graph, which is a similar problem to maze generation. This algorithm can be abstracted as the follows:
  `; }
Kruskal.prototype.algorithm = function () { return `
  // A grid is initialized with all cells belonging to a unique set (disjoint sets)
  const ds = new DisjointSet(grid);
  // While there are unvisited edges
  while (grid.hasUnvisitedEgdes()) {
    // Pick a random unvisited edge
    edge = grid.spliceRandomEdge();
    vertexA, vertexB = edge.getVertices();
    vertexA.visited = true;
    vertexB.visited = true;
    // If nodes of the edge belong to distinct sets,
    // remove that edge and join the two distinct sets
    if (ds.find(vertexA) !== ds.find(vertexB)) {
      removeWallsBetween(vertexA, vertexB);
      ds.union(vertexA, vertexB);
    }
  }
  `; }
