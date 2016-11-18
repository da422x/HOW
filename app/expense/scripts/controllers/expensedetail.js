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
 $scope.isdisabled = false;
   ref.on('value', function(snapshot) { 
   //	$scope.$apply(function(){
     $scope.expense =snapshot.val();

       $scope.$applyAsync();
      var imageList = [];
    angular.forEach($scope.expense, function(item){
         if(item.PaymentStatus == 'paid')
          {
            $scope.isdisabled = true;
            $scope.paymentstatusbtn.value = "Expense Paid";
             
          };
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

    
    var self = this;
     firebase.database().ref('expense').orderByChild("BillId").equalTo(billid)
     .on("child_added", function(snapshot) {
      // snapshot = metdata + object (val)    
      // snapshot.Description = self.dexedit.Description
      //  console.log("log  log  22 ", snapshot, snapshot.val(), snapshot.key);
      var temp = snapshot.val();
      temp["Description"] = self.dexedit.Description;         

      firebase.database().ref('expense/'+snapshot.key).update(temp);
      //.set(temp);
       
      });
  
     alert("Expense Successfully Updated ");

  }

   $scope.UpdatePaymentStatus = function(billid)
  {
    alert(billid);

    var self = this;
     firebase.database().ref('expense').orderByChild("BillId").equalTo(billid)
     .on("child_added", function(snapshot) {
      // snapshot = metdata + object (val)    
      // snapshot.Description = self.dexedit.Description
      //  console.log("log  log  22 ", snapshot, snapshot.val(), snapshot.key);
      var temp = snapshot.val();
      temp["PaymentStatus"] = 'paid';         

      firebase.database().ref('expense/'+snapshot.key).update(temp);
      //.set(temp);
       
      });
  
     alert("Payment Status Updated ");

  }

  loadexpensedata();
  $scope.$applyAsync();

});
 