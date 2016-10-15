function MainController (SeriesService) {
    var ctrl = this;
    this.list = [];

    function loadSeries() {
        SeriesService
            .getSeries()
            .then(function (response) {
                ctrl.list = response;
            });
    }

    loadSeries();
}

angular
    .module('app')
    .controller('MainController', MainController);