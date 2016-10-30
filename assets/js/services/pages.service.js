function PagesService($http) {

    var API = 'wp-json/wp/v2/pages';


    function getPage(slug) {

        return $http
            .get(API + '?slug=' + slug)
            .then(function (response) {
                return response.data[0];
            });

    }


    return {
        getPage : getPage
    }
}


angular
    .module('app')
    .factory('PagesService', PagesService);