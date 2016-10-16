angular
    .module('app', [
        'ngSanitize',
        'ui.router',
        'infinite-scroll',
        'home'
    ]);
angular
    .module('home', []);
var home = {
    bindings: {
        list: '<'
    },
    templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/components/home/home.component.html'
};

angular
    .module('home')
    .component('home', home)
    .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/',
                component: 'home',
                resolve: {
                    list: ["SeriesService", function(SeriesService) {
                        return SeriesService.getSeries();
                    }]
                }
            });

        $urlRouterProvider.otherwise('/');
    }]);
var thumbnail = {
    bindings: {
        title: '<',
        id: '<'
    },
    controller: function (OmdbService, MediaService) {

        var ctrl = this;
        ctrl.image = '';

        if (ctrl.id) {

            MediaService
                .getMediaItem(ctrl.id)
                .then(function(response) {
                    ctrl.image = response['sizes']['thumbnail'];
                });

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

thumbnail.$inject = ['OmdbService', 'MediaService'];

angular
    .module('app')
    .component('thumbnail', thumbnail);

SeriesService.$inject = ["$http"];function SeriesService($http) {

    var API = 'wp-json/wp/v2/series';
    var pagedAPI = 'wp-json/wp/v2/series?page=';
    var request = '';

    function getSeries(page) {

        if (page) {
            request = pagedAPI;
        } else {
            request = API;
            page = '';
        }

        return $http
            .get(request + page)
            .then(function (response) {
                return processSeriesList(response.data);
            });

    }

    function processSeriesList(data) {

        return data.map(function (item) {

            var processedItem;

            processedItem = {
                id              : item.id,
                date            : item.date,
                link            : item.link,
                title           : item.title.rendered,
                spanishTitle    : item.acf['titulo_traducido'],
                slug            : item.slug,
                content         : item.content.rendered,
                image           : item['featured_media']
            };

            return processedItem;
        });

    }

    // getImageThumbnail when using the plugin Better REST Featured Images
    function getImageThumbnail(id) {

        return $http
            .get(API + '/' + id)
            .then(function (response) {
                return response.data['better_featured_image']['media_details'].sizes.thumbnail['source_url'];
            });

    }

    return {
        getSeries: getSeries,
        getImageThumbnail: getImageThumbnail
    }
}


angular
    .module('home')
    .factory('SeriesService', SeriesService);

OmdbService.$inject = ["$http"];function OmdbService($http) {

    var API = 'http://www.omdbapi.com/?t=';

    function getImage(query) {

        var cleanedQuery = query.split(' ').join('+');

        return $http
            .get(API + cleanedQuery)
            .then(function (response) {
                return response.data['Poster'];
            });

    }

    return {
        getImage: getImage
    }
}


angular
    .module('app')
    .factory('OmdbService', OmdbService);

MediaService.$inject = ["$http"];function MediaService($http) {

    var API = 'wp-json/wp/v2/media';

    function getMediaItem(id) {

        return $http
            .get(API + '/' + id)
            .then(function (response) {
                return processMediaItem(response.data);
            });

    }

    function processMediaItem(item) {

            var processedItem;

            processedItem = {
                id              : item.id,
                date            : item.date,
                link            : item.link,
                title           : item.title.rendered,
                alt             : item['alt_text'],
                spanishTitle    : item.acf['titulo_traducido'],
                slug            : item.slug,
                type            : item['media_type'],
                sizes           : {
                    thumbnail   : item['media_details'].sizes.thumbnail['source_url'],
                    medium      : item['media_details'].sizes.medium['source_url'],
                    mediumLarge : item['media_details'].sizes['medium_large']['source_url'],
                    large       : item['media_details'].sizes['large']['source_url']
                }
            };

            return processedItem;

    }



    return {
        getMediaItem: getMediaItem
    }
}


angular
    .module('app')
    .factory('MediaService', MediaService);