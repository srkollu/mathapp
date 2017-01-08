var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('datetimepicker', function ($rootScope, $state, $ionicPopup, $cordovaDatePicker, $timeout, $translate) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            selectedDateTime: '=datetime',
            mode: '='
        },
        link: function (scope) {

            scope.selectDateTime = function () {

                if (!scope.selectedDateTime) {
                    scope.selectedDateTime = new Date();
                }

                var options = {
                    date: scope.selectedDateTime,
                    mode: scope.mode
                };

                /***
				*
				* Make sure that the user's browser/device can use the datepicker functionality
				*
				***/

                if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/gi)) {

                    $cordovaDatePicker.show(options).then(function (date) {
                        $timeout(function () {
                            scope.selectedDateTime = date;
                        }, 50);
                    }, function (err) {
                        alert(err);
                    });

                } else if (ionic.Platform.platform() === 'windowsphone') {


                    // $cordova datepicker doesn't support wp8 
                    // so we'll use https://github.com/michaelfranz89/cordova-plugin-datepicker for this instead

                    // If we are getting date & time, we need to do them separately.
                    // First of all, get the date
                    if (scope.mode === 'datetime') {
                        options.mode = 'date';
                    }

                    datePicker.show(options, function (date) {

                        if (scope.mode === 'datetime') {
                            // If we are getting date & time, we now need to get the time and then combine the 2 values together
                            datePicker.show({
                                mode: 'time',
                                date: scope.selectedDateTime
                            }, function (time) {
                                // Create a new date with year, month and date from the date variable and hours, minutes and seconds from the time variable
                                $timeout(function () {
                                    scope.selectedDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
                                }, 50);
                            });
                        } else {
                            // If we're only getting the date OR time, send the value back
                            $timeout(function () {
                                scope.selectedDateTime = date;
                            }, 50);
                        }

                    });

                } else {

                    $translate(['directives.datepicker.DATEPICKER_ERROR_TITLE', 'directives.datepicker.DATEPICKER_ERROR'])
						.then(function (translations) {

						    $ionicPopup.alert({
						        title: translations['directives.datepicker.DATEPICKER_ERROR_TITLE'],
						        template: translations['directives.datepicker.DATEPICKER_ERROR']
						    });

						});

                }

            };

        },
        template: '<button type="button" class="button button-icon icon ion-ios-calendar-outline" ng-click="selectDateTime()"></button>'
    }
});