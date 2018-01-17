/*
|----------------------------------------------
| setting up sidebar directive for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

'use strict';

(function () {
    angular
        .module('nbaslp')
        .directive('sideBar', sideBar);

    function sideBar() {
        return {
            restrict: 'EA',
            templateUrl: 'common/directives/sidebar/sidebar.template.html',
        };
    }
})();