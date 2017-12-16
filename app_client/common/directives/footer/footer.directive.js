/*
|----------------------------------------------
| setting up footer directive for application
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nbaslp, 2017
|----------------------------------------------
*/

'use strict';

(function () {
    angular
        .module('nbaslp')
        .directive('siteFooter', siteFooter);
    function siteFooter() {
        return {
            restrict: 'EA',
            templateUrl: 'common/directives/footer/footer.template.html',
        };
    }
})();
