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
        hvm.showPassResetForm = false;

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
            else if ($route.current.params && $route.current.params.r && $route.current.params.u) {

                hvm.PasswordresetForm = true;
                hvm.checkUserForm = false;

                hvm.verifyAjaxLoader = true;

                
                hvm.varifyUserDetails();

                /*
                |----------------------------------------------
                | change password form submit
                |----------------------------------------------
                */
                hvm.changePasswordInfo = {
                    key: $route.current.params.r,
                    user: $route.current.params.u,
                    newpassword: '',
                    repeatpassword: '',
                };
                hvm.changePassword = () => {
                    authentication
                        .changePassword(hvm.changePasswordInfo)
                        .then(response => {
                            console.log(response);
                            if (response.data.error) {
                                hvm.changePassError = true;
                                hvm.changePassErrorMsg = response.data.error;
                            }
                            else {
                                hvm.changePassError = false;
                            }
                        })
                        .catch(err => {
                            hvm.changePassError = true;
                            hvm.changePassErrorMsg = err;
                        });
                };
            }

        };

        hvm.varifyUserDetails = () => {
            authentication
                .countUser($route.current.params.u)
                .then(response => {
                    if (response.data.error) {
                        hvm.userVerificationUserError = true;
                        hvm.userVerificationUserErrorMsg = response.data.error;

                        // turn of ajax
                        hvm.verifyAjaxLoader = false;
                    }
                    else {
                        // now check verify the key
                        authentication
                            .verifyKey($route.current.params.u, $route.current.params.r)
                            .then(response => {
                                if (response.data.error) {
                                    hvm.userVerificationUserError = true;
                                    hvm.userVerificationUserErrorMsg = response.data.error;
                                }
                                else {
                                    hvm.userVerificationUserError = false;
                                    hvm.showPassResetForm = true;
                                    hvm.verifyAjaxLoader = false;
                                }
                            })
                            .catch(err => {
                                hvm.userVerificationUserError = true;
                                hvm.userVerificationUserErrorMsg = err;
                            });
                    }
                })
                .catch(err => {
                    hvm.userVerificationUserError = true;
                    hvm.userVerificationUserErrorMsg = err;
                    hvm.verifyAjaxLoader = false;
                });

        };

    }

})();
