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

    signupCtrl.$inject = ['authentication'];

    function signupCtrl() {
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
            
        };
    }
})();
