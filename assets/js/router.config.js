angular
    .module('app')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('inicio', {
                url: '/',
                controller: 'HomeController as series',
                templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/views/home.html'
            });

        $urlRouterProvider.otherwise('/');

    });
