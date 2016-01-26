/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 *
 */
;(function () {
    'use strict';
    angular
        .module('boilerplate')
        .controller('IndexCtrl', IndexCtrl);

    IndexCtrl.$inject = ['LocalStorage', 'modalService', '$rootScope', '$scope'];

    /**
     * Main controller
     * @param LocalStorage
     * @param modalService
     * @param $rootScope
     * @param $scope
     * @constructor
     */
    function IndexCtrl(LocalStorage, modalService, $rootScope, $scope) {

        // 'controller as' syntax
        var self = this;

        self.ngModelOptionsSelected = function (value) {
            var _selected;

            if (arguments.length) {
                _selected = value;
            } else {
                return _selected;
            }
        };

    }

})();