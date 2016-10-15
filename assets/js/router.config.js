angular
    .module('app')
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('inicio', {
                url: '/',
                controller: 'HomeController as series',
                templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/views/home.html'
            });

        $urlRouterProvider.otherwise('/');

    });
