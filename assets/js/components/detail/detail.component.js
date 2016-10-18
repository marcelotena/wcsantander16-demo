var detail = {
    bindings: {
        item: '<'
    },
    templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/components/detail/detail.component.html',
    controller: function() {

    }
};

angular
    .module('home')
    .component('detail', detail)
    .config(function ($stateProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home.detail', {
                url: '^/serie/:slug',
                component: 'detail',
                params: {
                    slug: null
                },
                resolve: {
                    item: function(SeriesService, $transition$) {
                        var id = $transition$.params().id;
                        if (!id) return;
                        return SeriesService.getSerie(id);
                    }
                }
            });
    });