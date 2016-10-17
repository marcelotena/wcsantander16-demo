var thumbnail = {
    bindings: {
        omdbQuery: '<',
        featuredImageId: '<'
    },
    controller: function (OmdbService, MediaService) {

        var ctrl = this;
        ctrl.image = '';

        if (ctrl.featuredImageId) {

            if(MediaService) {
                MediaService
                    .getMediaItem(ctrl.featuredImageId)
                    .then(function(response) {
                        ctrl.image = response['sizes']['thumbnail'];
                    });
            }


        } else {

            OmdbService
                .getImage(ctrl.omdbQuery)
                .then(function(response) {
                    ctrl.image = response;
                });

        }


    },
    templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/components/thumbnail.component.html'
};


angular
    .module('app')
    .component('thumbnail', thumbnail);