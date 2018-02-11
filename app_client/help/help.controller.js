/*
|----------------------------------------------
| setting up help controller for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

(function () {
    angular
        .module('nbaslp')
        .controller('helpCtrl', helpCtrl);

    helpCtrl.$inject = ['authentication', '$route'];

    function helpCtrl(authentication, $route) {
        const hvm = this;

        hvm.checkUserForm = true;
        hvm.PasswordresetForm = false;
        hvm.verifyAjaxLoader = false;

        // checking the route url
        hvm.checkingRoute = () => {
            if ($route.current.params && $route.current.params.v === 'forgot_password') {
                hvm.PasswordresetForm = false;
                hvm.user = {
                    email: '',
                };
                // checking user.
                hvm.checkUser = () => {
                    authentication
                        .checkUser(hvm.user)
                        .then(response => {
                            if (response.data.error) {
                                hvm.userCheckingError = true;
                                hvm.userCheckingErrorMsg = response.data.error;
                            }
                            else if (response.data.security) {
                                hvm.userCheckingError = true;
                                hvm.userCheckingErrorMsg = `If you have account with us, we have sent you password reset link`;
                            }
                            else {
                                hvm.userCheckingError = false;
                            }
                        })
                        .catch(err => {
                            hvm.userCheckingError = true;
                            hvm.userCheckingErrorMsg = err;
                        });
                };
            }
            else if ($route.current.params && $route.current.params.r) {

                hvm.PasswordresetForm = true;
                hvm.checkUserForm = false;

                hvm.verifyAjaxLoader = true;

                hvm.varifyUserDetails();
            }
        };

        hvm.varifyUserDetails = () => {
            authentication
                .countUser($route.current.params.u)
                .then(response => {
                    if (response.data.error) {
                        hvm.userVerificationUserError = true;
                        hvm.userVerificationUserErrorMsg = response.data.error;
                    }
                    else {
                        hvm.userVerificationUserError = false;
                    }
                })
                .catch(err => {
                    hvm.userVerificationUserError = true;
                    hvm.userVerificationUserErrorMsg = err;
                });

        };
    }

})();
