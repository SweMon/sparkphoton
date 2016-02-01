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
            $window.location.href = '/sparkphoton/profile.html';
        }, function(error) {
            //Failure callback
            console.log('Authentication failure');
            $window.location.href = '/sparkphoton/log_in.html';
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
                        $window.location.href = '/sparkphoton/log_in.html';
                    }, function(error) {
                        // do things if failure
                        console.log(error);
                        $window.location.href = '/sparkphoton/register.html';
                    });
            }
    };


     var myDataRef = new Firebase('https://sparkphoton.firebaseio.com/');

    $scope.chat = function(event) {
    event.preventDefault();  // To prevent form refresh
    var name = $scope.data.name;
    var text = $scope.data.message;
      
      console.log("usernmae");  

       myDataRef.push({name: name, message: text});
      //  $('#messageInput').val('');

          myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.message);
      });
   
   
    };

   function displayChatMessage(name, text) {
        $('<span/><br/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };

});
 