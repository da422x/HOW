'use strict';

/**
 * @ngdoc function
 * @name mainAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mainAppApp
 */
angular.module('mainAppApp')
  .controller('ViewExpenseCtrl',  function($scope, $filter) {
    //['$scope' , '$filter', function($scope, $filter) {
//function($scope, $filter) {
     
 var self = this; 
 var originalList = [];
    $scope.listS = "";
    $scope.lists = {};

 var reportdata = {
      eventdate: "",
      Description: "",       
      Line: [{
          Quantity: "",
          Amount:""},
          {
          Quantity: "",
          Amount:""},
          {
          Description: "",
          Amount:""}
          ] 
    };


    $scope.filterChapters = function (input) {
      var res = [];
      if (Object.keys(input).length !== 0) {

        Object.keys(input).forEach(function (ele, idx, arr) {
          if (res.indexOf(input[ele].Chapter) == -1) {
            res.push(input[ele].Chapter)
          }
        })
        console.log(res);
        return res;
      }
    }

    $scope.filterTable = function () {
      if ($scope.listS) {
        var temp = {};
        Object.keys(originalList).forEach(function (ele) {

          if (originalList[ele].Chapter == $scope.listS)
            temp[ele] = originalList[ele];
        })

        $scope.lists = temp;
      }
      else
        $scope.lists = originalList;

    }

 //$scope.lists = [];


  $scope.viewexpensedata = function()
  {
       var ref = firebase.database().ref('/expense').orderByChild("SubmitDate")
                 .on('value', function(snapshot) { 
       $scope.lists = originalList = snapshot.val();
        //reportdata =   snapshot.val();
        console.log("sample", originalList);
        $scope.chapters = $scope.filterChapters(snapshot.val())
        $scope.$applyAsync();  //added to avoid lag in ng-repeat update on load

       })
  }

///  //  image: "data:expense/images/logo-sm.png",

var rptdata = [];
var currentdate = new Date();   
var reportDate = (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' +  currentdate.getFullYear();
 
var GetTableData;

 
 
 function buildTableBody(data, columns) {
    var body = [];
     body.push(columns);         
   
    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column].toString());
        })

        body.push(dataRow);
    });
    // alert(body);
    return body;
} 

function table(data, columns) {   
  console.log("Table Function inside", data, columns);
    return {
       style: 'demoTable',      
       width: 'auto',
        table: {
            headerRows: 1,
width: 'auto',
            body:  
            buildTableBody(data, columns)
        }
    };
}
 
var  GetJsonData = function()
{
   var t = 0;
    
   angular.forEach($scope.lists, function(value,index){ 

      var reportdata = {
      "Event Date": value.eventdate,
      "Description":   value.Description   ,
       "Miles Driven":   parseInt(value.Line[0].Quantity),
       "Mileage Amount":  Math.round(parseFloat(value.Line[0].Amount)* 100) / 100,
       "Trailer Mile":   parseInt(value.Line[1].Quantity),
       "Trailer Amount":   Math.round(parseFloat(value.Line[1].Amount )* 100) / 100,
        "Other Expense":    value.Line[2].Description,
        "Expense Amount":  Math.round(parseFloat(value.Line[2].Amount)* 100) / 100,
        "Other Expense Desc":  value.Line[2].Description
      } ;
           //alert($scope.rpttabledata[t]);
           rptdata.push(reportdata);  
 
     })
   console.log("JSON DATA" , rptdata);
    
   return rptdata;

 }

 

$scope.CreateExpenseReport = function()
{ 
      var t = 0;

    
   var datatest= GetJsonData();
   console.log("check data old", datatest);

 
 
var  docDefinition =    {
  pageOrientation: 'landscape',
      header: {
        margin: 10,
        columns: [
                  
            {
                margin: [10, 0, 0, 0],
                text: 'Heroes on the Water' 
              }
        ]
    },
footer: {
    columns: [
       reportDate,
       
      { text: 'AT&T', alignment: 'right' }
    ]
  },
  
    
  styles: {
      header: {
        bold: true,
        color: '#000',
        fontSize: 11
      },
      demoTable: {
        color: '#666',
        fontSize: 10
      }
    },
    content: [
      
      {
        text: 'HOW Expense Report', alignment: 'center', fontSize: 14,  bold: true

      },
      {
         text: '\n'
    },

     {
        canvas: [
            {
                type: 'line',
                x1: 0,
                y1: 5,
                x2: 750,
                y2: 5,
                lineWidth: 0.5
            }
        ]
    },
    {
       text: '\n'
    },
      {
      columns: [
        {
          stack: [
            // second column consists of paragraphs
            'Payable To: Name' ,            
            'Address 1',
            'City/State/Zip'
          ],
          fontSize: 11
        },
        {
          stack: [
            // second column consists of paragraphs
            'Chapter Name: ',
            'Email Id' 
          ],
          fontSize: 11
        },
        {
          stack: [
            // second column consists of paragraphs
            'Expense From : ',
            'Expense To : ' 
          ],
          fontSize: 11
        }
      ]
    },
  {
        text: '\n'
    } 
  ,
   
     { width: '', text: '' },  

   table( datatest, ['Event Date', 'Description', 'Miles Driven','Mileage Amount', 'Trailer Mile', 'Trailer Amount','Other Expense', 'Expense Amount','Other Expense Desc'])
      
    ],
    styles: {
      header: {
        bold: true,
        color: '#000',
        fontSize: 11
      },
      demoTable: {
        color: '#666',
        fontSize: 9,
        width:750,
        alignment: 'right' 
      }
    }
  };  

 //alert(docDefinition);
//table( datatest, ['EventDate', 'Description', 'MilesDriven','MileageAmount', 'TrailerMile', 'TrailerAmount','OtherExpense', 'ExpenseAmount','OtherExpenseDesc'])
 
 //console.log("PDF", docDefinition, GetTableData());
 pdfMake.createPdf(docDefinition).download('ExpenseReport.pdf');

}
 
$scope.filterPaidStatus = function() {
    //$scope.counter++;
	console.log('Paid Status filter');
  };
 


$scope.idSelectedBill = null;
$scope.setSelected = function (idSelectedBill) {
  $scope.idSelectedBill = idSelectedBill;
  	//alert($scope.idSelectedBill); 
};

  


} );
 
//  function convertImgToBase64URL(url, callback, outputFormat){
// var canvas = document.createElement('CANVAS'),
//     ctx = canvas.getContext('2d'),
//     img = new Image;
// img.crossOrigin = 'Anonymous';
// img.onload = function(){
//     var dataURL;
//     canvas.height = img.height;
//     canvas.width = img.width;
//     ctx.drawImage(img, 0, 0);
//     dataURL = canvas.toDataURL(outputFormat);
//     callback(dataURL);
//     canvas = null; 
// };
// img.src = url;

// }

// function getBase64Image(img) {
//         // Create an empty canvas element
//         alert("in");
//         var canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;

//         // Copy the image contents to the canvas
//         var ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0);

//         // Get the data-URL formatted image
//         // Firefox supports PNG and JPEG. You could check img.src to
//         // guess the original format, but be aware the using "image/jpg"
//         // will re-encode the image.
//         var dataURL = canvas.toDataURL("image/png");

//         return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
//     }

    