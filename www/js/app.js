// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ionic-timepicker','ngCordova','chart.js','DEBUG'])

.run(function($ionicPlatform) {
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


  // Each tab has its own nav history stack:

  .state('tab.modes', {
    url: '/modes',
    views: {
      'tab-modes': {
        templateUrl: 'templates/modes.html',
        controller: 'modesCtrl'
      }
    }
  })
  .state('tab.modeEdit', {
    url: '/modes/edit/:modeName',
    views: {
      'tab-modes': {
        templateUrl: 'templates/modeEdit.html',
        controller: 'modeEditCtrl'
      }
    }
  })
  .state('tab.chart', {
    url: '/chart',
    views: {
      'tab-chart': {
        templateUrl: 'templates/chart.html',
        controller: 'chartCtrl'
      }
    }
  })
  /*
    .state('tab.section-set', {
    url: '/dash/:sectionId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/section-set.html',
        controller: 'sectionSetCtrl'
      }
    }
  })*/

  .state('tab.manual', {
      url: '/manual',
      views: {
        'tab-manual': {
          templateUrl: 'templates/tab-manual.html',
          controller: 'manualCtrl'
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

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/modes');

})

.constant('lightItem', [
   {ID: 0, Title: '太陽光5m'},
   {ID: 1, Title: '太陽光10m'},
   {ID: 2, Title: '太陽光15m'},
   {ID: 3, Title: '太陽光20m'},
   {ID: 4, Title: '高演色性太陽光'},
   {ID: 5, Title: '藍光'},
  ] )
.constant('lightItemKey', [
   {ID: 'sun5m', Title: '太陽光5m'},
   {ID: 'sun10m', Title: '太陽光10m'},
   {ID: 'sun15m', Title: '太陽光15m'},
   {ID: 'sun20m', Title: '太陽光20m'},
   {ID: 'cri', Title: '高演色性太陽光'},
   {ID: 'blue', Title: '藍光'},
  ] );
