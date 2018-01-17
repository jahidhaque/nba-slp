/*
|----------------------------------------------
| setting up event controller for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

'use strict';

(function () {
    
    angular
        .module('nbaslp')
        .controller('eventsCtrl', eventsCtrl);

    eventsCtrl.$inject = ['sitecontroller'];

    function eventsCtrl(sitecontroller) {

        const evm = this;

        evm.showEvents = () => {
            sitecontroller
                .showEvent()
                .then(response => {
                    if (response.data.error) {
                        evm.eventLoadError = true;
                        evm.eventLoadErrorMsg = response.data.error;
                    }
                    else {
                        evm.eventLoadError = false;
                        evm.events = response.data.events;

                        if (evm.events.length > 0) {
                            evm.noEvent = false;
                        }
                        else {
                            evm.noEvent = true;
                        }
                    }
                })
                .catch(err => {
                    evm.eventLoadError = true;
                    evm.eventLoadErrorMsg = err;
                });
        };
    }

})();