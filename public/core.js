var app = angular.module('tilesGame', ['ngMaterial']);

app.controller("mainCtrl", function($scope) {
  $scope.clickTile = clickTile;
  $scope.placeTile = placeTile;
  $scope.init = init;
  $scope.done = done;

  function init() {
    $scope.finished = false;
    $scope.score = 0;
    $scope.randomTileLetters = [];
    $scope.selectedLetter = "";
    $scope.scoringArray = ["","","","",""];
    for (var i = 0; i < 5; i++) {
      var letter = generateRandomLetter();
      $scope.randomTileLetters.push(letter);
    }
  }

  init();

  function generateRandomLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function clickTile(letter, index) {
    $scope.selectedLetter = letter;
    $scope.selectedLetterIndex = index;
  }

  function placeTile(index) {
    if (!$scope.selectedLetter) {

      var replaced = false;
      $scope.randomTileLetters = $scope.randomTileLetters.map((x, i) => {
        if (!x && !replaced) {
          replaced = true;
          return $scope.scoringArray[index];
        }
        return x;
      });
      $scope.scoringArray.splice(index, 1, "");
      return;
    }

    var validPlacement = false;
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

  function checkIfDone(array) {
    $scope.unsortedArray = array.filter(x => x);
    var sortedArray = $scope.unsortedArray.slice(0).sort();
    if (JSON.stringify($scope.unsortedArray) == JSON.stringify(sortedArray) && $scope.unsortedArray.length == 5) {
      $scope.finished = true;
    }
  }

  function done() {
    var score = 0;
    $scope.unsortedArray.forEach(function(elem) {
      if (elem == 'x') {
        score += 3;
      } else if (["q", "z"].indexOf(elem) !== -1) {
        score += 10;
      } else {
        score ++;
      }
    })
    $scope.score = score;
  }
});
