var myModule = angular.module('Angello', [
    "ngRoute",
    'Angello.Common',
    'Angello.Dashboard',
    'Angello.Storyboard',
    'Angello.User',
    'ngAnimate',
    'ngMessages',
    'Angello.Login',
    'auth0'
]);
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
});
myModule.factory('loadingInterceptor', function(LoadingService){
    var loadingInterceptor = {
        request: function(config){
            LoadingService.setLoading(true);
            return config;
        },
        response: function(response){
            LoadingService.setLoading(false);
            return response;
        }
    };
    return loadingInterceptor;
});
myModule.factory('AngelloModel', function () {
});
myModule.factory('AngelloCtrl', function () {
});
myModule.factory('story', function () {
});
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
});

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
});
myModule.directive('story', function () {
    return {
        scope: true,
        replace: true,
        template: '<div><h4>{{story.title}}</h4><p>{{story.description}}</p>'
    }
});
myModule.run(function($rootScope, LoadingService){
    $rootScope.$on('$rootChangeStart', function(e, curr, prev){
        LoadingService.setLoading(true);
    });
    $rootScope.$on('$rootChangeSuccess', function(e, curr, prev){
        LoadingService.setLoading(false);
    });
});

myModule.config(function($routeProvider, $httpProvider, $provide){

    $httpProvider.interceptors.push('loadingInterceptor');
    $routeProvider.when('/login',{
            templateUrl: 'src/login/tmpl/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .when('/',{
            templateUrl: 'src/storyboard/tmpl/storyboard.html'
        })
        .when('/users',{
            templateUrl: 'src/user/tmpl/users.html',
            controller: 'UsersCtrl',
            controllerAs: 'users'
        })
        .when('/users/:userId',{
            templateUrl: 'src/user/tmpl/user.html',
            controller: 'UserCtrl',
            controllerAs: 'myUser',
            resolve: {
                user: function ($route, $routeParams, UsersModel) {
                    var userId = $route.current.params['userId']
                        ? $route.current.params['userId']
                        : $routeParams['userId'];
                    return UsersModel.fetch(userId);
                },
                stories: function ($rootScope, StoriesModel) {
                    return StoriesModel.all();
                }
            }
        })
        .when('/dashboard',{
            templateUrl: 'src/dashboard/tmpl/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard'
        })
        .otherwise({redirectTo: '/'})
});

myModule.value('STORY_TYPES', [
    {name: 'Feature'},
    {name: 'Enhancement'},
    {name: 'Bug'},
    {name: 'Spike'}
]);

myModule.value('STORY_STATUSES', [
    {name: 'To Do'},
    {name: 'In Progress'},
    {name: 'Code Review'},
    {name: 'QA Review'},
    {name: 'Verified'}
]);