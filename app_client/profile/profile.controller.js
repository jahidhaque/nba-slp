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

    profileCtrl.$inject = ['authentication', '$location', 'account'];

    function profileCtrl(authentication, $location, account) {

        const provm = this;

        if (authentication.isLoggedIn()) {
            provm.profileStatus = authentication.currentUser().accountStatus;

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
