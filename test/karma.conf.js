// Karma configuration
// Generated on 2016-06-16

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/bootstrap/dist/js/bootstrap.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-messages/angular-messages.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-touch/angular-touch.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/datatables.net/js/jquery.dataTables.js',
      'app/bower_components/datatables.net-bs/js/dataTables.bootstrap.js',
      'app/bower_components/datatables.net-autofill/js/dataTables.autoFill.js',
      'app/bower_components/datatables-autofill-bootstrap/js/dataTables.autoFill.js',
      'app/bower_components/datatables.net-buttons/js/dataTables.buttons.js',
      'app/bower_components/datatables.net-buttons/js/buttons.colVis.js',
      'app/bower_components/datatables.net-buttons/js/buttons.flash.js',
      'app/bower_components/datatables.net-buttons/js/buttons.html5.js',
      'app/bower_components/datatables.net-buttons/js/buttons.print.js',
      'app/bower_components/datatables.net-buttons-bs/js/buttons.bootstrap.js',
      'app/bower_components/datatables.net-responsive/js/dataTables.responsive.js',
      'app/bower_components/datatables.net-responsive-bs/js/responsive.bootstrap.js',
      'app/bower_components/datatables.net-scroller/js/dataTables.scroller.js',
      'app/bower_components/moment/moment.js',
      'app/bower_components/summernote/dist/summernote.js',
      'app/bower_components/angular-summernote/dist/angular-summernote.js',
      'app/bower_components/es6-promise/es6-promise.js',
      'app/bower_components/sweetalert2/dist/sweetalert2.js',
      'app/bower_components/jquery.maskedinput/dist/jquery.maskedinput.js',
      'app/bower_components/jt.timepicker/jquery.timepicker.js',
      'app/bower_components/jquery-timepicker-jt/jquery.timepicker.js',
      'app/bower_components/angular-jquery-timepicker/src/timepickerdirective.js',
      'app/bower_components/angular-ui-select/dist/select.js',
      'app/bower_components/angular-local-storage/dist/angular-local-storage.js',
      'app/bower_components/angular-simple-logger/dist/angular-simple-logger.js',
      'app/bower_components/lodash/lodash.js',
      'app/bower_components/markerclustererplus/src/markerclusterer.js',
      'app/bower_components/google-maps-utility-library-v3-markerwithlabel/dist/markerwithlabel.js',
      'app/bower_components/google-maps-utility-library-v3-infobox/dist/infobox.js',
      'app/bower_components/google-maps-utility-library-v3-keydragzoom/dist/keydragzoom.js',
      'app/bower_components/js-rich-marker/src/richmarker.js',
      'app/bower_components/angular-google-maps/dist/angular-google-maps.js',
      'app/bower_components/firebase/firebase.js',
      'app/bower_components/angularfire/dist/angularfire.js',
      'app/bower_components/mockfirebase/browser/mockfirebase.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
