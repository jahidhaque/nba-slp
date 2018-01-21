/*
|----------------------------------------------
| setting up committees for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

'use strict';

(function () {

    angular
        .module('nbaslp')
        .controller('committeesCtrl', committeesCtrl);

    committeesCtrl.$inject = ['sitecontroller'];

    function committeesCtrl(sitecontroller) {
        const cvm = this;

        cvm.loadCommittee = () => {
            sitecontroller
                .showAllCommittee()	
                .then(response => {
                    if (response.data.error) {
                        cvm.committeeLoadingError = true;
                        cvm.committeeLoadingErrorMsg = response.data.error;
                    }
                    else {
                        cvm.committeeLoadingError = false;
                        cvm.committees = response.data.committee;
                    }
                })
                .catch(err => {
                    cvm.committeeLoadingError = true;
                    cvm.committeeLoadingErrorMsg = err;
                });
        }
    }

})();