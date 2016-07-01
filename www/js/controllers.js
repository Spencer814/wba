angular.module('starter.controllers', [])

.controller('WbaCtrl', function($scope) {})

.controller('ProgramsCtrl', function($scope, Programs) {
  $scope.programs = Programs.all();
  $scope.remove = function(program) {
    Programs.remove(program);
  };
})

.controller('ProgramDetailCtrl', function($scope, $stateParams, Programs) {
  $scope.program = Programs.get($stateParams.programId);
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

.controller('ParentsCtrl', function($scope, Events, $ionicPlatform, $cordovaCalendar, $timeout) {
    
  $ionicPlatform.ready(function() {
    Events.get().then(function(events) {
      $scope.events = events;
    });
  });
  
  $scope.addEvent = function(event, idx) {
    
    Events.add(event).then(function(result) {
      if(result === 1) {
        //update the event
        $timeout(function() {
          $scope.events[idx].status = true;
          $scope.$apply();
        });
      } else {
        //For now... maybe just tell the user it didn't work?
      }
    });

    
  };
    
});
