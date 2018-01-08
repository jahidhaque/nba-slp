/*
|----------------------------------------------
| setting up controller for site-controll page
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

'use strict';

(function () {

    angular
        .module('nbaslp')
        .controller('sitecontrollCtrl', sitecontrollCtrl);

    sitecontrollCtrl.$inject = ['authentication', '$location', 'sitecontroller'];

    function sitecontrollCtrl(authentication, $location, sitecontroller) {
        const adSite = this;

        if (authentication.isLoggedIn()) {
            
            if (authentication.currentUser().accountType === 'admin') {
                
                adSite.committee = {
                    name: '',
                };
                // add committee
                adSite.addPreferredCommittee = () => {
                    sitecontroller
                        .addPreferredCommittee(adSite.committee)
                        .then(response => {
                            if (response.data.error) {
                                adSite.addCommitteeError = true;
                                adSite.addCommitteeErrorMsg = response.data.error;
                            }
                            else {
                                adSite.addCommitteeError = false;
                                adSite.addCommitteeSuccessMsg = 'Committee successfully added';

                                // set time out and call show committee method.
                                setTimeout(() => {
                                    adSite.showCommittee();
                                }, 200);
                            }
                        })
                        .catch(err => {
                            adSite.addCommitteeError = true;
                            adSite.addCommitteeErrorMsg = err;
                        });
                };

                // show committee
                adSite.showCommittee = () => {
                    sitecontroller
                        .showAllCommittee()
                        .then(response => {
                            if (response.data.error) {
                                adSite.committeeError = true;
                                adSite.committeeErrorMsg = response.data.error;
                            }
                            else {
                                adSite.committeeError = false;
                                adSite.committeeList = response.data.committee;
                            }
                        })
                        .catch(err => {
                            adSite.committeeError = true;
                            adSite.committeeErrorMsg = err;
                        });
                };

                // remove individual committee.
                adSite.removeList = (committeeId) => {
                    sitecontroller
                        .removeCommittee(committeeId)
                        .then(response => {
                            if (response.data.error) {
                                alert(response.data.error);
                            }
                            else {
                                setTimeout(() => {
                                    adSite.showCommittee();
                                }, 100);
                            }
                        })
                        .catch(err => {
                            alert(err);
                        });
                };
            }
            else {
                $location.path('/welcome');
            }
        }
        else {
            $location.path('/signin');
        }
    }

})();