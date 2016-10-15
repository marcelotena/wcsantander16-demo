function HomeController (SeriesService) {
    var ctrl = this;
    ctrl.list = [];

    function loadSeries() {
        SeriesService
            .getSeries()
            .then(function (response) {
                ctrl.list = processData(response);
            });
    }

    function processData(data) {
        return data.map(function (item) {

            var itemImage = 0;

            var processedItem = {
                id              : item.id,
                date            : item.date,
                link            : item.link,
                title           : item.title.rendered,
                spanishTitle    : item.acf['titulo_traducido'],
                slug            : item.slug,
                content         : item.content.rendered,
                image           : itemImage
            };

            return processedItem;
        });
    }

    loadSeries();
}

angular
    .module('app')
    .controller('HomeController', HomeController);