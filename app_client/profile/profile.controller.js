/*
|----------------------------------------------
| setting up controller for profile page
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

(function () {

    angular
        .module('nbaslp')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['authentication', '$location'];

    function profileCtrl(authentication, $location) {

        const provm = this;

        if (authentication.isLoggedIn()) {
            provm.profileStatus = authentication.currentUser().accountStatus;
        }
        else {
            $location.path('/signin');
        }
    }

})();
