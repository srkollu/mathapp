angular.module('piApp').controller('AppCtrl', ['$scope', '$log', 'UserProfileService', AppCtrl]);
function AppCtrl($scope, $log, UserProfileService) {
    // $scope.isAuthenticated = false;

    $scope.$on('$ionicView.enter', function (e) {
      
        $scope.getDaysAgo = function(timestamp) {
            var nowTime = (new Date()).getTime(), date = (new Date(timestamp)).getTime(), secs = Math.abs(nowTime - date) / 1000, days = Math.round(secs / (60 * 60 * 24));
            return days;
        }

    });

}