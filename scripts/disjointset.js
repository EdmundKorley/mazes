/*
 * A simple Disjoint Set implementation
 */
function DisjointSet(grid) {
  this.universe = grid.map(function(i) { return -1; });

  // Join two disjoint sets in logarithmic time
  this.union = function(rootA, rootB) {
    // Make taller root the 'new' root
    if (this.universe[rootB] < this.universe[rootA]) {
      this.universe[rootA] = rootB;
    } else { // Trees same height so new root is taller
      if (this.universe[rootA] == this.universe[rootB]) {
        this.universe[rootA]--;
      }
      this.universe[rootB] = rootA;
    }
  }

  // Find the set a node belongs to in logarithmic time,
  // identifing the set is the 'root' number
  this.find = function(index) {
    if (this.universe[index] < 0) {
      return index;
    } else {
      // Path compression by making the root the new parent
      this.universe[index] = this.find(this.universe[index]);
      return this.universe[index];
    }
  }
}
