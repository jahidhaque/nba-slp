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

    profileCtrl.$inject = ['$scope', 'authentication', '$location', 'account', '$route'];

    function profileCtrl($scope, authentication, $location, account, $route) {

        const provm = this;

        provm.resetpassword = {
            password: '',
            repeat_password: '',
            new_password: '',
        };

        provm.resetPassword = () => {
            account
                .resetPassword(authentication.currentUser().email, provm.resetpassword)
                .then(response => {
                    if (response.data.error) {
                        provm.resetPasswordError = true;
                        provm.resetPasswordErrorMsg = response.data.error;
                    }
                    else {
                        provm.resetPasswordError = false;
                        provm.resetSuccess = true; 
                        setTimeout(() => {
                            authentication.Logout();
                            $route.reload();
                        }, 200);
                    }
                })
                .catch(err => {
                    provm.resetPasswordError = true;
                    provm.resetPasswordErrorMsg = err;
                });
        };

        function statusUpdater(updateObject) {

            // calling service function.
            account
                .updateUserStatus(updateObject)
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

        if (authentication.isLoggedIn()) {
                        
            provm.currentAccountType = authentication.currentUser().accountType;
            
            // checking account type
            if (authentication.currentUser().accountType === 'customer') {

                provm.profileStatus = authentication.currentUser().accountStatus;

                provm.codeReady = false;

                provm.basicProfileEditOn = false;
                provm.branchInfoEditOn = false;
                
                provm.sendActivationCode = () => {
                    provm.codeReady = true;
                    account
                        .createActivationCode(authentication.currentUser().email)
                        .then(response => {
                            if (response.data.error) {
                                provm.activationCodeError = true;
                                provm.activationCodeErrorMsg = response.data.error;
                            }
                            else {
                                const updatedStatus = {
                                    update_at: 'profileActivationMail',
                                    email: authentication.currentUser().email,
                                    status: true,
                                };
                                statusUpdater(updatedStatus);

                                provm.codeReady = false;

                                provm.activationCodeError = false;
                            }
                        })
                        .catch(err => {
                            provm.activationCodeError = true;
                            provm.activationCodeErrorMsg = err;
                        });
                };

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

                // edit basic info
                provm.editBasicInfo = (userId) => {
                    provm.basicProfileEditOn = true;

                    provm.editBasic = {
                        name: provm.basicInfo.formerName,
                        sex: provm.basicInfo.sex,
                        address: provm.basicInfo.address,
                        tele: provm.basicInfo.telephone,
                    };

                    provm.SaveEditBasicInfo = () => {
                        account
                            .editBasicInfo(userId, provm.editBasic)
                            .then(response => {
                                if (response.data.error) {
                                    provm.editBasicInfoError = true;
                                    provm.editBasicInfoErrorMsg = response.data.error;
                                }
                                else {
                                    provm.editBasicInfoError = false;
                                    $route.reload();
                                }
                            })
                            .catch(err => {
                                provm.editBasicInfoError = true;
                                provm.editBasicInfoErrorMsg = err;
                            });
                    };
                };

                provm.cancleBasicEdit = () => {
                    provm.basicProfileEditOn = false;
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

                
                // edit branch info
                provm.editBranchInfo = (userId) => {
                    provm.branchInfoEditOn = true;

                    provm.editBranch = {
                        baryear: provm.branchInfo.barYear,
                        branch: provm.branchInfo.nbaBranch,
                    };
                    // handle form submission 
                    provm.saveEditBranchInfo = () => {
                        account
                            .editBranchInfo(userId, provm.editBranch)
                            .then(response => {
                                if (response.data.error) {
                                    provm.editBranchInfoError = true;
                                    provm.editBranchInfoErrorMsg = response.data.error;
                                }
                                else {
                                    provm.editBranchInfoError = false;
                                    $route.reload();
                                }
                            })
                            .catch(err => {
                                provm.editBranchInfoError = true;
                                provm.editBranchInfoErrorMsg = err;
                            });
                    };
                };

                // cancle branch info edit.
                provm.cancelEditBranchInfo = () => {
                    provm.branchInfoEditOn = false;
                };

                /*
                |----------------------------------------------
                | following function will active the profile 
                | based on given code
                |----------------------------------------------
                */
                provm.activation = {
                    code: '',
                };

                provm.activeProfile = () => {
                    account
                        .validateActivationCode(authentication.currentUser().email, provm.activation.code)
                        .then(response => {
                            if (response.data.error) {
                                provm.ActivationError = true;
                                provm.ActivationErrorMsg = response.data.error;
                            }
                            else if (response.data.success) {
                                provm.activationSuccess = true;

                                // calling the logout function.
                                setTimeout(() => {
                                    authentication.Logout();
                                    $route.reload();
                                }, 3000);
                            }
                        })
                        .catch(err => {
                            provm.ActivationError = true;
                            provm.ActivationErrorMsg = err;
                        });
                };

                /*
                |----------------------------------------------
                | Following function will handle bank teller 
                | upload
                |----------------------------------------------
                */
                provm.bankTellerInfo = {
                    preferredCommittee: '',
                    additional_committee: '',
                    bank: '',
                    branch: '',
                    depositor: '',
                    depositor_tel: '',
                    tellerno: '',
                    amount: '',
                    datedeposit: '',
                    userId: authentication.currentUser().accountId,
                    
                };

                provm.saveBankTellerInfo = () => { 

                    account
                        .uploadTellerDocs(authentication.currentUser().email, provm.bankTellerInfo)
                        .then(response => {
                            if (response.data.error) {
                                provm.saveTellerError = true;
                                provm.saveTellerErrorMsg = response.data.error;
                            }
                            else {
                                provm.saveTellerError = false;

                                // now update user status for bank teller
                                const updatedStatus = {
                                    update_at: 'bankteller',
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
                            provm.saveTellerError = true;
                            provm.saveTellerErrorMsg = err;
                        });
                };

                /*
                |----------------------------------------------
                | Following function will get latest bank teller
                |----------------------------------------------
                */
                provm.getCurrentBankTeller = () => {
                    account
                        .getBankTeller(authentication.currentUser().email)
                        .then(response => {
                            console.log('teller', response);
                            if (response.data.error) {
                                provm.bankTellerLoadingError = true;
                                provm.bankTellerLoadingErrorMsg = response.data.error;
                            }
                            else {
                                provm.bankTellerLoadingError = false;
                                provm.userBankTeller = response.data.bankTeller;
                            }
                        })
                        .catch(err => {
                            provm.bankTellerLoadingError = true;
                            provm.bankTellerLoadingErrorMsg = err;
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
