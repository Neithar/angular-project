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

        $scope.genres = LocalStorage.get('genre');
        if($scope.genres !== null || $scope.genres !== undefined){
        }
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
        /**
         * Creates new genre
         * @param genreName
         */
        $rootScope.createGenre = function (genreName){
            LocalStorage.addNewGenre(genreName);
            $scope.genres = '';
            $scope.genres = LocalStorage.get('genre');
        }
        /**
         * Removes new genre
         * @param genreName
         */
        $rootScope.dropGnre = function (genreName) {
            LocalStorage.removeGenre(genreName);
            $scope.genres = '';
            $scope.genres = LocalStorage.get('genre');
        }
        /**
         * Load some data
         * @return {Object} Returned object
         */
        // QueryService.query('GET', 'posts', {}, {})
        //   .then(function(ovocie) {
        //     self.ovocie = ovocie.data;
        //   });

        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }
    }


})();