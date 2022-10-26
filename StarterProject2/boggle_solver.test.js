const boggle_solver = require('/home/codio/workspace/Boggle_Testing/boggle_solver.js');

/** Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}


describe('Boggle Solver tests suite:', () => {
  describe('Normal input', () => {
    test('Normal case 4x4', () =>{
      var grid = [["T", "W", "Y", "R"],
                    ["E", "N", "P", "H"],
                    ["G", "Z", "Qu", "R"],
                    ["O", "N", "T", "A"]];
    
      var dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat", "pry", "qua", "quart", "quartz", "rat", "tar", "tarp", "ten", "went", "wet", "arty", "egg", "not", "quar"];
      
      var expected =[ 'ten', 'wet', 'went', 'ego', 'net', 'new', 'newt', 'pry', 'prat', 'get', 'gent', 'qua', 'quar', 'quart', 'quartz', 'rat', 'tar', 'tarp', 'art' ]
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Normal case 5x5', () =>{
      var grid = [["T", "W", "Y", "R", "P"],
                    ["E", "N", "P", "H", "O"],
                    ["G", "Z", "Qu", "R", "L"],
                    ["O", "N", "Tx", "A", "X"],
                    ["P", "R", "O", "W", "R"]];
    
      var dictionary = ["tew", "qutx", "qurl", "pro"];
      
      var expected = ["tew", "qutx", "qurl", "pro"];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });



  describe('Problem contraints', () => {
    // Cases - Qu
    test('Qu is counted as two letters', () => {
      let grid = [['a', 'b', 'c',  'd'],
                  ['e', 'f', 'g',  'h'],
                  ['r', 'v', 'qu', 'i'],
                  ['t', 'a', 'n',  'p']];
      let dictionary = ['tan', 'van', 'qu', 'aert', 'tvgd', 'aed', 'hip', 'qui']      
      let expected = ['tan', 'van', 'aert', 'tvgd', 'hip', 'qui'];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    // Cases - qur
    test('if grid has element of length 3', () => {
      let grid = [['a', 'b', 'c',  'd'],
                  ['e', 'f', 'g',  'h'],
                  ['r', 'v', 'qur', 'i'],
                  ['t', 'a', 'n',  'Tu']];
      let dictionary = ['qur']      
      let expected = ['qur'];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Element with length greater than 2 is also a single element', () => {
      let grid = [['a', 'b', 'c',  'd'],
                  ['e', 'f', 'g',  'h'],
                  ['r', 'v', 'qu', 'i'],
                  ['t', 'a', 'ru',  'Tu']];
      let dictionary = ['qut', 'rut', 'rutu']      
      let expected = ['rutu'];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    // string length >= 3
    test('length of string should be 3 or greater', () => {
      let grid = [['a', 'b'],
                  ['c', 'd']];
      let dictionary = ['a', 'b','ab', 'cd', 'abcd', 'adb'];
      
      let expected = ['abcd', 'adb'];
  
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Grid should be NxN', () => {
      // should return []
      let grid = [['a', 'b', 'c']]
      let dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];
      let expected = [];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });

  
  describe('Input edge cases', () => {

    // return []
    test('Dictionary is empty', () => {
      let grid = [['A', 'B', 'C', 'D'],
                    ['E', 'F', 'G', 'H'],
                    ['I', 'J', 'K', 'L'],
                    ['M', 'N', 'O', 'P']];
      let dictionary = [];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Grid is Empty', () => {
      // return []
      let grid = []
      let dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'qfuart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];
      let expected = [];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Grid is 1x1', () => {
      // should return []
      let grid = [['a']]
      let dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];
      let expected = [];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Grid is 2x2', () => {
      // should return []
      let grid = [['a', 'b'],
                    ['c', 'd']];
      let dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];
      let expected = [];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Check if grid is 3x3', () => {
      // should return []
      let grid = [['a', 'p', 'p'],
                    ['l', 'l', 'e'],
                    [ 'b', 'o', 'x']];
      let dictionary = ['app', 'box', 'lel'];
      let expected = ['app', 'box'];
      
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });
});
