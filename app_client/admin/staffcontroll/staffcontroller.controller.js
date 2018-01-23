/*
|----------------------------------------------
| setting up staff controller for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

'use strict';

(function () {

    angular
        .module('nbaslp')
        .controller('staffCtrl', staffCtrl);

    staffCtrl.$inject = ['authentication', '$location'];

    function staffCtrl(authentication, $location) {    	
        const svm = this;
       
        if (authentication.isLoggedIn()) {
            
            if (authentication.currentUser().accountType === 'admin') {

            }
            else {
                $location.path('/welcome');
            }
        }
        else {
            $location.path('/signin');
        }
    }

})();