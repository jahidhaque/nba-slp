/*
|----------------------------------------------
| setting up councilmembers controller for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

'use strict';

(function () {

    angular
        .module('nbaslp')
        .controller('councilCtrl', councilCtrl);

    councilCtrl.$inject = ['sitecontroller'];

    function councilCtrl(sitecontroller) {
        const clvm = this;

        clvm.loadCouncilMembers = () => {
            sitecontroller
                .showCouncilMember()
                .then(response => {
                    console.log(response);
                    if (response.data.error) {
                        clvm.committeeLoadingError = true;
                        clvm.committeeLoadingErrorMsg = response.data.error;
                    }
                    else {
                        clvm.committeeLoadingError = false;
                        clvm.councils = response.data.data;
                    }
                })
                .catch(err => {
                    clvm.committeeLoadingError = true;
                    clvm.committeeLoadingErrorMsg = err;
                });
        };
    }

})();