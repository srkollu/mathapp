(function() {
  'use strict';

  angular
    .module('piApp')
    .factory('EmployeeProfileService', EmployeeProfileService);

  EmployeeProfileService.$inject = ['$q', '$log', 'Restangular', 'CacheFactory'];

  function EmployeeProfileService($q, $log, Restangular, CacheFactory) {

      var service = {
          getEmployees: getEmployees,
          getEmployeeProfile: getEmployeeProfile,
          setEmployeeProfile: setEmployeeProfile,
          getRestApiEmployeePostService: getRestApiEmployeePostService,
          getRestApiEmployeePutService: getRestApiEmployeePutService
      };

      var dataCache;
      // Check to make sure the cache doesn't already exist
      if (!CacheFactory.get('employeeCache')) {
          dataCache = CacheFactory('employeeCache', {
              maxAge: 30 * 60 * 1000, //30 minutes
              deleteOnExpire: 'aggressive',
              storageMode: 'localStorage' // This cache will use `localStorage`.
          });
      }
      else {
          dataCache = CacheFactory('employeeCache');
      }

      var defaultEmployeeProfile = {
          name: "sree",
          phone: "123456789",
          email: "s@s.com",
          reportsTo: "Terry",
          role: "devoloper",
          expertize: "javascript",
          areas: ["KMEP", "eProcess"]
      }
      return service;

      function getEmployees() {
          var params = {};
          var deferred = $q.defer();
          Restangular.service('employees').getList(params).then(function (result) {
              deferred.resolve(result);
          },
            function (err) {
                $log.error("Failed to get employees list" + err);
                deferred.resolve([]);
            });
          return deferred.promise;
      }

      function getEmployeeProfile(employeeId) {
          var cache = dataCache.get("" + employeeId);
          if (cache) {
              return cache;
          }
          return Restangular.one('employees', employeeId).get();
         // return null;
      }

      function setEmployeeProfile(profile) {
          if (profile != null) {
              dataCache.put("" + profile.employeeId, profile);
          }
         // else {
         //     dataCache.remove("employeeProfile");
         // }
          return profile;
      }

      function getRestApiEmployeePostService() {
          return Restangular.service('employees');
      }

      function getRestApiEmployeePutService(employeeId) {
        //  $log.debug("getUserProfile().employee.employeeId", getEmployeeProfile().employeeId);
        //  var employeeData = Restangular.one('employees', getEmployeeProfile().employeeId); //.restangularData.$object;
          //  return Restangular.copy(employeeData);
          return Restangular.one('employees', employeeId);
      }
  }
})();
