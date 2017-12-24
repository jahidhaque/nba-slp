/*
|----------------------------------------------
| setting up signup controller for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nbaslp, 2017
|----------------------------------------------
*/

'use strict';

(function () {
    angular
        .module('nbaslp')
        .controller('signupCtrl', signupCtrl);

    signupCtrl.$inject = ['authentication', '$location'];

    function signupCtrl(authentication, $location) {
        const regvm = this;

        // user object.
        regvm.user = {
            firstName: '',
            lastName: '',
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        regvm.register = () => {
            authentication
                .signUp(regvm.user)
                .then((response) => {
                    if (response.data.error) {
                        regvm.RegistrationError = true;
                        regvm.RegistrationErrorMsg = response.data.error;
                    }
                    else {
                        regvm.RegistrationError = false;
                        $location.path('/welcome');
                    }
                })
                .catch((err) => {
                    if (err) {
                        regvm.RegistrationError = true;
                        regvm.RegistrationErrorMsg = err.data.error;
                    }
                });
        };

        if (authentication.isLoggedIn()) {
            $location.path('/welcome');
        }
    }
})();
