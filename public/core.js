let app = angular.module('tilesGame', ['ngMaterial']);

app.controller("mainCtrl", function($scope) {
  $scope.clickTile = clickTile;
  $scope.placeTile = placeTile;
  $scope.init = init;
  $scope.done = done;
  init();

  /**
   * resets tiles to beginning state
   */
  function init() {
    $scope.finished = false;
    $scope.score = 0;
    $scope.selectedLetter = "";
    $scope.randomTileLetters = [];
    $scope.scoringArray = [];
    for (let i = 0; i < 5; i++) {
      let letter = generateRandomLetter();
      $scope.randomTileLetters.push(letter);
      $scope.scoringArray.push("");
    }
  }

  /**
   * generates a random letter
   */
  function generateRandomLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  /**
   * sets letter and letter's index on click
   *
   * @param {string} letter - the selected letter
   * @param {int} index - the letter's index
   */
  function clickTile(letter, index) {
    $scope.selectedLetter = letter;
    $scope.selectedLetterIndex = index;
  }

  /**
   * moves a tile into the scoring area on click
   *
   * @param {int} index - the selected index in scoringArray
   */
  function placeTile(index) {
    if (!$scope.selectedLetter) {
      returnTile(index);
      return;
    }

    let validPlacement = false;
    $scope.scoringArray = $scope.scoringArray.map((x, i) => {
      if (i == index && !x) {
        validPlacement = true;
        return $scope.selectedLetter;
      }
      return x;
    });

    $scope.selectedLetter = "";

    if (validPlacement) {
      $scope.randomTileLetters.splice($scope.selectedLetterIndex, 1, "");
      checkIfDone($scope.scoringArray);
    }
  }

  /**
   * returns a tile in the scoring area to the first empty space in the playing rack on click
   *
   * @param {int} index - the selected index in scoringArray
   */
  function returnTile(index) {
    let replaced = false;
    $scope.randomTileLetters = $scope.randomTileLetters.map((x) => {
      if (!x && !replaced) {
        replaced = true;
        return $scope.scoringArray[index];
      }
      return x;
    });
    $scope.scoringArray.splice(index, 1, "");
  }

  /**
   * checks if passed array is alphabetized
   *
   * @param {Array} completedArray - array in scoring area to be scored
   */
  function checkIfDone(completedArray) {
    $scope.unsortedArray = completedArray.filter(x => x);
    let sortedArray = $scope.unsortedArray.slice(0).sort();
    if (JSON.stringify($scope.unsortedArray) == JSON.stringify(sortedArray) && $scope.unsortedArray.length == 5) {
      $scope.finished = true;
    }
  }

  /**
   * scores the alphabetized array
   */
  function done() {
    let score = 0;
    $scope.unsortedArray.forEach(function(elem) {
      if (elem == 'x') {
        score += 3;
      } else if (["q", "z"].indexOf(elem) !== -1) {
        score += 10;
      } else {
        score ++;
      }
    });
    $scope.score = score;
  }
});
