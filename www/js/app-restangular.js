angular.module('piApp').config(function(RestangularProvider) {

  //set the base url for api calls on our RESTful services
  var newBaseUrl = "";
  if (window.location.hostname == "localhost") {
    newBaseUrl = "http://localhost:9000/api";
  } else {
    var deployedAt = window.location.href.substring(0, window.location.href);
    newBaseUrl = deployedAt + "/api";
  }

  newBaseUrl = "http://localhost:8080/api";
  RestangularProvider.setBaseUrl(newBaseUrl);

  RestangularProvider.addResponseInterceptor(function (json, operation, what,
      url, response, deferred) {
   //  console.log("Rest API Server Data: " + JSON.stringify(json));
      var newResponse;
      // .. to look for getList operations
      if (operation === "getList") {
          newResponse = json;
      } else if (operation === "one") {
          // .. and handle the data and meta data
          newResponse = json.plain();
      } else {
          newResponse = json;
      }
      return newResponse;
  });

    
    RestangularProvider.addFullRequestInterceptor(function(element, operation,
      what, url, headers, params, httpConfig) {
        console.log("url:", url);
        console.log("params:", params);
        return element;
  });

});
