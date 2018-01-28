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

        if (authentication.isLoggedIn()) {
            
            if (authentication.currentUser().accountType === 'admin') {
                $location.path('/usercontroll');
            }
            else {
                
            }
        }
        else {
            $location.path('/signin');
        }
    }

})();
