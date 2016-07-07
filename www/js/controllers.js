angular.module('wbaApp.controllers', [])

.controller('WbaCtrl', function($scope, $ionicModal, $timeout, Photos) {

	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
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

	$scope.photos = Photos.all();
	$scope.remove = function(photo) {
		Photos.remove(photo);
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

.controller('ProgramsCtrl', function($scope, Programs) {
	$scope.programs = Programs.all();

	$scope.remove = function(program) {
		Programs.remove(program);
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

.controller('ParentsCtrl', function($scope, Events, Newsletters, Rules, Extras) {
	$scope.events = Events.all();
	$scope.newsletters = Newsletters.all();
	$scope.rules = Rules.all();
	$scope.extras = Extras.all();

	$scope.remove = function(event, newsletter, rules, extras) {
		Events.remove(event);
		Newsletters.remove(newsletter);
		Rules.remove(rule);
		Extras.remove(extra);
	};
})

.controller('ContactCtrl', function($scope) {});
