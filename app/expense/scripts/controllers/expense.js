'use strict';

/**
 * @ngdoc function
 * @name mainAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mainAppApp
 */
angular.module('mainAppApp')
  .controller('ExpenseCtrl',   function($scope, $firebaseArray) {
    // function ($scope) {
   
  	//Get Data for Dropdown - WORKED
  	/*$scope.chapters =  [];  
    firebase.database().ref('/dropdown/Chapter/').on('child_added', function(snapshot) {  	
  	 $scope.chapters.push(snapshot.val().name);
      })*/

/*var storage = firebase.storage();
        var storageRef = storage.ref();
        var storageRefPic = '';
        storageRef.child('images/MD_11_9_2016_10_42_12_375_Menuselection.png').getDownloadURL().then(function(url) {
            $scope.pic = url;
        }).catch(function(error) {
            // Handle any errors
        });

  });

*/
//var URL = 'https://lawpublicpolicy-4c61a.firebaseio.com/expense/';

 //   var(URL);
// var list = $firebaseArray(new Firebase(URL));
//alert("single");
//$scope.list={};
//$scope.lists = [];
var ref = firebase.database().ref('/expense').on('value', function(snapshot) {   
     //$scope.chapters.push(snapshot.val().name);
    // alert("in");
    $scope.$apply(function(){
     $scope.lists =snapshot.val();
   })
    // alert(snapshot.val().Amount);
     // alert($scope.lists.Amount);
      }) 
//alert("single")
//var list = $firebaseArray(ref);
     

    // make the list available in the DOM
 //   $scope.list = list;


//alert("filename");

 // $scope.chaptername = "MARYLAND CHAPTER";
  // $scope.boats= firebase.database().ref('expense').orderByChild("Chapter").equalTo($scope.chaptername) 
       
  //alert($scope.boats.Amount);
  /*//.once("value", function(snapshot) {
    $timeout(function(){
        $scope.bills = snapshot.val();
        alert("I am in");
        console.log($scope.bills); //image of console up^
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    },0);
//});*/

});
   /* var storage = firebase.storage();
    var getImageUrl = function (time) {
       return storage.ref('images/MD_11_9_2016_10_42_12_375_Menuselection.png').getDownloadURL();
    ;

    $scope.showme = function(){
    $scope.images = [];
    $scope.messages = { // whatever };
    alert('whatever');
   // for (m in $scope.messages) {
      storage.ref('images/MD_11_9_2016_10_42_12_375_Menuselection.png').getDownloadURL().then(function (url) {
    //storage.ref('images/' + time + '.jpg').getDownloadURL().then(function (url) {
        // Might need $scope.$apply(function() {} ) surrounding
       alert(url);
         $scope.images.push(url);

        });
   //   }
    }
  }
 /*var img2fire = angular.module('img2fire', ['firebase', 'angular.filter']);

  img2fire.controller("base64Ctrl", function($scope, $firebaseArray) {
  
  var ref = new Firebase("https://base64images.firebaseio.com/");

  var img = new Firebase("https://base64images.firebaseio.com/images");
  $scope.imgs = $firebaseArray(img);

  var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
  $scope.uploadFile = function() {
    var sFileName = $("#nameImg").val();
    if (sFileName.length > 0) {
      var blnValid = false;
      for (var j = 0; j < _validFileExtensions.length; j++) {
        var sCurExtension = _validFileExtensions[j];
        if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
          blnValid = true;
          var filesSelected = document.getElementById("nameImg").files;
          if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function(fileLoadedEvent) {
              var textAreaFileContents = document.getElementById(
                "textAreaFileContents"
              );


              $scope.imgs.$add({
                date: Firebase.ServerValue.TIMESTAMP,
                base64: fileLoadedEvent.target.result
              });
            };

            fileReader.readAsDataURL(fileToLoad);
          }
          break;
        }
      }

      if (!blnValid) {
        alert('File is not valid');
        return false;
      }
    }

    return true;
  }

  $scope.deleteimg = function(imgid) {
    var r = confirm("Do you want to remove this image ?");
    if (r == true) {
      $scope.imgs.forEach(function(childSnapshot) {
        if (childSnapshot.$id == imgid) {
            $scope.imgs.$remove(childSnapshot).then(function(ref) {
              ref.key() === childSnapshot.$id; // true
            });
        }
      });
    }
  }

});*/

//function to save file

//function uploadOnChange(e) {

//  $scope.FileUploadList.push(document.getElementById('files'));
//  alert($scope.FileUploadList);
// }


/*  function LoadImage() {
    

     var filename = e.value;var lastIndex = filename.lastIndexOf("\\");
    if (lastIndex >= 0) {
        filename = e.value;
        //filename.substring(lastIndex +1);
    }
    //document.getElementById('files').value = filename; 
    alert(filename);  
 
   var filename;
    var inp = document.getElementById('files');
    for (var i = 0; i < inp.files.length; ++i) {
        filename = inp.files.item(i).name;
         alert("File-" + (i+1) + " : "  + filename);
    
alert(e.target.result);
    var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
    var blnValid = false;
    for (var j = 0; j < _validFileExtensions.length; j++) {
        var sCurExtension = _validFileExtensions[j];
     
        if (filename.substr(filename.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
           
            var storage = firebase.storage();

            var file = document.getElementById("files").files[0];
           console.log(file);

    
          var storageRef = firebase.storage().ref();
         // alert(storageRef.key());

         var chaptername = "MDChapter";
         var currentdate = new Date(); 
         var UniqueFileName = chaptername  + "_"
                + currentdate.getDate() + "_"
                + (currentdate.getMonth()+1)  + "_" 
                + currentdate.getFullYear() + "_"  
                + currentdate.getHours() + "_"  
                + currentdate.getMinutes() + "_" 
                + currentdate.getSeconds() + "_" 
                + Math.floor((Math.random() * 1000) + 1) + "_" 
                + file.name;
         //alert(FileUniqueID);


          //dynamically set reference to the file name
          var thisRef = storageRef.child('images/' + UniqueFileName).put(file).then(function(snapshot) {
            alert("success")
          console.log('Uploaded a blob or file!');
      });

          //var uploadTask = storageRef.child('images/' + file.name).put(file);
          //put request upload file to firebase storage
          //thisRef.put(file).then(function(snapshot) {
         // console.log('Uploaded a blob or file!');
     // });
  
  //get request to get URL for uploaded file
  thisRef.getDownloadURL().then(function(url) {
  console.log(url);
  })
}
}
}
 }         
          /*blnValid = true;
          var filesSelected =  document.getElementById("upload").files;
          //document.getElementById("filename").files;
          alert(filesSelected);
           if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];
           alert(fileToLoad);
            var fileReader = new FileReader();

            fileReader.onload = function(fileLoadedEvent) {
              var textAreaFileContents = document.getElementById(
                "textAreaFileContents"
              );


              $scope.imgs.$add({
                date: Firebase.ServerValue.TIMESTAMP,
                base64: fileLoadedEvent.target.result
              });
            };

            fileReader.readAsDataURL(fileToLoad);
          }
          break;
        }
      }

      if (!blnValid) {
        alert('File is not valid');
        return false;
      }
 
 
 
 
  /*     

       //Initialize Firebase
  var config = {
    apiKey: "AIzaSyDO5J-qwbLOzK05hMZA8q6VpE0MqGHM2nU",
    authDomain: "filetest-d7b65.firebaseapp.com",
    databaseURL: "https://filetest-d7b65.firebaseio.com",
    storageBucket: "filetest-d7b65.appspot.com",
  };
  firebase.initializeApp(config);*/

/*
//function to save file
function previewFile(){
  var storage = firebase.storage();

  var file = document.getElementById("files").files[0];
    console.log(file);
  
  var storageRef = firebase.storage().ref();
  
  //dynamically set reference to the file name
  var thisRef = storageRef.child(file.name);

  //put request upload file to firebase storage
  thisRef.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
});
  
  //get request to get URL for uploaded file
  thisRef.getDownloadURL().then(function(url) {
  console.log(url);
  })

  }*/