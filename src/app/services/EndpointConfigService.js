angular.module('Angello.Common')
    .constant('CURRENT_BACKEND', 'firebase')
    .service('EndpointConfigService', function($rootScope, CURRENT_BACKEND){
       var service = this,
           endpointMap = {
             firebase: {URI: 'https://angello2.firebaseio.com', root: 'stories', format: '.json'}
           },
           currentEndpoint = endpointMap[CURRENT_BACKEND],
           userId = null,
           backend = CURRENT_BACKEND;

        service.getUrl = function(model){
            return currentEndpoint.URI /*+ currentEndpoint.root + userId*/ + model;
        };

        service.getUrlForId = function(model, id){
            return service.getUrl(model) + id + currentEndpoint.format;
        };

        service.getCurrentBackEnd = function () {
            return backend;
        };

        service.getCurrentFormat = function(){
            return currentEndpoint.format;
        };

        service.getCurrentURI = function(){
            return currentEndpoint.URI;
        };

        $rootScope.$on('onCurrentUserId', function(event, id){
            userId = id;
        });
    });

