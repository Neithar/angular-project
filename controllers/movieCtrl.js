/**
 * Controller for Movies
 */
;(function () {
    'use strict';
    angular
        .module('boilerplate')
        .controller('MovieCtrl', MovieCtrl);

    MovieCtrl.$inject = ['LocalStorage', 'modalService', '$rootScope', '$scope'];

    /**
     * Movie controller
     * @param LocalStorage
     * @param modalService
     * @param $rootScope
     * @param $scope
     * @constructor
     */
    function MovieCtrl(LocalStorage, modalService, $rootScope, $scope) {

        // 'controller as' syntax
        var self = this;

        self.movies = LocalStorage.get('movie');
        self.genres = LocalStorage.get('genre');

        /**
         * Display modal to add Movie
         */
        self.addMovie = function () {

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'views/components/modal/modal_create_movie.html'
            };

            var modalOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'Create',
                headerText: 'Add Movie',
                bodyText: ''
            };

            modalService.showModal(modalDefaults, modalOptions);

        }
        /**
         * Creates new movie and save in LocalStorage
         * @param genreName
         */
        self.createMovie = function (movie, modalOptions) {
            LocalStorage.addNewMovie(movie);
            self.sortMovies('name');
            self.movies = LocalStorage.get('movie');
            self.genres = LocalStorage.get('genre');
            modalOptions.close();
        }
        /**
         * Removes movie from LocalStorage
         * @param genreName
         */
        self.dropMovie = function (movieName) {
            LocalStorage.removeMovie(movieName);
            self.movies = LocalStorage.get('movie');
            self.genres = LocalStorage.get('genre');
        }

        /**
         * Sort JSON Movies array by 'keyname'
         * @param keyname
         */
        self.sortMovies = function (keyname) {
            self.sortKeyMovie = keyname;   //set the sortKey to the param passed
            self.reverseMovie = !self.reverseMovie; //if true make it false and vice versa
        }

    }

})();