var about = {
    bindings: {
        pageContent: '<'
    },
    templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/components/about/about.component.html',
    controller: function() {

    }
};

angular
    .module('about')
    .component('about', about)
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('about', {
                url: '/sobre-esta-web/',
                component: 'about',
                resolve: {
                    pageContent: function(PagesService) {
                        return PagesService.getPage('sobre-esta-web');
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    });