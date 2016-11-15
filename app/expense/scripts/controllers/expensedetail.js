'use strict';

/**
 * @ngdoc function
 * @name mainAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mainAppApp
 */
angular.module('mainAppApp')
  .controller('ExpenseDetailsCtrl',  function($scope, $routeParams) {
     
 $scope.expense = {};
 //$scope.$applyAsync();
 function loadexpensedata()
  {
  var ref = firebase.database().ref('expense').orderByChild("BillId").equalTo($routeParams.BillId);
  //alert($routeParams.BillId);   
  $scope.vimageurl=[];

   ref.on('value', function(snapshot) { 
   //	$scope.$apply(function(){
     $scope.expense =snapshot.val();
       $scope.$applyAsync();
      var imageList = [];
    angular.forEach($scope.expense, function(item){
         $scope.vimageurl = item.ImageURL; 
            //alert(item.ImageURL[0].FileName);
            // alert(item.ImageURL.length);
            for (var i = 0; i <  item.ImageURL.length; i++)              
            {
               //alert(item.ImageURL[i].FileName);
               var img = document.createElement('img');
                imageList[i]=item.ImageURL[i].FileName;
                var storage = firebase.storage();
                var storageRef = firebase.storage().ref();

                var storageRefPic = '';
                var storageloc = item.ImageURL[i].FileName;
              
                storageRef.child(storageloc).getDownloadURL().then(function(url) {
        
                 if (i ==0)
                 {
                    document.getElementById("image0").src = url;
                    document.getElementById("image0").hidden = false;
                  }

                if (i==1)
                 {
                    document.getElementById("image1").src = url;
                    document.getElementById("image1").hidden = false;
                  }

                if (i==2)
                 {
                    document.getElementById("image2").src = url;
                    document.getElementById("image2").hidden = false;
                  }

                if (i==3)
                 {
                    document.getElementById("image3").src = url;
                    document.getElementById("image3").hidden = false;
                  }
                if (i==4)
                 {
                    document.getElementById("image4").src = url;
                    document.getElementById("image4").hidden = false;
                  }

                if (i==5)
                 {
                    document.getElementById("image5").src = url;
                    document.getElementById("image5").hidden = false;
                  }

                if (i==6)
                 {
                    document.getElementById("image6").src = url;
                    document.getElementById("image6").hidden = false;
                  }

                if (i==7)
                 {
                    document.getElementById("image7").src = url;
                    document.getElementById("image7").hidden = false;
                  }

              if (i==8)
                 {
                    document.getElementById("image8").src = url;
                    document.getElementById("image8").hidden = false;
                  }

                if (i==9)
                 {
                    document.getElementById("image9").src = url;
                    document.getElementById("image9").hidden = false;
                  }


                }).catch(function(error) {
                        // Handle any errors
                });
                
            }   
 
       })
 
   //})
   })

}

   $scope.updateexpense = function(billid)
  {

 
      //failed-1
      // var updateref = firebase.database().ref('expense').child(BillId(billid));
      //   updateref.set({ BillId: billid, Description: this.dexedit.Description });

      var updateref = firebase.database().ref('expense').orderByChild("BillId").equalTo(billid);
     updateref.set({ BillId: billid, Description: this.dexedit.Description });

      // updateref.ref().child("Description").update(this.dexedit.Description);
alert(billid); 
   
   //failed-3
    /*var updateref = firebase.database().ref('expense').orderByChild("BillId").equalTo(billid);
    var updateObject = { 'Description' : this.dexedit.Description  };
     updateref.ref().update(updateObject);
     alert(updateObject ); 
     updateref.ref().child('Description').update('updateObject');*/


   /*  alert(this.dexedit.Description);
    var vdesc = this.dexedit.Description;
    var updateObject = { };
    updateObject = { 'Description' : this.dexedit.Description  };
        alert("update done");

     var updates = {};
     firebase.database().ref('expense').orderByChild("BillId").equalTo(billid)
     .on("child_added", function(snapshot) {
      alert(snapshot.key);
            updates["expense/"+snapshot.key+"/Description"] = "update done finally";
      });
      snapshot.ref().update(updates);
  

    // updateref.put("Description", "COMPLETED"); ref.on('value',
     updateref.on('value', function(snapshot) { 
        alert(snapshot.Description.length);
        alert(snapshot.val());
      alert("update done entry ");
        snapshot.update({ 'Description' : vdesc  }).catch(function(error) {
              alert("ERROR: " + error);
              });
        alert("update done last ");
      }).catch(function(error) {
        alert("ERROR 2: " + error);
    });
 */
     //update(updateObject);
      //{ 'Description' : vdesc  }); 
     alert("update donewww ");

  }

   $scope.UpdatePaymentStatus = function(billid)
  {
    alert(billid);

  }

  loadexpensedata();
  $scope.$applyAsync();

});
 