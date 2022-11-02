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

  // checks if the grid or dictionary is empty
  if (grid == null || dictionary == null) return solutions;

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


// Uncomment to see the output for different input
/*
var grid_2 = [
  ["T", "W", "Y", "R"],
  ["E", "N", "P", "H"],
  ["G", "Z", "Qu", "R"],
  ["O", "N", "T", "A"],
];

var dictionary_1 = [
  "teg",
  "onta",
  "tnQuA",
  "quR"
];

var dictionary_2 = [
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

var dictionary_3 = [
  "",
  "t",
  "q",
  "u",
  "qu",
  "te",
  "tezqu",
  "qutar",
  "ontarhr"
];

var dictionary_4 = [
  "twyre",
  "ontat",
  "ezta"
];

//Test 1
console.log("grid = ", grid_2, "\n");
console.log(" dictionary = ", dictionary_1, "\n");
console.log("Output = ");
console.log(exports.findAllSolutions(grid_2, dictionary_1));
console.log("\n")

//Test 2
console.log("grid = ", grid_2, "\n");
console.log(" dictionary = ", dictionary_2, "\n");
console.log("Output = ");
console.log(exports.findAllSolutions(grid_2, dictionary_2));
console.log("\n")

//Test 3
console.log("grid = ", grid_2, "\n");
console.log(" dictionary = ", dictionary_3, "\n");
console.log("Output = ");
console.log(exports.findAllSolutions(grid_2, dictionary_3));
console.log("\n")

//Test 4
console.log("grid = ", grid_2, "\n");
console.log(" dictionary = ", dictionary_4, "\n");
console.log("Output = ");
console.log(exports.findAllSolutions(grid_2, dictionary_4));
console.log("\n");


var grid_1 = [
  ["T", "W", "Y"],
  ["E", "N", "P", "H"],
  ["O", "G", "T"],
];

var dictionary_a = [
  "",
  "te",
  "teo",
  "pht"
];

// test 5
console.log("grid = ", grid_2, "\n");
console.log(" dictionary = ", dictionary_a, "\n");
console.log("Output = ");
console.log(exports.findAllSolutions(grid_2, dictionary_a));
console.log("\n");

var grid_3 = [
  ["T", "W", "X"],
  ["E", "N", "Z"],
  ["O", "G", "R"],
];

var dictionary_a1 = [
  "",
  "tn",
  "tng",
  "tnw",
  "tng",
  "ogentw",
  "teognw",
  "teowng",
  "teo"
];

// test 6
console.log("grid = ", grid_3, "\n");
console.log(" dictionary = ", dictionary_a1, "\n");
console.log("Output = ");
console.log(exports.findAllSolutions(grid_3, dictionary_a1));
console.log("\n");

var grid_3 = [
  ["T", "W"],
  ["E", "N"],
  ["O", "G"],
];

var dictionary_a2 = [
  "teo",
  "zero",
  "teognw",
  "wng"
];

// test 7
console.log("grid = ", grid_3, "\n");
console.log(" dictionary = ", dictionary_a2, "\n");
console.log("Output = ");
console.log(exports.findAllSolutions(grid_3, dictionary_a2));
console.log("\n");


var grid_4 = [
  ["Tu", "KLM", "ZER"],
  ["UT", "GHI", "PER"],
  ["ABC", "DEF", "PREM"],
];

var dictionary_b1 = [
  "",
  "tu",
  "KLM",
  "teognw",
  "wng",
  "TuKLM",
  "TUUTABCGHI",
  "KLMGHIPER"
];

var dictionary_b2 = [
  "PREM",
  "PREMPER",
  "ABCDEFPER",
  "PREMPERGHI",
  "ABCtuUT"
];

// test 8
console.log("grid = ", grid_4, "\n");
console.log(" dictionary = ", dictionary_b1, "\n");
console.log("Output = ");
console.log(exports.findAllSolutions(grid_4, dictionary_b1));
console.log("\n");

// test 9
console.log("grid = ", grid_4, "\n");
console.log(" dictionary = ", dictionary_b2, "\n");
console.log("Output = ");
console.log(exports.findAllSolutions(grid_4, dictionary_b2));

var grid_5 = [
  ["P", "KM", "ZE", "A", "F"],
  ["Re", "GI", "Pg", "B", "G"],
  ["Mr", "DE", "PM", "C", "t"],
  ["Ms", "E", "Z", "R", "u"],
  ["Mz", "Do", "PM", "v", "y"],
];

var dictionary_c1 = [
  "PreMrMs",
  "MrMsMZ",
  "doer",
  "PmPAnk",
  "ABCtuUT",
  "PKMz",
  "MZDOPMVYMS"
];

var dictionary_c1 = [
  "ezru",
  "pmv",
  "mzmsm",
  "dpmct",
  "fazekm",
  "vyyv",
  "fgtuy",
  "depmctur"
];
// test 10
console.log("grid = ", grid_5, "\n");
console.log(" dictionary = ", dictionary_c1, "\n");
console.log("Output = ");
console.log(exports.findAllSolutions(grid_5, dictionary_c1));
console.log("\n");
*/
