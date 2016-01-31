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
            $window.location.href = 'file:///C:/Users/SweMon/Desktop/MySMU/Cloud%20Computing/delivery/index.html';
        }, function(error) {
            //Failure callback
            console.log('Authentication failure');
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
                    }, function(error) {
                        // do things if failure
                        console.log(error);
                    });
            }
    };


});
 