var home = {
    bindings: {
        list: '<'
    },
    templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/components/home/home.component.html'
};

angular
    .module('home')
    .component('home', home)
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/',
                component: 'home',
                resolve: {
                    list: function(SeriesService) {
                        return SeriesService.getSeries();
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    });