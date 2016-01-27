/**
 * Controller for Genre
 */
;(function () {
    'use strict';
    angular
        .module('boilerplate')
        .controller('GenreCtrl', GenreCtrl);

    GenreCtrl.$inject = ['LocalStorage', 'modalService', '$rootScope'];

    /**
     * Genre controller
     * @param LocalStorage
     * @param modalService
     * @param $rootScope
     * @constructor
     */
    function GenreCtrl(LocalStorage, modalService, $rootScope) {

        // 'controller as' syntax
        var self = this;
        self.message = {
            type: '',
            text: ''
        };
        self.list = LocalStorage.get('genre');

        $rootScope.list = self.list;
        $rootScope.message = self.message;
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
            self.message =  self.message = {
                type: 'success',
                text: 'Genre created successfully!'
            };

            modalOptions.close();
            $rootScope.message = self.message;
            $rootScope.list = self.list;


        }
        /**
         * Removes new genre
         * @param genreName
         */
        self.dropGnre = function (genreName) {
            LocalStorage.removeGenre(genreName);
            self.list = LocalStorage.get('genre');
            self.message =  self.message = {
                type: 'success',
                text: 'Genre dropped successfully!'
            };
            $rootScope.message = self.message;
            $rootScope.list = self.list;
            this.sortGenres('name');
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