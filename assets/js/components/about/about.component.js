var about = {
    bindings: {
        page: '<'
    },
    templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/components/about/about.component.html',
    controller: function() {

    }
};

angular
    .module('app')
    .component('about', about)
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('about', {
                url: '/about',
                component: 'about',
                resolve: {
                    list: function(PagesService) {
                        return PagesService.getPage('about');
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    });