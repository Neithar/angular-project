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
        .controller('IndexController', IndexController);

    IndexController.$inject = ['LocalStorage', 'QueryService', 'modalService', '$rootScope', '$scope'];

    /**
     * Main controller
     * @param LocalStorage
     * @param QueryService
     * @param modalService
     * @param $rootScope
     * @param $scope
     * @constructor
     */
    function IndexController(LocalStorage, QueryService, modalService, $rootScope, $scope) {

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