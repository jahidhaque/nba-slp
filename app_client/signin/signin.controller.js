/*
|----------------------------------------------
| setting up controller for login page
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nbaslp, 2017
|----------------------------------------------
*/

'use strict';

(function () {
    angular
        .module('nbaslp')
        .controller('signinCtrl', signinCtrl);

    signinCtrl.$inject = ['authentication', '$location'];

    function signinCtrl(authentication, $location) {
        const lvm = this;

        lvm.user = {
            email: '',
            password: '',
        }; 

        if (authentication.isLoggedIn()) {
            $location.path('/welcome');
        }
        else {
            lvm.login = () => {
                if (!lvm.user.email || !lvm.user.password) {
                    lvm.loginError = true;
                    lvm.loginErrorMsg = `Error! all * fields are required`;
                }
                else {
                    lvm.loginError = false;
                    lvm.doLogin();
                }
            };

            lvm.doLogin = () => {
                authentication
                    .signIn(lvm.user)
                    .error((err) => {
                        lvm.loginError = true;
                        lvm.loginErrorMsg = err.error;
                    })
                    .then(() => {
                        $location.path('/welcome');
                    });
            };
        }
    }

})();
