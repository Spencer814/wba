angular.module('wbaApp', ['ionic', 'wbaApp.controllers', 'wbaApp.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
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

  .state('wba', {
    url: '/wba',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'WbaCtrl'
  })

  .state('wba.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'WbaCtrl'
      }
    }
  })

  .state('wba.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
     }
    }
  })

  .state('wba.about-detail', {
    url: '/about/:personId',
    views: {
      'menuContent': {
        templateUrl: 'templates/about-detail.html',
        controller: 'AboutDetailCtrl'
      }
    }
  })

  .state('wba.programs', {
    url: '/programs',
    views: {
      'menuContent': {
        templateUrl: 'templates/programs.html',
        controller: 'ProgramsCtrl'
      }
    }
  })

  .state('wba.program-detail', {
    url: '/programs/:programId',
    views: {
      'menuContent': {
        templateUrl: 'templates/program-detail.html',
        controller: 'ProgramDetailCtrl'
      }
    }
  })

  .state('wba.admissions', {
    url: '/admissions',
    views: {
      'menuContent': {
        templateUrl: 'templates/admissions.html',
        controller: 'AdmissionsCtrl'
      }
    }
  })

  .state('wba.parents', {
    url: '/parents',
    views: {
      'menuContent': {
        templateUrl: 'templates/parents.html',
        controller: 'ParentsCtrl'
      }
    }
  })

  .state('wba.contact', {
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html'
      }
    }
  });

  $urlRouterProvider.otherwise('/wba/home');
});
