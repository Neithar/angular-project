/**
 * Controller for Genre
 */
;(function () {
    'use strict';
    angular
        .module('boilerplate')
        .controller('GenreController', GenreController);

    GenreController.$inject = ['LocalStorage', 'modalService', '$rootScope', '$scope'];

    /**
     * Genre controller
     * @param LocalStorage
     * @param QueryService
     * @param modalService
     * @param $rootScope
     * @param $scope
     * @constructor
     */
    function GenreController(LocalStorage, modalService, $rootScope, $scope) {

        // 'controller as' syntax
        var self = this;

        $rootScope.genres = LocalStorage.get('genre');

        /**
         * Modal for new genre creation
         */
        $scope.addGenre = function () {

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'views/components/modal/modal_create_genre.html'
            };

            var modalOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'Create',
                headerText: 'Create Genre',
                bodyText: ''
            };

            modalService.showModal(modalDefaults, modalOptions);

        }
        /**
         * Creates new genre and save in LocalStorage
         * @pa"ram genreName
         */
        $rootScope.createGenre = function (genreName, modalOptions) {
            LocalStorage.addNewGenre(genreName);
            $rootScope.genres = '';
            $rootScope.genres = LocalStorage.get('genre');
            modalOptions.close();
        }
        /**
         * Removes new genre
         * @param genreName
         */
        $rootScope.dropGnre = function (genreName) {
            LocalStorage.removeGenre(genreName);
            $rootScope.genres = '';
            $rootScope.genres = LocalStorage.get('genre');
        }

        /**
         * Sort JSON Generes array by 'keyname'
         * @param keyname
         */
        $rootScope.sortGenres = function (keyname) {
            $scope.sortKeyGen = keyname;   //set the sortKey to the param passed
            $scope.reverseGen = !$scope.reverseGen; //if true make it false and vice versa
        }
    }

})();