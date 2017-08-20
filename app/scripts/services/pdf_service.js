'use strict';

/**
 * @ngdoc service
 * @name ohanaApp.pdfService
 * @description
 * # pdfService
 * Service in the ohanaApp.
 */
angular.module('ohanaApp').service('pdfService', function() {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var url = '../assets/Media_Waiver_Form.pdf';
  var url2 = '../assets/Adult_Waiver_Release_of_Liability_rev_3-19-12.pdf';

  // Disable workers to avoid yet another cross-origin issue (workers need
  // the URL of the script to be loaded, and dynamically loading a cross-origin
  // script does not work).
  PDFJS.disableWorker = true;

  // The workerSrc property shall be specified.
  PDFJS.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

  // Asynchronous download of PDF
  // var loadingTask = PDFJS.getDocument(url); //can take url or base64 image as {data: pdfData}
  // loadingTask.promise;
  Promise.all([
    PDFJS.getDocument(url).promise,
    PDFJS.getDocument(url2).promise,
  ]).then(
    function(res_set) {
      res_set.forEach(function(val, idx) {
        postprocessor(val, idx + 1);
      });
    },
    function(reason) {
      // PDF loading error
      console.error(reason);
    }
  );

  this.postprocessor = function(pdf, idx) {
    console.log('PDF loaded');

    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function(page) {
      var scale = 1.5;
      var viewport = page.getViewport(scale);

      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById('the-canvas' + idx);
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      var renderTask = page.render(renderContext);
      renderTask.then(function() {
        console.log('Page rendered');
      });
    });
  };

  this.updateMediaWaiverTemplate = function(a, idx) {
    var val = a.value;
    var c = document.getElementById('the-canvas1').getContext('2d');
    c.font = '16px Verdana';
    switch (idx) {
      case 1:
        c.fillText(val, 120, 450); // participant/volunteer name
        break;
      case 2:
        c.fillText(val, 95, 610); //name print
        break;
      case 3:
        c.fillText(val, 630, 610); //date
        break;
      case 4:
        c.fillText(val, 95, 725); // email //height differential of 57.5
        break;
      case 5:
        c.fillText(val, 630, 725); // phone
        break;
      case 6:
        c.fillText(val, 95, 781.5); //street address
        break;
      case 7:
        c.fillText(val, 295, 781.5); //apt/suite
        break;
      case 8:
        c.fillText(val, 520, 781.5); //city
        break;
      case 9:
        c.fillText(val, 665, 781.5); //state
        break;
      case 10:
        c.fillText(val, 755, 781.5); //zip
        break;
      case 11:
        c.fillText(val, 95, 940); //witness name
        break;
      case 12:
        c.fillText(val, 630, 940); //witness date
        break;
        // c.fillText(val, 95, 997.5); //witness signature
      case 13:
        c.fillText(val, 95, 1055); //witness email
        break;
      case 14:
        c.fillText(val, 630, 1055); //witness phone
        break;
    }

    //c.drawImage(imageObj2, 0, 0, 82, 75);
  };

  this.updateReleaseWaiverTemplate = function(a, idx) {
    var val = a.value;
    var c = document.getElementById('the-canvas2').getContext('2d');
    c.font = '16px Verdana';
    switch (idx) {
      case 1:
        c.fillText(val, 55, 1055); // participant/volunteer name
        break;
      case 2:
        c.fillText(val, 550, 1000); // participant/volunteer date
        break;
      case 3:
        c.fillText(val, 500, 1050); // event text
        break;
    }

    //c.drawImage(imageObj2, 0, 0, 82, 75);
  };
  this.saveImgPerEvent = function() {
    //once per event
    createMediaWaiver();
  };

  this.saveImgPerUser = function() {
    //once per year
    createReleaseWaiver();
  };

  this.createMediaWaiver = function() {
    var c = document.getElementById('the-canvas1');
    var d = document;
    updateMediaWaiverTemplate(d.getElementById('author_name'), 1);
    updateMediaWaiverTemplate(d.getElementById('author_name'), 2);
    updateMediaWaiverTemplate(d.getElementById('author_date'), 3);
    overlayAuthorSignature();
    updateMediaWaiverTemplate(d.getElementById('author_email'), 4);
    updateMediaWaiverTemplate(d.getElementById('author_phone'), 5);
    updateMediaWaiverTemplate(d.getElementById('author_street'), 6);
    updateMediaWaiverTemplate(d.getElementById('author_apt'), 7);
    updateMediaWaiverTemplate(d.getElementById('author_city'), 8);
    updateMediaWaiverTemplate(d.getElementById('author_state'), 9);
    updateMediaWaiverTemplate(d.getElementById('author_zip'), 10);
    updateMediaWaiverTemplate(d.getElementById('witness_name'), 11);
    updateMediaWaiverTemplate(d.getElementById('witness_date'), 12);
    overlayWitnessSignature();
    updateMediaWaiverTemplate(d.getElementById('witness_email'), 13);
    updateMediaWaiverTemplate(d.getElementById('witness_phone'), 14);
    setTimeout(function() {
      document.getElementById('mediaWaiver').src = c.toDataURL();
    }, 0);
  };

  this.createReleaseWaiver = function() {
    var c = document.getElementById('the-canvas2');
    var d = document;
    updateReleaseWaiverTemplate(d.getElementById('author_name'), 1);
    updateReleaseWaiverTemplate(d.getElementById('author_date'), 2);
    updateReleaseWaiverTemplate({
        value: "crayon's events",
      },
      3
    );
    setTimeout(function() {
      document.getElementById('releaseWaiver').src = c.toDataURL();
    }, 0);
  };

  var canvas = document.getElementById('signatureCanvas');
  var signaturePad = new SignaturePad(canvas);
  var canvas2 = document.getElementById('signatureCanvas2');
  var signaturePad2 = new SignaturePad(canvas2);

  this.clearCanvas = function() {
    signaturePad.clear();
  };

  this.overlayAuthorSignature = function() {
    var sigImg = signaturePad.toDataURL();
    var image = new Image();
    image.onload = function() {
      var c = document.getElementById('the-canvas1').getContext('2d');
      c.drawImage(image, 95, 638);
      c = document.getElementById('the-canvas2').getContext('2d');
      c.drawImage(image, 45, 964);
    };
    image.src = sigImg;
  };

  this.clearCanvas2 = function() {
    signaturePad2.clear();
  };

  this.overlayWitnessSignature = function() {
    var sigImg = signaturePad2.toDataURL();
    var image = new Image();
    image.onload = function() {
      var c = document.getElementById('the-canvas1').getContext('2d');
      c.drawImage(image, 95, 963);
    };
    image.src = sigImg;
  };
});
