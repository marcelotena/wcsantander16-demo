var thumbnail = {
    bindings: {
        title: '<',
        id: '<'
    },
    controller: function (OmdbService, MediaService) {

        var ctrl = this;
        ctrl.image = '';

        if (ctrl.id) {

            if(MediaService) {
                MediaService
                    .getMediaItem(ctrl.id)
                    .then(function(response) {
                        ctrl.image = response['sizes']['thumbnail'];
                    });
            }


        } else {

            OmdbService
                .getImage(ctrl.title)
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