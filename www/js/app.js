// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordovaBluetoothLE', 'starter.controllers', 'starter.services', 'ionic-timepicker', 'ngCordova', 'chart.js', 'ngTagsInput', 'DEBUG'])

.run(function($rootScope, $ionicPlatform) {
    $rootScope.isdebug = false;
    $ionicPlatform.ready(function() {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/schedule');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    .state('tab.devMode', {
        url: '/devMode',
        views: {
            'tab-devMode': {
                templateUrl: 'templates/dev-mode.html',
                controller: 'devModeCtrl'
            }
        }
    })
    .state('tab.schedule', {
        url: '/schedule',
        views: {
            'tab-modes': {
                templateUrl: 'templates/schedule/schedule.index.html',
                controller: 'scheduleCtrl'
            }
        }
    })
    // Each tab has its own nav history stack:
    .state('tab.modes', {
        url: '/schedule/:gid/modes',
        views: {
            'tab-modes': {
                templateUrl: 'templates/modes.html',
                controller: 'modesCtrl'
            }
        }
    })
    .state('tab.patterns', {
        url: '/schedule/:gid/modes/:modeName/patterns',
        views: {
            'tab-modes': {
                templateUrl: 'templates/patterns.html',
                controller: 'patternsCtrl'
            }
        }
    })
    .state('tab.patternEdit', {
        url: '/schedule/:gid/modes/:modeName/patterns/:patternKey',
        views: {
            'tab-modes': {
                templateUrl: 'templates/patternEdit.html',
                controller: 'patternEditCtrl'
            }
        }
    })
    /*
            .state('tab.modeEdit', {
                url: '/:gid/modes/edit/:modeName',
                views: {
                    'tab-modes': {
                        templateUrl: 'templates/modeEdit.html',
                        controller: 'modeEditCtrl'
                    }
                }
            })*/
    .state('tab.chart', {
        url: '/chart',
        views: {
            'tab-chart': {
                templateUrl: 'templates/chart.html',
                controller: 'chartCtrl'
            }
        }
    })
    .state('tab.manual', {
        url: '/manual',
        views: {
            'tab-manual': {
                templateUrl: 'templates/tab-manual.html',
                controller: 'manualCtrl'
            }
        }
    })
    .state('tab.management', {
        url: '/management',
        views: {
            'tab-management': {
                templateUrl: 'templates/management/management.index.html',
                controller: 'managementCtrl'
            }
        }
    })
    .state('tab.devicesList', {
        url: '/management/devicesList',
        views: {
            'tab-management': {
                templateUrl: 'templates/management/devicesList.html',
                controller: 'devicesListCtrl'
            }
        }
    })
    .state('tab.groupsList', {
        url: '/management/groupsList',
        views: {
            'tab-management': {
                templateUrl: 'templates/management/groupsList.html',
                controller: 'groupsListCtrl'
            }
        }
    })
    .state('tab.connect', {
        url: '/connect',
        views: {
            'tab-connect': {
                templateUrl: 'templates/tab-connect.html',
                controller: 'connectCtrl'
            }
        }
    });



})

;
