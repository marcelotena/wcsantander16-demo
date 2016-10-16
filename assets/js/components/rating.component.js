var rating = {
    bindings: {
        title: '<'
    },
    controller: function (OmdbService) {

        var ctrl = this;
        ctrl.stars = '';

        OmdbService
            .getRating(ctrl.title)
            .then(function(response) {
                ctrl.stars = response;
                ctrl.rating = {
                    value: response,
                    stars: round(response/10*5, 0.5)
                }
            });

        function round(value, step) {
            step || (step = 1.0);
            var inv = 1.0 / step;
            return Math.round(value * inv) / inv;
        }

    },
    templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/components/rating.component.html'
};

angular
    .module('app')
    .component('rating', rating);