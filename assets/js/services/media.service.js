function MediaService($http) {

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
    .module('app')
    .factory('MediaService', MediaService);