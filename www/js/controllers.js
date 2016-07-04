angular.module('starter.controllers', [])

.controller('WbaCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on Wba start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('AboutCtrl', function($scope, Persons) {
  $scope.settings = {
    enableFriends: true
  }

  $scope.persons = Persons.all();
  $scope.remove = function(person) {
    Persons.remove(person);
  };
})

.controller('AboutDetailCtrl', function($scope, $stateParams, Persons) {
  $scope.person = Persons.get($stateParams.personId);
})

.controller('ProgramsCtrl', function($scope, Programs) {
  $scope.programs = Programs.all();
  $scope.remove = function(program) {
    Programs.remove(program);
  };
})

.controller('ProgramDetailCtrl', function($scope, $stateParams, Programs) {
  $scope.program = Programs.get($stateParams.programId);
})

.controller('AdmissionsCtrl', function($scope) {})

.controller('ParentsCtrl', function($scope, Events) {
  $scope.events = Events.all();
  $scope.remove = function(event) {
    Events.remove(event);
  };
})

.controller('ContactCtrl', function($scope) {});
