angular.module('wbaApp.controllers', [])

.controller('WbaCtrl', function($scope, $ionicModal, Photos, Bests) {

  // Initialize the modal view.
  $ionicModal.fromTemplateUrl('templates/document.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.photos = Photos.all();
  $scope.bests = Bests.all();
  $scope.remove = function(photo, best) {
    Photos.remove(photo);
    Bests.remove(best);
  };
})

.controller('AboutCtrl', function($scope, Persons, Values) {
  $scope.settings = {
    enableFriends: true
  }

  $scope.persons = Persons.all();
  $scope.values = Values.all();
  
  $scope.remove = function(person, value) {
    Persons.remove(person);
    Values.remove(value);
  };
})

.controller('AboutDetailCtrl', function($scope, $stateParams, Persons) {
  $scope.person = Persons.get($stateParams.personId);
})

.controller('ProgramsCtrl', function($scope, Programs, Extras) {
  $scope.programs = Programs.all();
  $scope.extras = Extras.all();

  $scope.remove = function(program, extras) {
    Programs.remove(program);
    Extras.remove(extra);
  };
})

.controller('ProgramDetailCtrl', function($scope, $stateParams, Programs) {
  $scope.program = Programs.get($stateParams.programId);
})

.controller('AdmissionsCtrl', function($scope, $stateParams, Admissions, Docs) {
  $scope.admissions = Admissions.all();
  $scope.docs = Docs.all();

  $scope.remove = function(admissions, docs) {
    Admissions.remove(admission);
    Docs.remove(doc);
  };  
})

.controller('ParentsCtrl', function($scope, Events, Newsletters, Rules) {
  $scope.events = Events.all();
  $scope.newsletters = Newsletters.all();
  $scope.rules = Rules.all();

  $scope.remove = function(event, newsletter, rules) {
    Events.remove(event);
    Newsletters.remove(newsletter);
    Rules.remove(rule);
  };
})

.controller('FormsCtrl', function($scope, Forms, Sections) {
  $scope.forms = Forms.all();
  $scope.sections = Sections.all();

  $scope.remove = function(form, section) {
    Forms.remove(form);
    Sections.remove(form);
  };
})

.controller('FormDetailCtrl', function($scope, $stateParams, Forms, Sections) {
  $scope.form = Forms.get($stateParams.formId);
  $scope.section = Sections.get($stateParams.sectionId);
})

.controller('ContactCtrl', function($scope) {});
