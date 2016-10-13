'use strict';

/**
 * @ngdoc service
 * @name mainAppApp.commonServices
 * @description
 * # commonServices
 * Service in the mainAppApp.
 */
angular.module('mainAppApp')
  .service('commonServices', ['$rootScope', 'firebaseService', function ($rootScope, firebaseService, $firebaseAuth) {
    /******************************************************
	* 			 User Management - start                  *
	*******************************************************/

	//checks to see if user is logged in
	this.isLoggedIn = function() {
	  var auth = $firebaseAuth();
	//firebaseService.promise.then(function(){
		//return firebase.auth().currentUser;
		// console.log(firebase.auth().$getAuth())
		// firebase.auth().onAuthStateChanged(function(user) {
		// 	if (user) {
		// 		// User is signed in.
		// 		return true;
		// 	} else {
		// 		// No user is signed in.
		// 		return false;
		// 	}
		// })
		console.log('get auth', firebaseService.auth.$getAuth())
		return auth.$waitForAuth();
	//})
	
	};

	// Registers a new user to the application, requires vaild email and password.
    this.register = function(user) {
		firebase.auth().createUserWithEmailAndPassword(user.email, user.newpassword)
			.then(function() {
				var userId = firebase.auth().currentUser.uid;
				console.log('success : user registered');
				delete user.newpassword;
    			delete user.repeatpassword;
    			firebase.database().ref('/userData/' + userId).set(user)
					.then(function(data) {
						console.log('success : user data added');
					})
					.catch(function(error) {
						var errorCode = error.code;
			  			var errorMessage = error.message;
			  			console.log('ERROR: ' + error.code + ': ' + error.message);
					});
			})
			.catch(function(error) {
	  			var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});
	};

	// Signs in existing user into the application, requires valid email and password.
	this.signin = function(user) {
		firebase.auth().signInWithEmailAndPassword(user.email, user.password)
			.then(function(data) {
				console.log('success : ' + firebase.auth().currentUser.email + ' signed In');
				$rootScope.signedIn = true;
			})
			.catch(function(error) {
				var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log('ERROR: ' + error.code + ': ' + error.message);
			});

	};

	// Signs out current user.
	this.signout = function() {
		firebase.auth().signOut()
			.then(function(data) {
				console.log('success : Signed out');
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

  }]);
