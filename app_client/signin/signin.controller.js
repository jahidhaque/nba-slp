/*
|----------------------------------------------
| setting up controller for login page
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nbaslp, 2017
|----------------------------------------------
*/

'use strict';

(function (){
    angular
        .module('nbaslp')	
        .controller('signinCtrl', signinCtrl);

    function signinCtrl() {
        const lvm = this;
    };
})();
