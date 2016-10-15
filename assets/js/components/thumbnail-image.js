var thumbnailImage = {
    scope: {},
    bindings: {
        title: '<',
        id: '<'
    },
    controller: function (OmdbService, SeriesService) {
        var ctrl = this;
        ctrl.image = '';

        SeriesService
            .getImageThumbnail(ctrl.id)
            .then(function(response) {
                ctrl.image = response;
            }).then(function () {
                if (ctrl.image == 'error') {
                    OmdbService
                        .getImage(ctrl.title)
                        .then(function(response) {
                            ctrl.image = response['Poster'];
                        });
                }
            });


    },
    templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/components/thumbnail-image.html'
};

thumbnailImage.$inject = ['OmdbService', 'SeriesService'];

angular
    .module('app')
    .component('thumbnailImage', thumbnailImage);