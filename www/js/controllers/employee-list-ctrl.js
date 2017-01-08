angular.module('piApp').controller('EmployeeListCtrl', ['$scope', '$state', '$log',
    'EmployeeProfileService',
    EmployeeListCtrl
]);

function EmployeeListCtrl($scope, $state, $log, 
    EmployeeProfileService
) {

   $scope.$on('$ionicView.enter', function(e) {
    $scope.employees = [];
        $log.debug("Entered the view");
        EmployeeProfileService.getEmployees()
            .then(function (data) {
                for (var i = 0; i< data.length; i++) {
                    $scope.employees[i] = {};
                    if (data[i].hiredOn && data[i].hiredOn != '')
                     $scope.employees[i].daysAgo = $scope.getDaysAgo(data[i].hiredOn);
                     $scope.employees[i].employeeId = data[i]._id;
                     $scope.employees[i].name = data[i].name;
                     $scope.employees[i].phone = data[i].phone;
                     $scope.employees[i].phoneAlt = data[i].phoneAlt;
                     $scope.employees[i].email = data[i].email;
                     $scope.employees[i].reportsTo = data[i].reportsTo;
                     $scope.employees[i].role = data[i].role;
                     $scope.employees[i].hiredOn = data[i].hiredOn;
                     if (data[i].expertize && data[i].expertize.length > 0) {
                         $scope.employees[i].expertize = [];
                         for (var j = 0; j < data[i].expertize.length; j++)
                             $scope.employees[i].expertize.push(data[i].expertize[j]);
                     }
                     if (data[i].applications && data[i].applications.length > 0) {
                         $scope.employees[i].applications = [];
                         for (var j = 0; j < data[i].applications.length; j++)
                             $scope.employees[i].applications.push(data[i].applications[j]);
                     }
                     $scope.employees[i].team = data[i].team;
                    console.log("profiles" +  $scope.employees[i]);
                }
               
            });
    });
}

