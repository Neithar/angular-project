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
        .controller('MainController', MainController);

    MainController.$inject = ['LocalStorage', 'QueryService', 'modalService', '$rootScope', '$scope'];

    /**
     * Main controller
     * @param LocalStorage
     * @param QueryService
     * @param modalService
     * @param $scope
     * @constructor
     */
    function MainController(LocalStorage, QueryService, modalService, $rootScope, $scope) {

        // 'controller as' syntax
        var self = this;
        $rootScope.form = {};
        ////////////  function definitions

        $scope.addGenre = function () {

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'views/modal/modal_create_genre.html'
            };

            var modalOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'Create',
                headerText: 'Create Genre',
                bodyText: ''
            };

            //Pending -> Call API to accept
            //modalService.showModal({}, modalOptions).then(function (result) {
            //    formApiService.contractCancel($scope.id).then(function () {
            //        $location.path('/mi_cuenta/rechazar_nuevo_contrato/');
            //    }, processError);
            //});

            modalService.showModal(modalDefaults, modalOptions);

        }

        $rootScope.createGenre = function (genreName){
            LocalStorage.addNewGenre(genreName);
            console.log(genreName.name.$viewValue);
        }

        /**
         * Load some data
         * @return {Object} Returned object
         */
        // QueryService.query('GET', 'posts', {}, {})
        //   .then(function(ovocie) {
        //     self.ovocie = ovocie.data;
        //   });
    }


})();