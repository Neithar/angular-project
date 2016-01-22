;(function () {


    'use strict';


    /**
     * Service for complex localStorage functionality
     *
     * @category  factory
     * @author    Jozef Butko
     * @example   Inject LocalStorage as the dependency and then use it like this:
     *
     * var data = { property: 'name'};
     * // set, get, remove, removeAll and list localStorage values
     * LocalStorage.set('obj', data);
     * LocalStorage.get('obj');
     * LocalStorage.update('obj', data);
     * LocalStorage.remove('obj');
     * LocalStorage.removeAll();
     * LocalStorage.list();
     *
     * @version   1.0
     *
     */
    angular
        .module('boilerplate')
        .factory('LocalStorage', [
            '$window', '$rootScope', LocalStorageService
        ]);


    //////////////// factory


    function LocalStorageService($window, $rootScope) {

        /**
         * Test browser if it supports localStorage
         */
        var storage = (typeof window.localStorage === 'undefined') ? undefined : window.localStorage,
            supported = !(typeof storage === undefined || typeof window.JSON === undefined);

        /*
         * whenever localStorage gets updated trigger
         * $digest cicle so all values are refreshed in the view
         */
        angular.element($window).on('storage', function (event, name) {
            if (event.key === name) {
                $rootScope.$apply();
            }
        });


        return {
            set: set,
            get: get,
            addNewGenre: addNewGenre,
            removeGenre: removeGenre,
            addNewMovie: addNewMovie,
            removeMovie: removeMovie,
            update: update,
            remove: remove,
            removeAll: removeAll,
            list: list
        };


        //////////////// function definitions


        /**
         * Set localStorage value and check if it already do not exists
         *
         * @param {string} name Name of localStorage value
         * @param {object} val  Return stored value
         */
        function set(name, val) {
            if (!supported) {
                console.log('localStorage not supported, make sure you have the $cookies supported.');
            }

            // in case we already have localStorage with same name alert error msg
            if (window.localStorage.getItem(name) !== null) {
                console.warn('localStorage with the name ' + name + ' already exists. Please pick another name.');
            } else {
                return $window.localStorage && $window.localStorage.setItem(name, angular.toJson(val));
            }
        }

        /**
         * Add localStorage value in genres
         *
         * @param {string} name Name of localStorage array value
         * @param {string} val  Return stored value
         */
        function addNewGenre(val) {
            if (!supported) {
                console.log('localStorage not supported, make sure you have the $cookies supported.');
            }

            if (window.localStorage.getItem('genre') === null || window.localStorage.getItem('genre') === undefined) {
                var genre = [];
                genre.push({
                    name: val.name.$viewValue,
                    num: 0
                });
                $rootScope.sortGenres('name');
                return $window.localStorage && $window.localStorage.setItem('genre', JSON.stringify(genre));
            } else {
                var myGenres = JSON.parse($window.localStorage.getItem('genre'));
                myGenres.push({
                    name: val.name.$viewValue,
                    num: 0
                });
                return $window.localStorage && $window.localStorage.setItem('genre', JSON.stringify(myGenres));

            }
        }

        /**
         * Remove localStorage value in Genres
         *
         * @param {string} name Name of localStorage array value
         * @param {string} val  Return stored value
         */
        function removeGenre(val) {
            var arrayGenres = JSON.parse($window.localStorage.getItem('genre'));

            if (!supported) {
                console.log('localStorage not supported, make sure you have the $cookies supported.');
            }
            // return $window.localStorage && $window.localStorage.removeItem(name);
            if (arrayGenres === undefined) {
                console.warn('Not generes in localStorage');
            } else {

                var arrayGenres = arrayGenres.filter(function (jsonObject) {
                    return jsonObject.name != val.name;
                });
                return $window.localStorage && $window.localStorage.setItem('genre', JSON.stringify(arrayGenres));
            }
        }


        /**
         * Add localStorage value in Movies
         *
         * @param {string} name Name of localStorage array value
         * @param {string} val  Return stored value
         */
        function addNewMovie(val) {
            if (!supported) {
                console.log('localStorage not supported, make sure you have the $cookies supported.');
            }

            if (window.localStorage.getItem('movie') === null || window.localStorage.getItem('movie') === undefined) {
                var movie = [];
                movie.push({
                    name: val.name.$viewValue,
                    genre: val.genre.$viewValue
                });
                for (var key in $rootScope.genres) {
                    if(val.genre.$viewValue === $rootScope.genres[key].name){
                        $rootScope.genres[key].num += 1;
                    }
                }
                $rootScope.sortMovies('name');
                var updatedGenres = angular.toJson($rootScope.genres);
                $window.localStorage.setItem('genre', updatedGenres)
                return $window.localStorage && $window.localStorage.setItem('movie', JSON.stringify(movie));
            } else {
                var myMovies = JSON.parse($window.localStorage.getItem('movie'));
                myMovies.push({
                    name: val.name.$viewValue,
                    genre: val.genre.$viewValue
                });
                for (var key in $rootScope.genres) {
                    if(val.genre.$viewValue === $rootScope.genres[key].name){
                        $rootScope.genres[key].num += 1;
                    }
                }
                $rootScope.sortMovies('name');
                var updatedGenres = angular.toJson($rootScope.genres);
                $window.localStorage.setItem('genre', updatedGenres)
                return $window.localStorage && $window.localStorage.setItem('movie', JSON.stringify(myMovies));

            }
        }

        /**
         * Remove localStorage value in Movies
         *
         * @param {string} name Name of localStorage array value
         * @param {string} val  Return stored value
         */
        function removeMovie(val) {
            var arrayMovies = JSON.parse($window.localStorage.getItem('movie'));

            if (!supported) {
                console.log('localStorage not supported, make sure you have the $cookies supported.');
            }
            // return $window.localStorage && $window.localStorage.removeItem(name);
            if (arrayMovies === undefined) {
                console.warn('Not movies in localStorage');
            } else {

                var arrayMovies = arrayMovies.filter(function (jsonObject) {
                    return jsonObject.name != val.name;
                });
                for (var key in $rootScope.genres) {
                    if(val.genre === $rootScope.genres[key].name){
                        $rootScope.genres[key].num -= 1;
                    }
                }
                var updatedGenres = angular.toJson($rootScope.genres);
                $window.localStorage.setItem('genre', updatedGenres);
                return $window.localStorage && $window.localStorage.setItem('movie', JSON.stringify(arrayMovies));
            }
        }


        /**
         * getData from localStorage
         *
         * @param  {string} name Name of localStorage value
         * @return {*}           Stored value
         */
        function get(name) {
            if (!supported) {
                console.log('localStorage not supported, make sure you have the $cookies supported.');
            }

            return $window.localStorage && angular.fromJson($window.localStorage.getItem(name));
        }

        /**
         * Update already stored data
         *
         * @param  {string}  name Name of localStorage value
         * @param {object}   val  Return stored value
         */
        function update(name, val) {
            if (!supported) {
                console.log('localStorage not supported, make sure you have the $cookies supported.');
            }

            return $window.localStorage && $window.localStorage.setItem(name, angular.toJson(val));
        }


        /**
         * Remove localStorage value
         *
         * @param  {string} name Name of localStorage value
         * @return {boolean}     True/false if the value is removed
         */
        function remove(name) {
            if (!supported) {
                console.log('localStorage not supported, make sure you have the $cookies supported.');
            }

            return $window.localStorage && $window.localStorage.removeItem(name);
        }


        /**
         * Remove all localStorage values
         *
         * @return {boolean}     True/false if the value is removed
         */
        function removeAll() {
            if (!supported) {
                console.log('localStorage not supported, make sure you have the $cookies supported.');
            }

            return $window.localStorage && $window.localStorage.clear();
        }


        /**
         * Return object of all values that are stored on localStorage
         *
         * @return {object}    Object with all data stored on localStorage
         */
        function list() {
            return $window.localStorage;
        }

    }


})();
