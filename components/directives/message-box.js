;(function() {

    'use strict';

    angular
        .module('boilerplate')
        .directive('messageBox', messageBox);

    function messageBox($timeout) {

        // Definition of directive
        var directiveDefinitionObject = {
            restrict: 'E',
            scope: {
                ngType: '@',
                ngIcon: '@',
                ngTitle: '@'
            },
            templateUrl: 'views/components/message-box/message-box.html',
            replace: true
        };

        return directiveDefinitionObject;
    }

})();