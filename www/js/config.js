angular.module("piApp")
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/layout/menu-layout.html',
                controller: 'AppCtrl'
            })
             .state('app.employee', {
                 url: '/employee/:employeeId',
                 views: {
                     'menuContent': {
                         templateUrl: 'templates/provider/employeeprofile.html',
                         controller: 'EmployeeProfileCtrl'

                     }
                 }
             })
            .state('app.employeelist', {
                url: '/employeelist',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/provider/employeelist.html',
                        controller: 'EmployeeListCtrl'
                    }
                }
            })
        .state('app.support', {
            url: '/support',
            views: {
                'menuContent': {
                    templateUrl: 'templates/support/support.html'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise(function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("app.employeelist");
        });
    });
