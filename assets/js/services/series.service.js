function SeriesService($http) {

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