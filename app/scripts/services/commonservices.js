'use strict';

/**
 * @ngdoc service
 * @name mainAppApp.commonServices
 * @description
 * # commonServices
 * Service in the mainAppApp.
 */
angular.module('ohanaApp')
  .service('commonServices', ['$rootScope', '$firebaseAuth', 'DAO' , function ($rootScope, $firebaseAuth, DAO) {

    /******************************************************
	* 			 User Management - start                  *
	*******************************************************/

	// Registers a new user to the application, requires vaild email and password.
    this.register = function(user) {
		return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
			.then(function() {
				var userId = firebase.auth().currentUser.uid;
				console.log('success : user registered');
    			firebase.database().ref('/userData/' + userId).set(user)
					.then(function(data) {
						console.log('success : user data added');
						firebase.database().ref('/userRoles/' + userId).set({
							role: 'Participant',
							name: user.name,
							email: user.email
						});
						return true;
					})
					.catch(function(error) {
						var errorCode = error.code;
			  			var errorMessage = error.message;
			  			console.log('ERROR: ' + error.code + ': ' + error.message);
			  			return false;
					});
			})
			.catch(function(error) {
	  			var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
	  			return false;
			});
	};

	// Signs in existing user into the application, requires valid email and password.
	this.signin = function(user) {
		return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
			.then(function(data) {
				console.log('success : ' + firebase.auth().currentUser.email + ' signed In');
				return true;
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
	  			return false;
			});

	};

	// Signs out current user.
	this.signout = function() {
		firebase.auth().signOut()
			.then(function(data) {
				console.log('success : Signed out');
				$rootScope.userData = {};
				$rootScope.userRole = {};
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	}

	// Sends code needed for password reset to users email.
	this.sendPasswordReset = function(user) {
		firebase.auth().sendPasswordResetEmail(user.email)
			.then(function(data) {
				console.log('success : password reset sent');
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	};

	this.getCurrentUserEmail = function() {
		var user = firebase.auth().currentUser
		if (user != null) {
			return user.email;
		}else{
			return '';
		}
	}

	this.getCurrentUserUid = function() {
		var user = firebase.auth().currentUser
		if (user != null) {
			return user.uid;
		}else{
			return '';
		}
	}

	/******************************************************
	* 			   User Management - end                  *
	*******************************************************/

	/******************************************************
	*                 C.R.U.D. - start                    *
	*******************************************************/

	// Sets data at given path.
	this.setData = function(path, data) {
		firebase.database().ref(path).set(data)
			.then(function(data) {
				console.log('success : data set');
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	};

	// Adds a key and sets the data to the key based on where the path is.
	this.pushData = function(path, data) {
		firebase.database().ref(path).push(data)
			.then(function(data) {
				console.log('success : data pushed');
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	};

	// Adds a key to the designated path, then returns the key. 
	this.getNewKey = function(path) {
		return firebase.database().ref(path).push().key
	}

	// Updates data at given path.
	this.updateData = function(path, data) {
		var updates = {};
		updates[path] = data;
		firebase.database().ref().update(updates)
			.then(function(data) {
				console.log('success : data updated');
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	};

	// Removes data from given path.
	this.removeData = function(path) {
		firebase.database().ref(path).remove()
			.then(function(data) {
				console.log('success : data Deleted');
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	};

	// Gets data from directed path, returns a promise.
	this.getData = function(path) {
		return firebase.database().ref(path)
			.once('value')
			.then(function(snapshot) {
				return snapshot.val();
			});
	};

	/******************************************************
	*                  C.R.U.D. - end                     *
	*******************************************************/

	/******************************************************
	* 			 DAO object container - start             *
	*******************************************************/
	this.DAO = DAO;
	/******************************************************
	* 			 DAO object container - end             *
	*******************************************************/

  }]);
