/*
|----------------------------------------------
| setting up navigation directive for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nbaslp, 2017
|----------------------------------------------
*/

'use strict';

(function () {
    angular
        .module('nbaslp')
        .directive('siteNav', siteNav);

    function siteNav() {
        return {
            restrict: 'EA',
            templateUrl: 'common/directives/nav/site-nav.template.html',
            controller: 'navCtrl as nvm',
        };
    }
})();
