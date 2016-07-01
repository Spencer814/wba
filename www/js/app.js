angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })


  .state('tab.wba', {
    url: '/wba',
    views: {
      'tab-wba': {
        templateUrl: 'templates/tab-wba.html',
        controller: 'WbaCtrl'
      }
    }
  })

  .state('tab.programs', {
    url: '/programs',
    views: {
      'tab-programs': {
        templateUrl: 'templates/tab-programs.html',
        controller: 'ProgramsCtrl'
      }
    }
  })

  .state('tab.program-detail', {
    url: '/programs/:programId',
    views: {
      'tab-programs': {
        templateUrl: 'templates/program-detail.html',
        controller: 'ProgramDetailCtrl'
      }
    }
  })

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  })

  .state('tab.about-detail', {
    url: '/about/:personId',
    views: {
      'tab-about': {
        templateUrl: 'templates/about-detail.html',
        controller: 'AboutDetailCtrl'
      }
    }
  })

  .state('tab.contact', {
    url: '/contact',
    views: {
      'tab-contact': {
        templateUrl: 'templates/tab-contact.html',
      }
    }
  })

  .state('tab.admissions', {
    url: '/admissions',
    views: {
      'tab-admissions': {
        templateUrl: 'templates/tab-admissions.html',
      }
    }
  })

  .state('tab.parents', {
    url: '/parents',
    views: {
      'tab-parents': {
        templateUrl: 'templates/tab-parents.html',
        controller: 'ParentsCtrl'
      }
    }
  })

  .state('tab.brochure', {
    url: '/brochure',
    views: {
      'tab-brochure': {
        templateUrl: 'templates/tab-brochure.html',
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/dash');

});
