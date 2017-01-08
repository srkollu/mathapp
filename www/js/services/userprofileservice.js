(function() {
  'use strict';

  angular
    .module('piApp')
    .factory('UserProfileService', UserProfileService);

  UserProfileService.$inject = ['$log', 'Restangular', 'CacheFactory'];

  function UserProfileService($log, Restangular, CacheFactory) {

      var service = {
          getBuilderProfile: getBuilderProfile,
          setBuilderProfile: setBuilderProfile,
          getUserProfile: getUserProfile,
          setUserProfile: setUserProfile,
          getRestApiBuilderPostService: getRestApiBuilderPostService,
          getRestApiBuilderPutService: getRestApiBuilderPutService
      };


      var dataCache;
      // Check to make sure the cache doesn't already exist
      if (!CacheFactory.get('userCache')) {
          dataCache = CacheFactory('userCache', {
              maxAge: 30 * 60 * 1000, //30 minutes
              deleteOnExpire: 'aggressive',
              //storageMode: 'memory' // This cache will use `localStorage`.
              storageMode: 'localStorage' // This cache will use `localStorage`.
          });
      }
      else {
          dataCache = CacheFactory('userCache');
      }

      // var service = Restangular.service("properties");

      // service.validateData = validateData;

      // service.getUserProfile = getUserProfile;

      // service.setUserProfile = setUserProfile;

      // service.getUserProp = getUserProp;

      var defaultUserProfile = {
          uuid : "572c8ac13004b8ea66e2d17b",
          builder: {
              builderId: "IN-4d8a-4abe-a102",
               name: "",
                phone: [123456789],
                address: {
                    line1: "",
                    unit: "APT 70",
                    line2: "",
                    city: "Hyderabad",
                    zip: "500001"
                },
                description: "hello there"
           }
       }

    return service;

    // Methods
   // function validateData(property) {
       //validate property data
    //};

    function getUserProfile() {
        var cache = dataCache.get('userProfile');
        if (cache) {
            return cache;
        }
        return null;
      //  return defaultUserProfile;
     // $log.debug("Fetching the individual property " + propertyId);
     // return Restangular.one('properties', propertyId).get();
    }

    function setUserProfile(profile) {
        if (profile !=null) {
            dataCache.put("userProfile", profile);
            if (profile.profile && profile.profile != null) {
                setBuilderProfile(profile.profile)
            }
           // if (JSON.stringify(profile.roles).indexOf("BUILDER") >= 0) {
           //     $log.debug("BUILDER from userprofile");
           //}

        }
        else {
            dataCache.remove("userProfile");
            dataCache.remove("builderProfile");
        }
        return profile;
    }

    function getBuilderProfile() {
        var cache = dataCache.get('builderProfile');
        if (cache) {
            return cache;
        }
       // IN-ad2d-49c3-a394
        //else if (getUserProfile() != null && JSON.stringify(getUserProfile().roles).indexOf("BUILDER") >=0)  {


       // }

       // }
        return null;
        //  return defaultUserProfile;
        // $log.debug("Fetching the individual property " + propertyId);
        // return Restangular.one('properties', propertyId).get();
    }

    function setBuilderProfile(profile) {
        if (profile != null) {
            dataCache.put("builderProfile", profile);
        }
        else {
            dataCache.remove("builderProfile");
        }
        return profile;
    }

    function getRestApiBuilderPostService() {
        return Restangular.service('builders');
    }

    function getRestApiBuilderPutService() {
        $log.debug("getUserProfile().builder.builderId", getBuilderProfile().builderId);
        var builderData = Restangular.one('builders', getBuilderProfile().builderId); //.restangularData.$object;
        return  Restangular.copy(builderData);


        /*
        var builderData = Restangular.one('builders', getUserProfile().builder.builderId);

        var datarequest = Restangular.copy(builderData);
        datarequest.QTCEmployees = "QTCEmployeesv1.0";
        datarequest.authToken = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MTUxMTcxNTYsInN1YiI6IjcwMTQ2OTFlLTY4OTItNDkwNy05ZTY5LWU5OTNlZWIyNWU3OCIsImlzcyI6Im1hcnMtbWFyc3RlY2gucmhjbG91ZC5jb20iLCJpYXQiOjE0MTI1MjE1NTZ9.Hh0fDQiMdcKoxqncQDU-619IqvNYMOXVqPMCFVI_eCk";
        datarequest.uuid = "572c8ac13004b8ea66e2d17b";

        return datarequest;
        */
        /*
      datarequest.request = reqest;
        $log.debug("put request", JSON.stringify(datarequest));
        datarequest.put().then(
            function (retobj) {
                $log.debug("retobj", retobj);
                $log.debug("Object saved OK");
            },
           function (err) {
               $log.debug("There was an error saving:", err);
           });
           */
    }



  }

})();
