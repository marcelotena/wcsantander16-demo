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
                return response.data;
            });
    }

    return {
        getSeries: getSeries
    }
}


angular
    .module('app')
    .factory('SeriesService', SeriesService);