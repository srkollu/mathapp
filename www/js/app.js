// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('piApp', ['ionic', 'ngCordova',
        'angular-cache', 'restangular', 'satellizer'
    ])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
        });
    })
    .config(['$ionicConfigProvider', function ($ionicConfigProvider) {

        $ionicConfigProvider.scrolling.jsScrolling(false);

    }]);

angular.module('piApp').constant('LOG_ENABLE', {
    debug: true,
    info: true,
    log: false,
    error: true,
    warn: false
});



angular.module('piApp').config(function($logProvider, $provide, LOG_ENABLE) {

    $logProvider.debugEnabled(true); //LOG_ENABLE.debug is true then this will be be overrided in angular js log

    // console.log("LOG_ENABLE.log", LOG_ENABLE.log);

    $provide.decorator('$log', function($delegate) {
        //Original methods
        var origInfo = $delegate.info;
        var origLog = $delegate.log;
        var origWarn = $delegate.warn;
        var origDebug = $delegate.debug;
        var origError = $delegate.error;

        //Override the default behavior
        $delegate.info = function() {
            if (LOG_ENABLE.info)
                origInfo.apply(null, arguments)
        };

        //Override the default behavior
        $delegate.log = function() {
            if (LOG_ENABLE.log)
                origLog.apply(null, arguments)
        };

        //Override the default behavior
        $delegate.warn = function() {
            if (LOG_ENABLE.warn)
                origWarn.apply(null, arguments)
        };

        //Override the default behavior
        $delegate.debug = function() {
            if (LOG_ENABLE.debug) {
                // var args = [].slice.call(arguments);
                //args[0] = [new Date().toString("YYYY-MM-DDTHH:MM:SS"), ': ', args[0]].join('');
                $logProvider.debugEnabled(LOG_ENABLE.debug);
                // Send on our enhanced message to the original debug method.
                //origDebug.apply(null, args)
                origDebug.apply(null, arguments)
            }
        };

        //Override the default behavior
        $delegate.error = function() {
            if (LOG_ENABLE.error) {
                var args = [].slice.call(arguments);
                args[0] = [new Date().toString(), ': ', args[0]].join('');

                // Send on our enhanced message to the original debug method.
                origError.apply(null, args)
            }
        };

        return $delegate;
    });
});

angular.module('piApp').config(function(CacheFactoryProvider) {
    angular.extend(CacheFactoryProvider.defaults, {
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
});


