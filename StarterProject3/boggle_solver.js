// Adjacent matrix is square matrix utilised to describe a fintite graph
var adjacent_matrix = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
];



/*
This function returns true if the given grid is valid else returns flase
*/
function isValidGrid(grid) {
  if (grid == null) {
    return false;
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



/*
This function converts the items in dictionary and letters in grid into
same case i.e. lowercase
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
};



// This function creates a trie data structure from the given dictionary
function create_trie (dictionary) {
  var result = {};
  for (var i = 0; i < dictionary.length; i++) {
    result[dictionary[i]] = 1;
    var leng = dictionary[i].length;
    var str = dictionary[i];
    for (var j = leng; leng > 1; leng--) {
      str = str.substr(0, leng - 1);
      if (str in result) {
        if (str == 1) {
          result[str] = 1;
        }
      } else {
        result[str] = 0;
      }
    }
  }
  return result;
};


// This is a recursive function
function finder (word, y, x, grid, visited, trie, my_set) {
  // base case
  if (y < 0 || x < 0 || y >= grid.length || x >= grid.length || visited[y][x] == true) {
    return;
  }
  // append grid[y][x] to the word
  word += grid[y][x];

  if (trie[word] != undefined) {
    visited[y][x] = true;
    if (trie[word] == 1) {
      if (word.length >= 3) my_set.add(word);
    }
    for (let i = 0; i < 8; i++) {
      finder(
        word,
        y + adjacent_matrix[i][0],
        x + adjacent_matrix[i][1],
        grid,
        visited,
        trie,
        my_set
      );
    }
  }

  visited[y][x] = false;
};



/*
This function returns the required output which is a list of words in
given dictionary that can be formed from ther given grid
*/
exports.findAllSolutions = function (grid, dictionary) {
  // checks if the grid is valid
  if (!isValidGrid(grid)) {
    return [];
  }

  // Made a change here after code review - added dictinoary == null condition in isValidGrid function
  //if (grid == null || dictionary == null) return solutions;
  if (grid == null) {
    return [];
  }

  // convert grid and dictionary into same case i.e. lower case
  lower(grid, dictionary);

  var solutions = [];
  var trie = create_trie(dictionary);
  var my_set = new Set();

  for (let i = 0; i < grid.length; i++) {
    for (j = 0; j < grid.length; j++) {
      var word = "";
      var visited = new Array(grid.length)
        .fill(0)
        .map(() => new Array(grid.length).fill(0));
      finder(word, i, j, grid, visited, trie, my_set);
    }
  }
  solutions = Array.from(my_set);
  return solutions;
};
