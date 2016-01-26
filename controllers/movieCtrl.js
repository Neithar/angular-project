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
        self.msg = {
            type: '',
            text: ''
        };

        $rootScope.movies = self.movies;
        $rootScope.list = self.genres;
        $rootScope.msg = self.msg;

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
            self.message = {
                type: 'success',
                text: 'Created Movie successfully'
            };

            $rootScope.movies = self.movies;
            $rootScope.list = self.genres;
            $rootScope.msg = self.message;
            modalOptions.close();
            this.sortMovies('name');
        }
        /**
         * Removes movie from LocalStorage
         * @param genreName
         */
        self.dropMovie = function (movieName) {
            LocalStorage.removeMovie(movieName);
            self.movies = LocalStorage.get('movie');
            self.genres = LocalStorage.get('genre');
            self.message = {
                type: 'success',
                text: 'Dropped Movie successfully'
            };

            $rootScope.movies = self.movies;
            $rootScope.msg = self.message;
            $rootScope.list = self.genres;
            this.sortMovies('name');
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