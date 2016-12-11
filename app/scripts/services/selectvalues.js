/*jslint browser: true, devel: true, bitwise: true, eqeq: true, plusplus: true, vars: true, indent: 4*/
/*global angular, $, console, swal*/

/**
 * @ngdoc service
 * @name ohanaApp.selectValues
 * @description
 * # selectValues
 * Service in the ohanaApp.
 */
angular.module('ohanaApp')
    .service('selectValues', function() {
        'use strict';
        var selectValues = this;

        selectValues.regions = [{
            value: "northeast",
            text: "Northeast (NJ, NY, PA, ME, MA)"
        }, {
            value: "midatlantic",
            text: "Mid-Atlantic (MD, VA, NC)"
        }, {
            value: "midwest",
            text: "Midwest (IN, NE, AR, IA, KS, IL, MN, WI, MO, TN)",
        }, {
            value: "southeast",
            text: "Southeast (FL, GA, SC, AL)"
        }, {
            value: "southwest",
            text: "Southwest (OK, TX, LA)"
        }, {
            value: "west",
            text: "West (AZ, CA, OR, WA, UT, HI)"
        }];

        selectValues.chapters = [{
            "region": "northeast",
            "name": "New Jersey",
            "hq": " Howell, NJ",
            "contact": "Vicki Gordon",
            "email": "NJ@heroesonthewater.org"
        }, {
            "region": "northeast",
            "name": "Long Island/NYC",
            "hq": " Remsenburg, NY",
            "contact": "Jerry Collins",
            "email": "LongIslandNYC@heroesonthewater.org"
        }, {
            "region": "northeast",
            "name": "Central Pennsylvania",
            "hq": " York, PA",
            "contact": "Adam Gagne",
            "email": "CentralPA@HeroesOnTheWater.org"
        }, {
            "region": "northeast",
            "name": "Western Pennsylvania",
            "hq": " Jeannette, PA",
            "contact": "Jim Evans",
            "email": "WesternPA@HeroesOnTheWater.org"
        }, {
            "region": "northeast",
            "name": "Southern Maine",
            "hq": " Brunswick, ME",
            "contact": "Peter Chart",
            "email": "SouthernMaine@HeroesOnTheWater.org"
        }, {
            "region": "northeast",
            "name": "Boston Massachusetts",
            "hq": " Westwood, MA 02090",
            "contact": "Anna Katzman",
            "email": "BostonMA@heroesonthewater.org"
        }, {
            "region": "midatlantic",
            "name": "Maryland",
            "hq": " Mount Airy, MD",
            "contact": "Keith Umberger or Jim Cooper",
            "email": "Maryland@heroesonthewater.org"
        }, {
            "region": "midatlantic",
            "name": "Combined Forces",
            "hq": " Fuquay-Varina, NC",
            "contact": "Ollie Hughes",
            "email": "CombinedForces@HeroesOnTheWater.org"
        }, {
            "region": "midatlantic",
            "name": "Foothills North Carolina",
            "hq": " Kings Mountain, NC 28086",
            "contact": "Matt Frazier",
            "email": "FoothillsNC@HeroesOnTheWater.org"
        }, {
            "region": "midatlantic",
            "name": "George Washington",
            "hq": " Arlington, VA",
            "contact": "Karl Schwartz",
            "email": "GeorgeWashingtonDC@heroesonthewater.org"
        }, {
            "region": "midatlantic",
            "name": "Tidewater",
            "hq": " Virginia Beach, VA",
            "contact": "Tom VanderHeiden",
            "email": "Tidewater@HeroesOnTheWater.org"
        }, {
            "region": "midwest",
            "name": "Northwest Arkansas",
            "hq": " Fayetteville, AR 72701",
            "contact": "Jimmy Davis",
            "email": "Nwarkansas@heroesonthewater.org"
        }, {
            "region": "midwest",
            "name": "River Valley Arkansas",
            "hq": " Fort Smith, AR",
            "contact": "Brandon Taylor",
            "email": "RiverValleyAR@heroesonthewater.org"
        }, {
            "region": "midwest",
            "name": "Indiana",
            "hq": " Seymour, IN",
            "contact": "Dustin Kelly",
            "email": "Indiana@HeroesOnTheWater.org"
        }, {
            "region": "midwest",
            "name": "Heartland",
            "hq": " St. Paul, NE",
            "contact": "Adam Dresden",
            "email": "HeartlandChapter@HeroesOnTheWater.org"
        }, {
            "region": "midwest",
            "name": "Eastern Nebraska",
            "hq": " Papillion, NE 68133",
            "contact": "",
            "email": "EasternNE@HeroesOnTheWater.org"
        }, {
            "region": "midwest",
            "name": "Central Iowa",
            "hq": " Grimes, IA 50111",
            "contact": "",
            "email": "CentralIA@HeroesOnTheWater.org"
        }, {
            "region": "midwest",
            "name": "Kansas",
            "hq": " Topeka, KS",
            "contact": "Lyle Babcock",
            "email": "KansasChapter@HeroesOnTheWater.org"
        }, {
            "region": "midwest",
            "name": "Chicagoland Illinois",
            "hq": " Chicago, IL 60661",
            "contact": "Gary Rosenberg",
            "email": "ChicagolandIL@HeroesOnTheWater.org"
        }, {
            "region": "midwest",
            "name": "Twin Cities Minnesota",
            "hq": " Osseo, MN 55369",
            "contact": "",
            "email": "TwinCitiesMN@heroesonthewater.org"
        }, {
            "region": "midwest",
            "name": "South Central Wisconsin",
            "hq": " Madison, WI",
            "contact": "Adam Howarth",
            "email": "SouthCentralWI@HeroesOnTheWater.org"
        }, {
            "region": "midwest",
            "name": "Southeastern Wisconsin",
            "hq": " Milwaukee, WI 53215",
            "contact": "Jason Bartol",
            "email": "SoutheasternWI@HeroesOnTheWater.org"
        }, {
            "region": "midwest",
            "name": "Southwest Missouri",
            "hq": " Branson, MO",
            "contact": "Dorman Hugey",
            "email": "southwestmissouri@heroesonthewater.org"
        }, {
            "region": "midwest",
            "name": "Music City Tennessee",
            "hq": " Nashville, TN",
            "contact": "CJ Scott",
            "email": "MusicCityTN@heroesonthewater.org"
        }, {
            "region": "southeast",
            "name": "Emerald Coast",
            "hq": " Pensacola, FL",
            "contact": "Frank Dailey",
            "email": "EmeraldCoast@HeroesOnTheWater.org"
        }, {
            "region": "southeast",
            "name": "Northeast Florida",
            "hq": " Jacksonville, FL",
            "contact": "Melita Ganoe",
            "email": "NortheastFlorida@HeroesOnTheWater.org"
        }, {
            "region": "southeast",
            "name": "Central Florida",
            "hq": " Kissimmee, FL",
            "contact": "Andres Rosario",
            "email": "CentralFL@HeroesOnTheWater.org"
        }, {
            "region": "southeast",
            "name": "Key West Florida",
            "hq": " Key West, FL",
            "contact": "",
            "email": "KeyWestFL@HeroesOnTheWater.org"
        }, {
            "region": "southeast",
            "name": "Panama City Florida",
            "hq": " Panama City, FL 32404",
            "contact": "Randle Hay ",
            "email": "PanamaCityFL@HeroesOnTheWater.org"
        }, {
            "region": "southeast",
            "name": "Sarasota-Bradenton",
            "hq": " Sarasota, FL",
            "contact": "Raul Casas ",
            "email": "Sarasota@HeroesOnTheWater.org"
        }, {
            "region": "southeast",
            "name": "South Florida",
            "hq": " Ft. Lauderdale, FL",
            "contact": "Ryan Bancroft & Sam De La Torre",
            "email": "SouthFlorida@HeroesOnTheWater.org"
        }, {
            "region": "southeast",
            "name": "Southwest Florida",
            "hq": " Ft. Myers, FL",
            "contact": "Esteban 'Blackbeard' Gutierrez",
            "email": "SWFlorida@HeroesOnTheWater.org"
        }, {
            "region": "southeast",
            "name": "Space Coast",
            "hq": " Space Coast, FL",
            "contact": "Vinnie Bellisario",
            "email": "SpaceCoastFL@HeroesOnTheWater.org"
        }, {
            "region": "southeast",
            "name": "Tampa Bay Florida",
            "hq": " Tampa Bay, FL",
            "contact": "Joel Sussman",
            "email": "TampaBayFL@HeroesOnTheWater.org"
        }, {
            "region": "southeast",
            "name": "Treasure Coast",
            "hq": " Jensen Beach, FL",
            "contact": "Matt Landry",
            "email": "TreasureCoastFL@HeroesOnTheWater.org"
        }, {
            "region": "southeast",
            "name": "South Alabama",
            "hq": " Mobile, AL 36507",
            "contact": "",
            "email": "SouthAL@heroesonthewater.org"
        }, {
            "region": "southeast",
            "name": "Coastal Georgia",
            "hq": " Richmond Hill, GA",
            "contact": "Corky Fleming",
            "email": "CoastalGeorgia@HeroesOnTheWater.org"
        }, {
            "region": "southeast",
            "name": "Lowcountry South Carolina",
            "hq": " Charleston, SC",
            "contact": "Darrell Olson",
            "email": "LowCountry.SC@HeoresOnTheWater.org"
        }, {
            "region": "southwest",
            "name": "Northeast Oklahoma",
            "hq": " Tulsa, OK",
            "contact": "Rusty Helms",
            "email": "NEOkla@HeroesOnTheWater.org"
        }, {
            "region": "southwest",
            "name": "Austin Texas",
            "hq": " Austin, TX",
            "contact": "MAJ Erik Fuentes",
            "email": "Austintexas@hereosonthewater.org"
        }, {
            "region": "southwest",
            "name": "BAMC",
            "hq": " San Antonio, TX",
            "contact": "Brandon Walden",
            "email": "BAMC@HeroesOnTheWater.org"
        }, {
            "region": "southwest",
            "name": "Coastal Bend",
            "hq": " Corpus Christi, TX",
            "contact": "Travis Matthews",
            "email": "CoastalBend@HeroesOnTheWater.org"
        }, {
            "region": "southwest",
            "name": "DFW Chapter",
            "hq": " Dallas, TX",
            "contact": "George Chrisman or Dave Potts",
            "email": "DFWChapter@HeroesOnTheWater.org"
        }, {
            "region": "southwest",
            "name": "East Texas",
            "hq": " Longview, TX",
            "contact": "Katie Baker",
            "email": "EastTexasChapter@HeroesOnTheWater.org"
        }, {
            "region": "southwest",
            "name": "Ft. Hood Texas",
            "hq": " Ft. Hood, TX 76544",
            "contact": "Greg Sterley",
            "email": "Ft.HoodTX@HeroesOnTheWater.org"
        }, {
            "region": "southwest",
            "name": "Rio Grande Valley",
            "hq": " Harlingen, TX",
            "contact": "Rudy Castaneda",
            "email": "Riograndevalleytx@heroesonthewater.org"
        }, {
            "region": "southwest",
            "name": "San Antonio",
            "hq": " San Antonio, TX",
            "contact": "Bill Stroud",
            "email": "SanAntonio@HeroesOnTheWater.org"
        }, {
            "region": "southwest",
            "name": "Southeast Texas",
            "hq": " Houston, TX",
            "contact": "Josh Arnold",
            "email": "SoutheastTexas@HeroesOnTheWater.org"
        }, {
            "region": "southwest",
            "name": "Louisiana",
            "hq": " Mandeveille, LA",
            "contact": "Paul Tullier",
            "email": "LA@heroesonthewater.org"
        }, {
            "region": "southwest",
            "name": "Southwest Louisiana",
            "hq": " DeRidder, LA",
            "contact": "Josh Droddy",
            "email": "SouthwestLouisiana@heroesonthewater.org"
        }, {
            "region": "west",
            "name": "Arizona",
            "hq": " Phoenix, AZ",
            "contact": "David Jacques",
            "email": "Arizona@heroesonthewater.org"
        }, {
            "region": "west",
            "name": "Northern California",
            "hq": " San Francisco, CA",
            "contact": "Rob Knoles",
            "email": "NorCal@heroesonthewater.org"
        }, {
            "region": "west",
            "name": "Southern California",
            "hq": " San Diego, CA",
            "contact": "Michael Weist",
            "email": "SoCal@heroesonthewater.org"
        }, {
            "region": "west",
            "name": "Central California",
            "hq": " Vandenberg Air Force Base, CA",
            "contact": "Ron Skala",
            "email": "CentralCA@heroesonthewater.org"
        }, {
            "region": "west",
            "name": "Shasta California",
            "hq": " Shasta, CA",
            "contact": "Bryan Rusk",
            "email": "ShastaCA@heroesonthewater.org"
        }, {
            "region": "west",
            "name": "Portland",
            "hq": " Portland, OR 97201",
            "contact": "Anthony Stickel",
            "email": "Portland@HeroesOnTheWater.org"
        }, {
            "region": "west",
            "name": "Northwest Washington",
            "hq": " Seattle, WA",
            "contact": "Dino Abulencia",
            "email": "Nwest@HeroesOnTheWater.org"
        }, {
            "region": "west",
            "name": "Northern Utah",
            "hq": " Salt Lake City, UT 84101",
            "contact": "Randy Baker",
            "email": "NorthernUT@HeroesOnTheWater.org"
        }, {
            "region": "west",
            "name": "Maui Hawaii",
            "hq": " Maui, HI 96708",
            "contact": "Boo Baldovi",
            "email": "MauiHI@HeroesOnTheWater.org"
        }];

        selectValues.showChaptersByRegion = function(regionName) {
            var arr = [];
            var i;
            for (i = 0; i < selectValues.chapters.length; i++) {
                if (selectValues.chapters[i].region == regionName) {
                    arr.push({
                        value: selectValues.chapters[i].name
                    });
                }
            }
            return arr;
        };

        selectValues.roles = [{
            value: "volunteer",
            text: "Volunteer"
        }, {
            value: "event_manager",
            text: "Event Manager"
        }, {
            value: "chapter_manager",
            text: "Chapter Manager"
        }, {
            value: "region_manager",
            text: "Region Manager"
        }, {
            value: "admin",
            text: "Administrator"
        }];

        selectValues.editChapters = [{
            "value": "579b8e5ec6f3ed9a69f3a7ca", // ok
            "text": "New Jersey"
        }, {
            "value": "579b8ec4c6f3ed9a69f3a7cb", // no
            "text": "Long Island/NYC"
        }, {
            "value": "579bad846782cfbe6b11b729",
            "text": "Central Pennsylvania"
        }, {
            "value": "579badbc6782cfbe6b11b72a",
            "text": "Western Pennsylvania"
        }, {
            "value": "579badf46782cfbe6b11b72b",
            "text": "Southern Maine"
        }, {
            "value": "579bae246782cfbe6b11b72c",
            "text": "Boston Massachusetts"
        }, {
            "value": "579bb25b6782cfbe6b11b72d",
            "text": "Maryland"
        }, {
            "value": "Combined Forces",
            "text": "Combined Forces"
        }, {
            "value": "Foothills North Carolina",
            "text": "Foothills North Carolina"
        }, {
            "value": "George Washington",
            "text": "George Washington"
        }, {
            "value": "Tidewater",
            "text": "Tidewater"
        }, {
            "value": "Northwest Arkansas",
            "text": "Northwest Arkansas"
        }, {
            "value": "River Valley Arkansas",
            "text": "River Valley Arkansas"
        }, {
            "value": "Indiana",
            "text": "Indiana"
        }, {
            "value": "Heartland",
            "text": "Heartland"
        }, {
            "value": "Eastern Nebraska",
            "text": "Eastern Nebraska"
        }, {
            "value": "Central Iowa",
            "text": "Central Iowa"
        }, {
            "value": "Kansas",
            "text": "Kansas"
        }, {
            "value": "Chicagoland Illinois",
            "text": "Chicagoland Illinois"
        }, {
            "value": "Twin Cities Minnesota",
            "text": "Twin Cities Minnesota"
        }, {
            "value": "South Central Wisconsin",
            "text": "South Central Wisconsin"
        }, {
            "value": "Southeastern Wisconsin",
            "text": "Southeastern Wisconsin"
        }, {
            "value": "Southwest Missouri",
            "text": "Southwest Missouri"
        }, {
            "value": "Music City Tennessee",
            "text": "Music City Tennessee"
        }, {
            "value": "Emerald Coast",
            "text": "Emerald Coast"
        }, {
            "value": "Northeast Florida",
            "text": "Northeast Florida"
        }, {
            "value": "Central Florida",
            "text": "Central Florida"
        }, {
            "value": "Key West Florida",
            "text": "Key West Florida"
        }, {
            "value": "Panama City Florida",
            "text": "Panama City Florida"
        }, {
            "value": "Sarasota-Bradenton",
            "text": "Sarasota-Bradenton"
        }, {
            "value": "South Florida",
            "text": "South Florida"
        }, {
            "value": "Southwest Florida",
            "text": "Southwest Florida"
        }, {
            "value": "Space Coast",
            "text": "Space Coast"
        }, {
            "value": "Tampa Bay Florida",
            "text": "Tampa Bay Florida"
        }, {
            "value": "Treasure Coast",
            "text": "Treasure Coast"
        }, {
            "value": "South Alabama",
            "text": "South Alabama"
        }, {
            "value": "Coastal Georgia",
            "text": "Coastal Georgia"
        }, {
            "value": "Lowcountry South Carolina",
            "text": "Lowcountry South Carolina"
        }, {
            "value": "Northeast Oklahoma",
            "text": "Northeast Oklahoma"
        }, {
            "value": "Austin Texas",
            "text": "Austin Texas"
        }, {
            "value": "BAMC",
            "text": "BAMC"
        }, {
            "value": "Coastal Bend",
            "text": "Coastal Bend"
        }, {
            "value": "DFW Chapter",
            "text": "DFW Chapter"
        }, {
            "value": "East Texas",
            "text": "East Texas"
        }, {
            "value": "Ft. Hood Texas",
            "text": "Ft. Hood Texas"
        }, {
            "value": "Rio Grande Valley",
            "text": "Rio Grande Valley"
        }, {
            "value": "San Antonio",
            "text": "San Antonio"
        }, {
            "value": "Southeast Texas",
            "text": "Southeast Texas"
        }, {
            "value": "Louisiana",
            "text": "Louisiana"
        }, {
            "value": "Southwest Louisiana",
            "text": "Southwest Louisiana"
        }, {
            "value": "Arizona",
            "text": "Arizona"
        }, {
            "value": "Northern California",
            "text": "Northern California"
        }, {
            "value": "Southern California",
            "text": "Southern California"
        }, {
            "value": "Central California",
            "text": "Central California"
        }, {
            "value": "Shasta California",
            "text": "Shasta California"
        }, {
            "value": "Portland",
            "text": "Portland"
        }, {
            "value": "Northwest Washington",
            "text": "Northwest Washington"
        }, {
            "value": "Northern Utah",
            "text": "Northern Utah"
        }, {
            "value": "Maui Hawaii",
            "text": "Maui Hawaii"
        }];
    });
