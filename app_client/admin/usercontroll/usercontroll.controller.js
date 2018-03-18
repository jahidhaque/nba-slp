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

        uservm.usernotLoaded = true;

        /*
        |----------------------------------------------
        | list action and title
        |----------------------------------------------
        */
        uservm.alluser = true;
        uservm.initialTitle = 'List of all user';

        uservm.paidMemberControl = false;
        uservm.unPaidMemberControl = false;
        uservm.searchUserControl = false;

        uservm.loadUserList = () => {
            uservm.alluser = true;
            uservm.paidMemberControl = false;
            uservm.searchUserControl = false;
            uservm.unPaidMemberControl = false;
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

        /*
        |----------------------------------------------
        | collect user details based on given email
        |----------------------------------------------
        */
        uservm.collectUserDetail = (email) => {
            const memebrId = email;

            uservm.usernotLoaded = false;

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
                        
                        // calling load bank teller
                        uservm.loadBankTeller(uservm.singleMember.email);

                        // calling branch loader
                        uservm.loadUserBranch(uservm.singleMember.email);
                    }
                })
                .catch(err => {
                    uservm.singleMemberLoadingError = true;
                    uservm.singleMemberLoadingErrorMsg = err;
                });
        }

        uservm.loadPaidMember = (action, source) => {
            uservm.alluser = false;
            uservm.searchUserControl = false;
            uservm.paidMemberControl = true;
            uservm.unPaidMemberControl = false;
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
                    else if (response.data.verifiedUsers.length < 1) {
                        uservm.loadPaidMemberError = true;
                        uservm.loadPaidMemberErrorMsg = "No paid member has found";
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
            else if (action === 'unpaid') {
                uservm.loadUnPaidMember(action, source);
            }
            else if (action === 'searchuser') {
                uservm.loadUserSearch(action, source);
            }
        };

        uservm.loadUserSearch = (action, source) => {
            uservm.searchUserControl = true;
            uservm.alluser = false;
            uservm.paidMemberControl = false;
            uservm.unPaidMemberControl = false;
        }

        uservm.loadUnPaidMember = (action, source) => {
            uservm.alluser = false;
            uservm.paidMemberControl = false;
            uservm.searchUserControl = false;
            uservm.unPaidMemberControl = true;

            uservm.initialTitle = 'List Of Only Unpaid User(s)';

            const QuerySource = source;
            const QueryAction = action;

            usercontroller
                .filterAction(QuerySource, QueryAction)
                .then(response => {
                    console.log('response', response);
                    if (response.data.error) {
                        uservm.loadUnPaidMemberError = true;
                        uservm.loadUnPaidMemberErrorMsg = response.data.error;
                    }
                    else if (response.data.verifiedUsers.length < 1) {
                        uservm.loadUnPaidMemberError = true;
                        uservm.loadUnPaidMemberErrorMsg = "No unpaid member has found";
                    }
                    else {
                        uservm.loadUnPaidMemberError = false;
                        uservm.unPaidListUsers = response.data.verifiedUsers;
                    }
                })
                .catch(err => {
                    uservm.loadUnPaidMemberError = true;
                    uservm.loadUnPaidMemberErrorMsg = err;
                });
        }


        /*
        |----------------------------------------------
        | searching the user based on given input
        |----------------------------------------------
        */
        uservm.search = {
            user: '',
        };

        uservm.searchUser = () => {
            usercontroller
                .searchUser(uservm.search.user)
                .then(response => {
                    if (response.data.error) {
                        uservm.userSearchError = true;
                        uservm.userSearchErrorMsg = response.data.error;
                    }
                    if (response.data.searchResult.length < 1) {
                        uservm.userSearchError = true;
                        uservm.userSearchErrorMsg = 'No user found';
                    }
                    else {
                        uservm.userSearchError = false;
                        uservm.searchUserList = response.data.searchResult;
                    }
                })
                .catch(err => {
                    uservm.userSearchError = true;
                    uservm.userSearchErrorMsg = err;
                })
        }
        

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

        uservm.loadUserBranch = (email) => {
            const memebrId = email;

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

        uservm.loadBankTeller = (email) => {
            const memebrId = email;

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
            whos: '',
        };

        uservm.approveTeller = (email) => {
            uservm.tellerApproved.whos = email;
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