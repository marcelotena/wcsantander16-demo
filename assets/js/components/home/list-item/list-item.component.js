var listItem = {
    bindings: {
        item: '<',
        activeItem: '='
    },
    controller: function () {

        var ctrl = this;

        ctrl.selectItem = function (item) {

            if (!ctrl.activeItem || ctrl.activeItem !== item) {
                ctrl.activeItem = item;
            } else {
                ctrl.activeItem = 0;
            }

        };


    },
    templateUrl: 'wp-content/themes/wp_ng_spa/assets/js/components/home/list-item/list-item.component.html'
};

angular
    .module('home')
    .component('listItem', listItem);