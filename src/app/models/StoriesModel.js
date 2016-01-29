angular.module('Angello.Common')
    .service('StoriesModel', function ($http, EndpointConfigService, UtilsService) {
        var service = this,
            MODEL = "/stories/";

        service.all = function(){
            return $http.get(EndpointConfigService.getUrl(MODEL + EndpointConfigService.getCurrentFormat()))
                .then(
                    function(result){
                        return UtilsService.objectToArray(result);
                    }
                );
        };
    });