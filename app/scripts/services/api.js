/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

angular.module('ohanaApp').service('Api', function($resource) {
  'use strict';

  //put url logic here to support localhost
  var l = window.location;
  var extension =
    l.hostname === 'localhost' || l.hostname.indexOf('txcdtl08tm638x') > -1 //				"http://txcdt36an7383.itservices.sbc.com:1337"
      ? 'http://ec2-52-43-72-217.us-west-2.compute.amazonaws.com:1337'
      : l.protocol + '//' + l.hostname;

  return {
    // region controller -------------------------------------------------------------------
    // 		region: $resource(extension + '/region', {}, {
    // //			query: { method: 'GET' }, // implied default GET retrieves all
    // 			save: { method: 'POST', isArray: false }
    // 		}),
    // 		region: $resource(extension + '/region/:region_id',
    // 			{region_id: '@region_id'}, {
    // 				update: { method: 'PUT' },
    // 				remove: { method: 'DELETE', isArray: false }
    // 			}),

    //fake method for sampling spying
    ezmoney: function() {
      //thad
      //contents don't matter
      //so long as it's invokable
    },
    createChapter: $resource(
      extension + '/region/:region_id/create_chapter',
      {
        region_id: '@region_id',
      },
      {
        save: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
    regionAddChapter: $resource(
      extension + '/region/:region_id/add_chapter/:chapter_id',
      {
        region_id: '@region_id',
        chapter_id: '@chapter_id',
      },
      {
        update: {
          method: 'PUT',
          isArray: false,
        },
      }
    ),
    regionDeleteChapter: $resource(
      extension + '/region/:region_id/delete_chapter/:chapter_id',
      {
        region_id: '@region_id',
        chapter_id: '@chapter_id',
      },
      {
        remove: {
          method: 'POST',
          isArray: false,
        },
      }
    ),

    // chapter controller -------------------------------------------------------------------
    chapter: $resource(
      extension + '/chapter',
      {},
      {
        //			query: { method: 'GET'} // implied default GET retrieves all
      }
    ),
    // chapter: $resource(extension + '/chapter/:chapter_id',
    // 	{chapter_id: '@chapter_id'}, {
    // 		update: { method: 'PUT' }
    // 	}),
    // chapter: $resource(extension + '/chapter/:region_id',
    // 	{region_id: '@region_id'}, {
    // 		remove: { method: 'DELETE' }
    // 	}),
    chapterCreateMember: $resource(
      extension + '/chapter/:chapter_id/create_member',
      {
        chapter_id: '@chapter_id',
      },
      {
        save: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
    chapterRemoveMember: $resource(
      extension + '/chapter/:chapter_id/delete_member/:member_id',
      {
        member_id: '@member_id',
        chapter_id: '@chapter_id',
      },
      {
        remove: {
          method: 'DELETE',
          isArray: false,
        },
      }
    ),
    chapterUpdateMember: $resource(
      extension + '/chapter/:chapter_id/update_member/:member_id',
      {
        member_id: '@member_id',
        chapter_id: '@chapter_id',
      },
      {
        update: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
    createEvent: $resource(
      extension + '/chapter/:chapter_id/create_event',
      {
        chapter_id: '@chapter_id',
      },
      {
        save: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
    chapterAddEvent: $resource(
      extension + '/chapter/:chapter_id/add_event/:event_id',
      {
        event_id: '@event_id',
        chapter_id: '@chapter_id',
      },
      {
        update: {
          method: 'PUT',
          isArray: false,
        },
      }
    ),
    chapterRemoveEvent: $resource(
      extension + '/chapter/:chapter_id/delete_event/:event_id',
      {
        event_id: '@event_id',
        chapter_id: '@chapter_id',
      },
      {
        remove: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
    createItem: $resource(
      extension + '/chapter/:chapter_id/create_item',
      {
        chapter_id: '@chapter_id',
      },
      {
        save: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
    chapterAddItem: $resource(
      extension + '/chapter/:chapter_id/add_item/:item_id',
      {
        item_id: '@item_id',
        chapter_id: '@chapter_id',
      },
      {
        update: {
          method: 'PUT',
          isArray: false,
        },
      }
    ),
    chapterRemoveItem: $resource(
      extension + '/chapter/:chapter_id/delete_item/:item_id',
      {
        item_id: '@item_id',
        chapter_id: '@chapter_id',
      },
      {
        remove: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
    chapterUpdateItem: $resource(
      extension + '/chapter/:chapter_id/update_item/:member_id',
      {
        item_id: '@item_id',
        chapter_id: '@chapter_id',
      },
      {
        update: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
    // events controller -------------------------------------------------------------------
    // 		events: $resource(extension + '/events', {}, {
    // //			query: { method: 'GET'} // implied default GET retrieves all
    // 		}),
    events: $resource(
      extension + '/events/:event_id',
      {
        event_id: '@event_id',
      },
      {
        update: {
          method: 'PUT',
        },
      }
    ),
    getCurrentEvent: $resource(
      extension + '/events/:event_id',
      {
        event_id: '@event_id',
      },
      {
        query: {
          method: 'GET',
          isArray: false,
        }, // explicit default GET retrieves single
      }
    ),
    getMembersByEvent: $resource(
      extension + '/events/:event_id/members',
      {
        event_id: '@event_id',
      },
      {
        query: {
          method: 'GET',
          isArray: true,
        }, // explicit default GET retrieves single
      }
    ),
    addMemberToEvent: $resource(
      extension + '/events/:event_id/add_member/:member_id',
      {
        event_id: '@event_id',
        member_id: '@member_id',
      },
      {
        save: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
    dropMemberFromEvent: $resource(
      extension + '/events/:event_id/drop_member/:member_id',
      {
        event_id: '@event_id',
        member_id: '@member_id',
      },
      {
        remove: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
    reserveItemToEvent: $resource(
      extension + '/events/:event_id/reserve_item/:item_id',
      {
        item_id: '@item_id',
        event_id: '@event_id',
      },
      {
        save: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
    freeItemFromEvent: $resource(
      extension + '/events/:event_id/free_item/:item_id',
      {
        item_id: '@item_id',
        member_id: '@member_id',
      },
      {
        remove: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
    getVolunteersForEvent: $resource(
      extension + '/events/get_volunteers/:event_id',
      {
        event_id: '@event_id',
      },
      {
        query: {
          method: 'GET',
          isArray: true,
        },
      }
    ),
    getParticipantsForEvent: $resource(
      extension + '/events/get_participants/:event_id',
      {
        event_id: '@event_id',
      },
      {
        query: {
          method: 'GET',
          isArray: true,
        },
      }
    ),
    // item controller -------------------------------------------------------------------
    item: $resource(
      extension + '/item',
      {},
      {
        //			query: { method: 'GET' } // implied default GET retrieves all
      }
    ),
    //http://txcdt36an7383.itservices.sbc.com:1337/chapter/579a253cc780baa40b4653cf/items
    getChapterItems: $resource(
      extension + '/chapter/:chapter_id/items',
      {
        chapter_id: '@chapter_id',
      },
      {
        query: {
          method: 'GET',
          isArray: true,
        }, // implied default GET retrieves all
      }
    ),
    getEventItems: $resource(
      extension + '/events/:event_id/items',
      {
        chapter_id: '@event_id',
      },
      {
        query: {
          method: 'GET',
          isArray: true,
        }, // implied default GET retrieves all
      }
    ),
    // member controller -------------------------------------------------------------------
    member: $resource(
      extension + '/member',
      {},
      {
        //			query: { method: 'GET' }, // implied default GET retrieves all
        //			save: { method: 'POST', isArray: false }
      }
    ),
    // 		member: $resource(extension + '/member/:member_id', {member_id: '@member_id'}, {
    // //			update: { method: 'PUT' },
    // //			remove: { method: 'DELETE', isArray: false }
    // 		}),
    //		createLogin: $resource(extension + '/member/:member_id/create_login',
    //			{member_id: '@member_id'}, {
    //				save: { method: 'POST', isArray: false }
    //			}),
    retrieveLogin: $resource(
      extension + '/member/get_login/:member_id',
      {
        id: '@id',
      },
      {
        query: {
          method: 'GET',
        }, // explicit default GET retrieves single
      }
    ),
    updateLogin: $resource(
      extension + '/member/login/update/:member_id',
      {
        id: '@id',
      },
      {
        update: {
          method: 'PUT',
        },
      }
    ),
    memberUpdateChapter: $resource(
      extension +
        '/member/:member_id/change_chapter/:from_chapter_id/:to_chapter_id',
      {
        member_id: '@member_id',
        from_chapter_id: '@from_chapter_id',
        to_chapter_id: '@to_chapter_id',
      },
      {
        update: {
          method: 'PUT',
        },
      }
    ),

    // session controller
    session: $resource(
      extension + '/session/login',
      {},
      {
        query: {
          method: 'GET',
        }, // explicit default GET retrieves single
        save: {
          method: 'POST',
          isArray: false,
        },
      }
    ),
  };
});
