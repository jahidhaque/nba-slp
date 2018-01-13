/*
|----------------------------------------------
| setting up controller for navigation
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nbaslp, 2017
|----------------------------------------------
*/

'use strict';

(function () {
    angular
        .module('nbaslp')
        .controller('navCtrl', navCtrl);

    navCtrl.$inject = ['authentication', '$location'];

    function navCtrl(authentication, $location) {
        const nvm = this;

        if (authentication.isLoggedIn()) {
            nvm.loggedInUri = true;
            nvm.loggedInName = authentication.currentUser().name;
            nvm.currentAccountType = authentication.currentUser().accountType;
        }
        else {
            nvm.loggedInUri = false;
        }

        nvm.logout = () => {
            authentication.Logout();
            $location.path('/signin');
        };
    }
})();
