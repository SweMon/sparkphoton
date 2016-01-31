'use strict';
 
angular.module('myApp', ['firebase'])
.controller('AuthController', function($scope,$firebaseAuth,$window) {
  $scope.credentials = {};

  var firebaseObj = new Firebase('https://sparkphoton.firebaseio.com/');


    $scope.SignIn = function(event) {
    event.preventDefault();  // To prevent form refresh
    var username = $scope.credentials.email;
    var password = $scope.credentials.password;
     
      
   // var loginObj = $firebaseSimpleLogin(firebaseObj);
   var loginObj = $firebaseAuth(firebaseObj);
     
    loginObj.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            //Success callback
            console.log('Authentication successful');
            $window.location.href = 'http://swemon.github.io/sparkphoton/profile.html';
        }, function(error) {
            //Failure callback
            console.log('Authentication failure');
            $window.location.href = 'http://swemon.github.io/sparkphoton/log_in.html';
        });
    };



    $scope.SignUp = function(event) {
    event.preventDefault();  // To prevent form refresh
    var email = $scope.credentials.email;
    var password = $scope.credentials.password;
     
      var firebaseObj = new Firebase("https://sparkphoton.firebaseio.com/");
    var auth = $firebaseAuth(firebaseObj);

      if (email && password) {
                auth.$createUser(email, password)
                    .then(function() {
                        // do things if success
                        console.log('User creation success');
                        $window.location.href = 'http://swemon.github.io/sparkphoton/log_in.html';
                    }, function(error) {
                        // do things if failure
                        console.log(error);
                        $window.location.href = 'http://swemon.github.io/sparkphoton/register.html';
                    });
            }
    };


});
 