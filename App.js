var myModule = angular.module('Angello', [
    "ngRoute"
])
myModule.factory('AngelloHelper', function () {
    var buildIndex = function (source, property) {
        var tempArray = [];
        for (var i = 0, len = source.length; i < len; ++i) {
            tempArray[source[i][property]] = source[i];
        }
        return tempArray;
    }
    return {
        buildIndex: buildIndex
    }
})
myModule.factory('AngelloModel', function () {
})
myModule.factory('AngelloCtrl', function () {
})
myModule.factory('story', function () {
})
myModule.service('AngelloModel', function () {
    var service = this,
        stories = [
            {
                title: 'FirstStory',
                description: "Our first story",
                criteria: 'Criteria pending',
                status: 'To Do',
                type: 'Feature',
                reporter: 'Lukas Reubbelke',
                assigne: 'Brian Ford'
            },
            {
                title: 'SecondStory',
                description: "Our secod story",
                criteria: 'Criteria pending',
                status: 'To Do',
                type: 'Feature',
                reporter: 'Lukas Reubbelke',
                assigne: 'Brian Ford'
            }
        ];
    service.getStories = function () {

        return stories;
    }
})

myModule.controller('MainCtrl', function (AngelloModel) {
    var main = this;
    main.title = 'Title';
    main.stories = AngelloModel.getStories();
    main.createStory = function () {
        main.stories.push(
            {
                title: 'New Story',
                description: 'Description pending.',
                criteria: 'Criteria pending.',
                status: 'Back Log',
                type: 'Feature',
                reporter: 'Pending',
                assignee: 'Pending'
            }
        )
    }
})
myModule.directive('story', function () {
    return {
        scope: true,
        replace: true,
        template: '<div><h4>{{story.title}}</h4><p>{{story.description}}</p>'
    }
})

myModule.config(function($routeProvider, $httpProvider, $provide){
$routeProvider.when('/login',{
        templateUrl: 'login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
    })
    .when('/',{
        templateUrl: 'phone-list.html',
    })
    .otherwise({redirectTo: '/'})
})