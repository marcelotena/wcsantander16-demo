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
    templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/components/home/home.component.html',
    controller: function(SeriesService) {
        var ctrl = this;
        var currentPage = 2;
        var pageLimit = 5;
        ctrl.busy = false;

        ctrl.loadMorePages = function () {

            if (currentPage <= pageLimit) {
                ctrl.busy = true;

                SeriesService
                    .getSeries(currentPage)
                    .then(function(response) {
                        currentPage++;
                        pageLimit = response[0].totalPages;
                        ctrl.list = ctrl.list.concat(response);
                        ctrl.busy = false;
                    });

            }

        };
    }
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
var rating = {
    bindings: {
        omdbQuery: '<'
    },
    controller: function (OmdbService) {

        var ctrl = this;
        ctrl.stars = '';

        OmdbService
            .getRating(ctrl.omdbQuery)
            .then(function(response) {
                ctrl.stars = response;
                ctrl.rating = {
                    value: response,
                    stars: round(response/10*5, 0.5)
                }
            });

        function round(value, step) {
            step || (step = 1.0);
            var inv = 1.0 / step;
            return Math.round(value * inv) / inv;
        }

    },
    templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/components/rating.component.html'
};

angular
    .module('app')
    .component('rating', rating);

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
                var totalPages = response.headers('X-WP-TotalPages');
                return processSeriesList(response.data, totalPages);
            });

    }

    function processSeriesList(data, totalPages) {

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
                image           : item['featured_media'],
                totalPages      : totalPages
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

    function getYear(query) {

        var cleanedQuery = query.split(' ').join('+');

        return $http
            .get(API + cleanedQuery)
            .then(function (response) {
                return response.data['Year'];
            });

    }

    function getActors(query) {

        var cleanedQuery = query.split(' ').join('+');

        return $http
            .get(API + cleanedQuery)
            .then(function (response) {
                return response.data['Actors'];
            });

    }

    function getRating(query) {

        var cleanedQuery = query.split(' ').join('+');

        return $http
            .get(API + cleanedQuery)
            .then(function (response) {
                return response.data['imdbRating'];
            });

    }

    return {
        getImage    : getImage,
        getYear     : getYear,
        getActors   : getActors,
        getRating   : getRating
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
                    thumbnail   : item['media_details'].sizes['thumbnail']['source_url'],
                    medium      : item['media_details'].sizes['medium']['source_url'],
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
    .module('home')
    .factory('MediaService', MediaService);