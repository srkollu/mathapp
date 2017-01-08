angular.module('piApp').controller('EmployeeProfileCtrl', ['$scope', '$state',
    '$stateParams', '$log', 'EmployeeProfileService', '$ionicPopup', '$ionicHistory', EmployeeProfileCtrl
]);

function EmployeeProfileCtrl($scope, $state, $stateParams, $log, EmployeeProfileService, $ionicPopup, $ionicHistory) {

    //$log.debug("$state.current.name:", $state.current.name);

    // $scope.profile = EmployeeProfileService.getEmployeeProfile();
    $scope.$on('$ionicView.enter', function (e) {
        $log.debug("Employee Profile Ctrl");
    $scope.profile = {};
    $scope.profile.employeeId = '';
    $scope.profile.name = '';
    $scope.profile.phone = '';
    $scope.profile.phoneAlt = '';
    $scope.profile.email = '';
    $scope.profile.reportsTo = '';
    $scope.profile.role = '';
    $scope.profile.applications = [];
    $scope.profile.hiredOn = new Date();
    $scope.profile.team = '';
    $scope.filters = {};
    $scope.filters["Expertize"] = [];

    $scope.allExpertize = ["C#", "Java", "JavaScript", "MongoDB", "Oracle SQL", "T-SQL"];

    $scope.allApplications = ["KMEP", "eProcess", "Tracking Tool", "EMS", "IDA", "CAATS"];

     EmployeeProfileService.getEmployeeProfile($stateParams.employeeId).then(function (data) {
         $scope.profile.employeeId = data._id;
         $scope.profile.name = data.name;
         $scope.profile.phone = data.phone;
         $scope.profile.phoneAlt = data.phoneAlt;
         $scope.profile.email = data.email;
         $scope.profile.reportsTo = data.reportsTo;
         $scope.profile.role = data.role;
             for (var k = 0; k < $scope.allExpertize.length; k++) {
                 var lov = {};
                 lov.name = $scope.allExpertize[k];
                 lov.value = false;
                 if (data.expertize && data.expertize.length) {
                     for (l = 0; l < data.expertize.length; l++) {
                         if (data.expertize[l] == lov.name) { lov.value = true; break; }
                     }
                 }
                 $scope.filters["Expertize"].push(lov);
         }

         $scope.profile.team = data.team;
         $scope.profile.hiredOn = new Date(data.hiredOn);
         console.log("profiles" + $scope.profile);
     });
    });

    $scope.showPopupLovs = function (featitem) {
        $scope.featitem = featitem;
        $scope.temp = JSON.parse(JSON.stringify($scope.filters[featitem]));
        // An elaborate, custom popup
        console.log("init list:", $scope.temp);
        var myPopup = $ionicPopup.show({
            templateUrl: 'templates/filter/lovs.html',
            title: featitem.label,
            //   subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [{
                text: 'Cancel',
                type: 'button-small button-calm',
                onTap: function (e) {
                 
                    for (var i = 0; i < $scope.temp.length; i++) {
                        for (var j = 0; j < $scope.filters[featitem].length; j++) {
                            if ($scope.temp[i].name == $scope.filters[featitem][j].name) {
                                $scope.filters[featitem][j].value = $scope.temp[i].value;
                            }
                        }
                    }
                 
                }
            }, {
                text: 'Apply',
                type: ' button-small button-calm',
                onTap: function (e) {

                }
            }]
        });
    }

    $scope.goBack = function () {
        $state.go('app.employeelist', {}, {
            reload: true
        });
    }


    $scope.deleteItem = function () {
        if ($scope.profile.employeeId != null && $scope.profile.employeeId != "") {
            var datarequest = EmployeeProfileService.getRestApiEmployeePutService($scope.profile.employeeId);
            datarequest.remove().then(
                      function (retObj) {
                          //save in the store
                          //EmployeeProfileService.setEmployeeProfile(retObj);
                          $log.debug("Object deleted Ok");
                          $state.go('app.employeelist', {}, {
                              reload: true
                          });
                      },
                     function (err) {
                         $log.debug("There was an error deleting:", err);
                     });
            $state.go('app.employeelist', {}, {
                reload: true
            });
        }
    }

    $scope.submitmyform = function () {
        $log.debug("Object:", request);
        if ($scope.profile.employeeId != null && $scope.profile.employeeId != "") {
           // request.employeeId = $scope.profile.employeeId;
          var datarequest = EmployeeProfileService.getRestApiEmployeePutService($scope.profile.employeeId);
          //  datarequest = $scope.addEmployeesHeadersPut(datarequest, request);
          datarequest.employeeId = $scope.profile.employeeId;
          datarequest.name = $scope.profile.name;
          datarequest.phone = $scope.profile.phone;
          datarequest.phoneAlt = $scope.profile.phoneAlt;
          datarequest.email = $scope.profile.email;
          datarequest.reportsTo = $scope.profile.reportsTo;
          datarequest.hiredOn = $scope.profile.hiredOn;
          datarequest.role = $scope.profile.role;
          datarequest.team = $scope.profile.team;
          datarequest.expertize = [];
          for (var j = 0; j < $scope.filters["Expertize"].length; j++) {
              if ($scope.filters["Expertize"][j].value == true) {
                  datarequest.expertize.push($scope.filters["Expertize"][j].name)
              }
          }
          datarequest.applications = $scope.profile.applications;
          datarequest.team = $scope.profile.team;
               $log.debug("put request", JSON.stringify(datarequest));
                datarequest.put().then(
                    function (retObj) {
                        //save in the store
                        EmployeeProfileService.setEmployeeProfile(retObj);
                     
                        $log.debug("Object saved OK");
                        $state.go('app.employeelist', {}, {
                            reload: true
                        });
                    },
                   function (err) {
                       $log.debug("There was an error saving:", err);
                   });
        }
      else {
          var request = {};
          request.employeeId = $scope.profile.employeeId;
          request.name = $scope.profile.name;
          request.phone = $scope.profile.phone;
          request.phoneAlt = $scope.profile.phoneAlt;
          request.email = $scope.profile.email;
          request.reportsTo = $scope.profile.reportsTo;
          request.role = $scope.profile.role;
          request.expertize = [];
          request.applications = $scope.profile.applications;
          request.hiredOn = $scope.profile.hiredOn;
          request.team = $scope.profile.team;

          for (var j = 0; j < $scope.filters["Expertize"].length; j++) {
              if ($scope.filters["Expertize"][j].value == true) {
                  request.expertize.push($scope.filters["Expertize"][j].name)
              }
          }

          $log.debug("post request", JSON.stringify(request));

            EmployeeProfileService.getRestApiEmployeePostService().post(request).then(function (retObj) {
                $log.debug("retobj", retObj);
                    EmployeeProfileService.setEmployeeProfile(retObj);
                    $log.debug("Object saved OK");
                    $state.go('app.employeelist', {}, {
                        reload: true
                    });
            },

                function (err) {
                    $log.debug("There was an error saving:", err);
                });
        }
   };
};