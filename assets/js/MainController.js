function MainController ($scope) {
    $scope.speaker = 'Marcelo Tena';
}

angular
    .module('app')
    .controller('MainController', MainController);