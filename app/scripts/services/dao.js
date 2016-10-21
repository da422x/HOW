'use strict';

/**
 * @ngdoc service
 * @name mainAppApp.DAO
 * @description
 * # DAO
 * Service in the mainAppApp.
 */
angular.module('mainAppApp')
    .service('DAO', function() {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var userData = function userData() {
			this.address= null;
            this.branch= null;
            this.email= null;
            this.emergency= {
                name: null,
                phone: null
            };
            this.gender= null;
            this.name= {
                first: null,
                last: null
            };
            this.phone= null;
            this.years= null
            if (arguments.length == 1) {
                angular.extend(this, arguments[0]);
            }
        }

        var report = function report() {
            this.prototype = {
                name: null,
                url: null,
                data: null,
                regionId: null,
                chapterId: null,
                creatorId: null,
                lastModifiedId: null,
                typeOfReport: null
            }

            if (arguments.length == 1) {
                angular.extend(this.prototype, arguments[0]);
            }

        }

        var chapter = function chapter() {
            this.prototype = {
                users: null,
                location: {},
                staff: {},
                events: {
                    description: null,
                    name: null,
                    data: null,
                    images: null,
                    participants: null,
                    volunteers: null,
                    LTMs: null
                }
            }

            if (arguments.length == 1) {
                angular.extend(this.prototype, arguments[0]);
            }
        }




        return {
            userData: userData,
            report: report,
            chapter: chapter
        }
    });
