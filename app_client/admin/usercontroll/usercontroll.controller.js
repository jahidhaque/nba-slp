/*
|----------------------------------------------
| setting up user controller for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

'use strict';

(function () {

    angular
        .module('nbaslp')
        .controller('usercontrollCtrl', usercontrollCtrl);

    usercontrollCtrl.$inject = ['usercontroller', 'account', '$routeParams', '$route'];

    function usercontrollCtrl(usercontroller, account, $routeParams, $route) {
        
        const uservm = this;

        uservm.approveProcess = false;
        uservm.approveEdit = false;

        /*
        |----------------------------------------------
        | list action and title
        |----------------------------------------------
        */
        uservm.alluser = true;
        uservm.initialTitle = 'List of all user';

        uservm.paidMemberControl = false;

        uservm.loadUserList = () => {
            uservm.alluser = true;
            uservm.paidMemberControl = false;
            uservm.initialTitle = 'List of all user';

            usercontroller
                .showMembers()
                .then(response => {
                    if (response.data.error) {
                        uservm.showMemberError = true; 
                        uservm.showMemberErrorMsg = response.data.error; 
                    }
                    else {
                        uservm.members = response.data.members;
                    }
                })
                .catch(err => {
                    uservm.showMemberError = true;
                    uservm.showMemberErrorMsg = err;
                });
        };

        uservm.loadPaidMember = (action, source) => {
            uservm.alluser = false;
            uservm.paidMemberControl = true;
            uservm.initialTitle = 'List Of Only Paid User(s)';

            const QuerySource = source;
            const QueryAction = action;

            usercontroller
                .filterAction(QuerySource, QueryAction)
                .then(response => {
                    if (response.data.error) {
                        uservm.loadPaidMemberError = true;
                        uservm.loadPaidMemberErrorMsg = response.data.error;
                    }
                    else {
                        uservm.loadPaidMemberError = false;
                        uservm.paidListUsers = response.data.verifiedUsers;
                    }
                })
                .catch(err => {
                    uservm.loadPaidMemberError = true;
                    uservm.loadPaidMemberErrorMsg = err;
                });
        };

        uservm.filterControll = (action, source) => {
            if (action === 'alluser') {
                uservm.loadUserList();
            }
            else if (action === 'paid') {
                uservm.loadPaidMember(action, source);
            }
        };

        // initial function to check whether user clicked any member name
        uservm.checkRoutes = () => {
            if ($routeParams.v) {
                uservm.clickedMemberName = true;
            }
            else {
                uservm.clickedMemberName = false;
            }
        };


        /*
        |----------------------------------------------
        | Following function will get individual member's
        | details
        |----------------------------------------------
        */
        uservm.loadUserInfo = () => {
            const memebrId = $routeParams.v;

            usercontroller
                .showSingleMember(memebrId)
                .then(response => {
                    if (response.data.error) {
                        uservm.singleMemberLoadingError = true;
                        uservm.singleMemberLoadingErrorMsg = response.data.error;
                    }
                    else {
                        uservm.singleMemberLoadingError = false;
                        uservm.singleMember = response.data.member;
                    }
                })
                .catch(err => {
                    uservm.singleMemberLoadingError = true;
                    uservm.singleMemberLoadingErrorMsg = err;
                });
        };

        uservm.loadUserProfile = () => {
            const memebrId = $routeParams.v;

            usercontroller
                .showMemberProfile(memebrId)
                .then(response => {
                    if (response.data.error) {
                        uservm.profileLoadingError = true;
                        uservm.profileLoadingErrorMsg = response.data.error;
                    }
                    else {
                        uservm.profileLoadingError = false;
                        uservm.memberProfile = response.data.profile;
                    }
                })
                .catch(err => {
                    uservm.profileLoadingError = true;
                    uservm.profileLoadingErrorMsg = err;
                });
        };

        uservm.loadUserBranch = () => {
            const memebrId = $routeParams.v;

            usercontroller
                .showMemberBranch(memebrId)
                .then(response => {
                    if (response.data.error) {
                        uservm.branchLoadingError = true;
                        uservm.branchLoadingErrorMsg = response.data.error;
                    }
                    else {
                        uservm.branchLoadingError = false;
                        uservm.memberBranch = response.data.branch;
                    }
                })
                .catch(err => {
                    uservm.branchLoadingError = true;
                    uservm.branchLoadingErrorMsg = err;
                });
        };

        uservm.loadBankTeller = () => {
            const memebrId = $routeParams.v;

            account
                .getBankTeller(memebrId)
                .then(response => {
                    if (response.data.error) {
                        uservm.bankTellerLoadingError = true;
                        uservm.bankTellerLoadingErrorMsg = response.data.error;
                    }
                    else if (response.data.bankTeller === null) {
                        uservm.bankTellerLoadingError = true;
                        uservm.bankTellerLoadingErrorMsg = 'This user has not uploaded any bank teller yet';
                    }
                    else {
                        uservm.bankTellerLoadingError = false;
                        uservm.memberbankTeller = response.data.bankTeller;

                        if (response.data.bankTeller.tellerApproved === false 
                            && response.data.bankTeller.tellerValidTill === 'valid till date') {
                            uservm.approveProcess = true;
                        }
                        else {
                            uservm.approveEdit = true;
                        }
                    }
                })
                .catch(err => {
                    uservm.bankTellerLoadingError = true;
                    uservm.bankTellerLoadingErrorMsg = err;
                });
        };

        uservm.tellerApproved = {
            validTill: '',
            valid: '',
            whos: $routeParams.v,
        };

        uservm.approveTeller = () => {
            account
                .approveTeller(uservm.tellerApproved)
                .then(response => {
                    if (response.data.error) {
                        uservm.tellerApprovedError = true;
                        uservm.tellerApprovedErrorMsg = response.data.error;
                    }
                    else {
                        uservm.tellerApprovedError = false;
                        $route.reload();
                    }
                })
                .catch(err => {
                    uservm.tellerApprovedError = true;
                    uservm.tellerApprovedErrorMsg = err;
                });
        };

        uservm.editBankTellerApproving = () => {
            uservm.approveEdit = false;
            uservm.approveProcess = true;
        };

        uservm.cancelTellerSubmission = () => {
            uservm.approveEdit = true;
            uservm.approveProcess = false;
        };
    }


})();