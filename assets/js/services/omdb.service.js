function OmdbService($http) {

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