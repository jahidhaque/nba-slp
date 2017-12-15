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
		.module('nbaslp', ['ngResource', 'ngRoute'])
		.config(['$routeProvider', '$locationProvider', config]);

	function config($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'home/welcome/welcome.view.html',
				controller: 'welcomeCtrl',
				controllerAs: 'wvm',
			})

		$locationProvider.html5Mode({
			enabled: true,
		});
	}
})();