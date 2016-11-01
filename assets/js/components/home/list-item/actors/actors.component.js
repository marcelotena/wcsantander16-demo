var actors = {
    bindings: {
        omdbQuery: '<'
    },
    controller: function (OmdbService) {

        var ctrl = this;
        ctrl.actors = '';

        OmdbService
            .getActors(ctrl.omdbQuery)
            .then(function(response) {
                ctrl.actors = response;
            });

    },
    templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/components/home/list-item/actors/actors.component.html'
};

angular
    .module('home')
    .component('actors', actors);