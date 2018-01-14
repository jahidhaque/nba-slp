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

            provm.currentAccountType = authentication.currentUser().accountType;
            
            // checking account type
            if (authentication.currentUser().accountType === 'customer') {

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
                                
                                const updatedStatus = {
                                    update_at: 'basic_info',
                                    email: authentication.currentUser().email,
                                    status: true,
                                };

                                // calling service function.
                                account
                                    .updateUserStatus(updatedStatus)
                                    .then(response => {
                                        if (response.data.updated === true) {
                                            provm.statusUpdateError = false;
                                            $route.reload();
                                        }
                                        else {
                                            provm.basicAccountInfoError = true;
                                            provm.basicAccountInfoErrorMsg = response.data.error;
                                        }
                                    })
                                    .catch(err => {
                                        provm.statusUpdateError = true;
                                        provm.basicAccountInfoErrorMsg = err;
                                    });
                            }
                        })
                        .catch((err) => {

                        });
                };

                provm.branch = {
                    year: '',
                    branch: '',
                };

                // adding branch info
                provm.saveBatchInfo = () => {
                    account
                        .saveBranchInfo(authentication.currentUser().email, provm.branch)
                        .then(response => {
                            if (response.data.error) {
                                provm.branchInfoError = true;
                                provm.branchInfoErrorMsg = response.data.error;
                            }
                            else if (response.data.success) {
                                provm.branchInfoError = false;
                                
                                const updatedStatus = {
                                    update_at: 'branch',
                                    email: authentication.currentUser().email,
                                    status: true,
                                };

                                // calling service function.
                                account
                                    .updateUserStatus(updatedStatus)
                                    .then(response => {
                                        if (response.data.updated === true) {
                                            provm.branchInfoError = false;
                                            $route.reload();
                                        }
                                        else {
                                            provm.branchInfoError = true;
                                            provm.branchInfoErrorMsg = response.data.error;
                                        }
                                    })
                                    .catch(err => {
                                        provm.branchInfoError = true;
                                        provm.branchInfoErrorMsg = err;
                                    });
                            }
                        })
                        .catch(err => {
                            provm.branchInfoError = true;
                            provm.branchInfoErrorMsg = err;
                        });
                };

                // show basic info
                provm.loadBasicInfo = (collectionName) => {
                    account
                        .loadUserInfo(collectionName, authentication.currentUser().email)
                        .then(response => {
                            if (response.data.error) {
                                provm.userBasicInfoLoadingError = true;
                                provm.userBasicInfoLoadingErrorMsg = response.data.error;
                            }
                            else {
                                provm.userBasicInfoLoadingError = false;
                                provm.basicInfo = response.data.userInfo;
                            }
                        })
                        .catch(err => {
                            provm.userBasicInfoLoadingError = true;
                            provm.userBasicInfoLoadingErrorMsg = err;
                        });
                };

                provm.getCommittee = () => {
                    account
                        .getCommittee()
                        .then(response => {
                            provm.committees = response.data.committee;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                };

                // show branch info
                provm.loadUserBranch = (collectionName) => {
                    account
                        .loadUserInfo(collectionName, authentication.currentUser().email)
                        .then(response => {
                            if (response.data.error) {
                                provm.userInfoLoadingError = true;
                                provm.userInfoLoadingErrorMsg = response.data.error;
                            }
                            else {
                                provm.userInfoLoadingError = false;
                                provm.branchInfo = response.data.userInfo;
                            }
                        })
                        .catch(err => {
                            provm.userInfoLoadingError = true;
                            provm.userInfoLoadingErrorMsg = err;
                        });
                };
            }
            else if (authentication.currentUser().accountType === 'admin') {

            }
        }
        else {
            $location.path('/signin');
        }
    }

})();
