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

    profileCtrl.$inject = ['authentication', '$location', 'account', '$route'];

    function profileCtrl(authentication, $location, account, $route) {

        const provm = this;

        if (authentication.isLoggedIn()) {
            provm.profileStatus = authentication.currentUser().accountStatus;

            // get user account statues 
            provm.getProfileStatuses = () => {
                account
                    .getAccountStatuses(authentication.currentUser().email)
                    .then(response => {
                        if (response.data.error) {
                            provm.statusLoadError = true;
                            provm.statusLoadErrorMsg = response.data.error;
                        }
                        else {
                            provm.statusLoadError = false;
                            provm.userStatuses = response.data.statuses;
                        }
                    })
                    .catch(err => {
                        provm.statusLoadError = true;
                        provm.statusLoadErrorMsg = err;
                    });
            };

            // saving basic profile info
            provm.basicProfile = {
                whos: authentication.currentUser().email,
                userId: authentication.currentUser().userId,
                formerName: '',
                sex: '',
                tele: '',
                address: '',
            };

            provm.saveBasicInfo = () => {
                account
                    .saveBasicInfo(provm.basicProfile)
                    .then((response) => {
                        if (response.data.error) {
                            provm.basicAccountInfoError = true;
                            provm.basicAccountInfoErrorMsg = response.data.error;
                        }
                        else {
                            provm.basicAccountInfoError = false;

                            provm.updatedStatus = {
                                update_at: 'basic_info',
                                email: authentication.currentUser().email,
                                status: true,
                            };

                            // calling service function.
                            account
                                .updateUserStatus(provm.updatedStatus)
                                .then(response => {
                                    if (response.data.error) {
                                        provm.basicAccountInfoError = true;
                                        provm.basicAccountInfoErrorMsg = response.data.error;
                                    }
                                    else {
                                        provm.statusUpdateError = false;
                                        $route.reload();
                                    }
                                });
                        }
                    })
                    .catch((err) => {

                    });
            };
        }
        else {
            $location.path('/signin');
        }
    }

})();
