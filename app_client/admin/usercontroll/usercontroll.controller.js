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

    usercontrollCtrl.$inject = ['usercontroller', '$routeParams'];

    function usercontrollCtrl(usercontroller, $routeParams) {
        
        const uservm = this;

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
                	console.log(response);
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
    }


})();