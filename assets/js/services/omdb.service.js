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

    function getRating(query) {

        var cleanedQuery = query.split(' ').join('+');

        return $http
            .get(API + cleanedQuery)
            .then(function (response) {
                return response.data['imdbRating'];
            });

    }

    return {
        getImage: getImage,
        getRating: getRating
    }
}


angular
    .module('app')
    .factory('OmdbService', OmdbService);