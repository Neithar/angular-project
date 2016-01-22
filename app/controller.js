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
     * @param $rootScope
     * @param $scope
     * @constructor
     */
    function MainController(LocalStorage, QueryService, modalService, $rootScope, $scope) {

        // 'controller as' syntax
        var self = this;

        $rootScope.genres = LocalStorage.get('genre');
        $scope.movies = LocalStorage.get('movie');

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

            modalService.showModal(modalDefaults, modalOptions);

        }
        /**
         * Creates new genre
         * @pa"ram genreName
         */
        $rootScope.createGenre = function (genreName) {
            LocalStorage.addNewGenre(genreName);
            $rootScope.genres = '';
            $rootScope.genres = LocalStorage.get('genre');
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


        $scope.addMovie = function () {

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'views/modal/modal_create_movie.html'
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
         * Creates new movie
         * @param genreName
         */
        $rootScope.createMovie = function (movie) {
            LocalStorage.addNewMovie(movie);
            $scope.movies = '';
            $scope.movies = LocalStorage.get('movie');
            $rootScope.genres = '';
            $rootScope.genres = LocalStorage.get('genre');
        }
        /**
         * Removes movie
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

        $scope.ngModelOptionsSelected = function(value) {
            var _selected;

            if (arguments.length) {
                _selected = value;
            } else {
                return _selected;
            }
        };

    }


})();