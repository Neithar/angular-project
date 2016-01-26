/**
 * Controller for Genre
 */
;(function () {
    'use strict';
    angular
        .module('boilerplate')
        .controller('GenreCtrl', GenreCtrl);

    GenreCtrl.$inject = ['LocalStorage', 'modalService', '$rootScope', '$scope'];

    /**
     * Genre controller
     * @param LocalStorage
     * @param modalService
     * @param $rootScope
     * @param $scope
     * @constructor
     */
    function GenreCtrl(LocalStorage, modalService, $rootScope, $scope) {

        // 'controller as' syntax
        var self = this;
        self.message = '';

        self.list = LocalStorage.get('genre');

        /**
         * Modal for new genre creation
         */
        self.addGenre = function () {

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
        self.createGenre = function (genreName, modalOptions) {
            LocalStorage.addNewGenre(genreName);
            self.list = '';
            self.list = LocalStorage.get('genre');
            modalOptions.close();
            self.message = "Created Genre";
        }
        /**
         * Removes new genre
         * @param genreName
         */
        self.dropGnre = function (genreName) {
            LocalStorage.removeGenre(genreName);
            self.list = LocalStorage.get('genre');
            self.message = "Dropped Genre";
        }

        /**
         * Sort JSON Generes array by 'keyname'
         * @param keyname
         */
        self.sortGenres = function (keyname) {
            self.sortKeyGen = keyname;   //set the sortKey to the param passed
            self.reverseGen = !self.reverseGen; //if true make it false and vice versa
        }
    }

})();