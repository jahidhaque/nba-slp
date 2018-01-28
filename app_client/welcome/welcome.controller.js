/*
|----------------------------------------------
| setting up controller for welcome page
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nbaslp, 2017
|----------------------------------------------
*/

'use strict';

(function () {
    
    angular 
        .module('nbaslp')
        .controller('welcomeCtrl', welcomeCtrl);

    welcomeCtrl.$inject = ['authentication', '$location'];

    function welcomeCtrl(authentication, $location) {
        const wvm = this;
    }

})();
