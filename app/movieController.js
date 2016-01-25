/**
 * Controller for Movies
 */
;(function () {
    'use strict';
    angular
        .module('boilerplate')
        .controller('MovieController', MovieController);

    MovieController.$inject = ['LocalStorage', 'modalService', '$rootScope', '$scope'];

    /**
     * Movie controller
     * @param LocalStorage
     * @param QueryService
     * @param modalService
     * @param $rootScope
     * @param $scope
     * @constructor
     */
    function MovieController(LocalStorage, modalService, $rootScope, $scope) {

        // 'controller as' syntax
        var self = this;

        $rootScope.movies = LocalStorage.get('movie');

        /**
         * Display modal to add Movie
         */
        $scope.addMovie = function () {

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
        $rootScope.createMovie = function (movie, modalOptions) {
            LocalStorage.addNewMovie(movie);
            $scope.movies = '';
            $scope.movies = LocalStorage.get('movie');
            $rootScope.genres = '';
            $rootScope.genres = LocalStorage.get('genre');
            modalOptions.close();
        }
        /**
         * Removes movie from LocalStorage
         * @param genreName
         */
        $rootScope.dropMovie = function (movieName) {
            LocalStorage.removeMovie(movieName);
            $scope.movies = '';
            $scope.movies = LocalStorage.get('movie');
            $rootScope.genres = '';
            $rootScope.genres = LocalStorage.get('genre');
        }

        /**
         * Sort JSON Movies array by 'keyname'
         * @param keyname
         */
        $rootScope.sortMovies = function (keyname) {
            $scope.sortKeyMovie = keyname;   //set the sortKey to the param passed
            $scope.reverseMovie = !$scope.reverseMovie; //if true make it false and vice versa
        }

    }

})();