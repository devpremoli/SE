// The following code if after code review and passing Elint 
// Adjacent matrix is square matrix utilised to describe a fintite graph
const adjacentMatrix = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];


/**
 * Checks if the grid is valid.
 * @param {Object} grid - The Boggle board game.
 * @return {Boolean} - true if valid, otherwise false.
 */
function isValidGrid(grid) {
  if (grid==null) {
    return;
  }
  const regex = /(st|qu)|[a-prt-z]/;
  const n = grid.length;
  for (let i = 0; i < n; i++) {
    if (grid[i].length !== n) {
      return false;
    }
    for (let j = 0; j < grid[i].length; j++) {
      if (!grid[i][j].toLowerCase().match(regex)) {
        return false;
      }
    }
  }
  return true;
}


/**
 * Converts each words in dictionary and each letters in the grid to lower case.
 * @param {Object} grid - The Boggle game board.
 * @param {Object} dictionary - The list of available words.
 */
function lower(grid, dictionary) {
  for (let i=0; i < grid.length; i++) {
    for (let j=0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }
  for (let i=0; i < dictionary.length; i++) {
    dictionary[i] = dictionary[i].toLowerCase();
  }
}


/**
 * Creates a trie data structure
 * @param {Object} dictionary - The Boggle game board.
 * @return {Object} result
 */
function createTrie(dictionary) {
  const result = {};
  for (let i = 0; i < dictionary.length; i++) {
    result[dictionary[i]] = 1;
    let leng = dictionary[i].length;
    let str = dictionary[i];
    while (leng > 1) {
      str = str.substr(0, leng - 1);
      if (str in result) {
        if (str == 1) {
          result[str] = 1;
        }
      } else {
        result[str] = 0;
      }
      leng --;
    }
  }
  return result;
};


/**
 * @param {String} word
 * @param {int} y
 * @param {int} x
 * @param {Object} grid
 * @param {Object} visited
 * @param {Object} trie
 * @param {Set} mySet
 */
function finder(word, y, x, grid, visited, trie, mySet) {
  // base cases
  if (y < 0 || x < 0 ) {
    return;
  }
  if (y >= grid.length || x >= grid.length || visited[y][x] == true) {
    return;
  }

  // append grid[y][x] to the word
  word += grid[y][x];

  if (trie[word] != undefined) {
    visited[y][x] = true;
    if (trie[word] == 1) {
      if (word.length >= 3) mySet.add(word);
    }

    for (let i = 0; i < 8; i++) {
      finder(
          word,
          y + adjacentMatrix[i][0],
          x + adjacentMatrix[i][1],
          grid,
          visited,
          trie,
          mySet,
      );
    }
  }
  visited[y][x] = false;
};


/**
 * This function returns the required output which is a list of words
 * in given dictionary that can be formed from ther given grid
 * @param {Object} grid
 * @param {Object} dictionary
 * @return {[]}
 */
exports.findAllSolutions = function(grid, dictionary) {
  // checks if the grid is valid
  if (!isValidGrid(grid)) {
    return [];
  }

  // checks if the grid or dictionary is empty
  if (dictionary == null) return solutions;

  // convert grid and dictionary into same case i.e. lower case
  lower(grid, dictionary);

  let solutions = [];
  const trie = createTrie(dictionary);
  const mySet = new Set();

  for (let i = 0; i < grid.length; i++) {
    for (j = 0; j < grid.length; j++) {
      const word = '';
      const visited = new Array(grid.length)
          .fill(0)
          .map(() => new Array(grid.length).fill(0));
      finder(word, i, j, grid, visited, trie, mySet);
    }
  }
  solutions = Array.from(mySet);
  return solutions;
};
