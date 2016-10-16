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

    function getImageThumbnail(id) {

        return $http
            .get(API + '/' + id)
            .then(function (response) {
                if (response.data['better_featured_image']) {
                    return response.data['better_featured_image']['media_details'].sizes.thumbnail['source_url'];
                } else {
                    return 'error';
                }
            }, function(error) {
                // No featured image uploaded to item.
            });

    }

    return {
        getSeries: getSeries,
        getImageThumbnail: getImageThumbnail
    }
}


angular
    .module('app')
    .factory('SeriesService', SeriesService);