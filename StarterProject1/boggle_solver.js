/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
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





function finder (word, y, x, grid, visited, trie, my_set) {
  if (y < 0 || x < 0 || y >= grid.length || x >= grid.length || visited[y][x] == true) {
    return;
  }
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







exports.findAllSolutions = function (grid, dictionary) {
  if (grid == null || dictionary == null) return solutions;
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





var grid = [
  ["T", "W", "Y", "R"],
  ["E", "N", "P", "H"],
  ["G", "Z", "Qu", "R"],
  ["O", "N", "T", "A"],
];

var dictionary = [
  "art",
  "ego",
  "gent",
  "get",
  "net",
  "new",
  "newt",
  "prat",
  "pry",
  "qua",
  "quart",
  "quartz",
  "rat",
  "tar",
  "tarp",
  "ten",
  "went",
  "wet",
  "arty",
  "egg",
  "not",
  "quar",
];
console.log(exports.findAllSolutions(grid, dictionary));
