/*
|----------------------------------------------
| setting up entry point for angular front-end
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

(function () {
    angular
        .module('nbaslp', ['ngResource', 'ngRoute', '720kb.datepicker'])
        .config(['$routeProvider', '$locationProvider', config]);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/welcome/welcome.view.html',
                controller: 'welcomeCtrl',
                controllerAs: 'wvm',
            })
            .when('/councilmembers', {
                templateUrl: 'councilmembers/councilmembers.view.html',
            })
            .when('/signup', {
                templateUrl: 'signup/signup.view.html',
                controller: 'signupCtrl',
                controllerAs: 'regvm',
            })
            .when('/signin', {
                templateUrl: 'signin/signin.view.html',
                controller: 'signinCtrl',
                controllerAs: 'lvm',
            })
            .when('/profile', {
                templateUrl: 'profile/profile.view.html',
                controller: 'profileCtrl',
                controllerAs: 'provm',
            })
            .when('/help', {
                templateUrl: 'help/help.view.html',
                controller: 'helpCtrl',
                controllerAs: 'hvm',
            })
            .when('/sitecontroll', {
                templateUrl: 'admin/sitecontroll/sitecontroll.view.html',
                controller: 'sitecontrollCtrl',
                controllerAs: 'adSite',
            })
            .when('/usercontroll', {
                templateUrl: 'admin/usercontroll/usercontroll.view.html',
                controller: 'usercontrollCtrl',
                controllerAs: 'uservm',
            })
            .when('/welcome', {
                templateUrl: 'welcome/welcome.view.html',
                controller: 'welcomeCtrl',
                controllerAs: 'wvm',
            })
            .when('/committees', {
                templateUrl: 'committees/committees.view.html',
                controller: 'committeesCtrl',
                controllerAs: 'cvm',
            })
            .when('/events', {
                templateUrl: 'events/events.view.html',
                controller: 'eventsCtrl',
                controllerAs: 'evm',
            })
            .when('/aboutus', {
                templateUrl: 'aboutus/aboutus.view.html',
                controller: 'aboutusCtrl',
                controllerAs: 'abvm',
            })
            .when('/contactus', {
                templateUrl: 'contactus/contactus.view.html',
                controller: 'contactusCtrl',
                controllerAs: 'cvm',
            });

        $locationProvider.html5Mode({
            enabled: true,
        });
    }
})();
