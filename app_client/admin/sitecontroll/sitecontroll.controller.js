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

                        })
                        .catch(err => {

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