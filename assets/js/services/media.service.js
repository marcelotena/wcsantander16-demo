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

            if (item['media_details'].sizes) {
                var mediaBase = item['media_details'].sizes;

                if (mediaBase.thumbnail) {
                    var thumbnailImage = mediaBase.thumbnail['source_url'];
                }

                if (mediaBase.medium) {
                    var mediumImage = mediaBase.medium['source_url'];
                }

                if (mediaBase['medium_large']) {
                    var mediumLargeImage = mediaBase['medium_large']['source_url'];
                }

                if (mediaBase.large) {
                    var largeImage = mediaBase.large['source_url'];
                }
            }

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
                    thumbnail   : thumbnailImage,
                    medium      : mediumImage,
                    mediumLarge : mediumLargeImage,
                    large       : largeImage
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