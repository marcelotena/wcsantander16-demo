function OmdbService($http) {

    var API = 'https://www.omdbapi.com/?t=';

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