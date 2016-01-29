angular.module('Angello.Storyboard').controller('StoryboardCtrl', function(StoriesModel, STORY_TYPES){
    var storyboard = this;
    storyboard.currentStory = null;
    storyboard.editedStory = {};
    storyboard.types = STORY_TYPES;

    storyboard.setCurrentStory = function(story){
        storyboard.currentStory = story;
        storyboard.editedStory = angular.copy(storyboard.currentStory);
    }
    storyboard.updateStory = function(){
        var fields = ['title', 'description', 'criteria',
            'status', 'type', 'reporter', 'assignee'];
        fields.forEach(function(field){
            storyboard.currentStory[field] = storyboard.editedStory[field];
        })
        storyboard.resetForm();
    };
    storyboard.resetForm = function(){
        storyboard.currentStory = null;
        storyboard.editedStory = {};

        storyboard.detailsForm.$setPristine();
        storyboard.detailsForm.$setUntouched();
    };

    function ID() {
      return '_'+Math.random().toString(36).substr(2,9);
    };

    storyboard.createStory = function(){
        var newStory = angular.copy(storyboard.editedStory);
        newStory.id = ID();

        storyboard.stories.push(newStory);
        storyboard.resetForm();
    };

    storyboard.getStories = function () {
        StoriesModel.all()
            .then(function (result) {
                storyboard.stories = (result !== 'null') ? result : {};
                //console.debug('RESULT', result);
            }, function (reason) {
                condole.log('REASON', reason);
            });
    };

    storyboard.deleteStory = function(storyId) {
        storyboard.stories.remove(function(story){
            return story.id == storyId;
        });
        storyboard.resetForm();
    }

    /*storyboard.stories = getStories();/*[
        {
            "assignee" : "1",
            "criteria": "It tests!",
            "description" : "This is a test",
            "id" : "1",
            "reporter" : "2",
            "status" : "To Do",
            "title" : "First Story",
            "type" : "Spike"
        },
        {
            "assignee" : "2",
            "criteria": "It works!",
            "description" : "testing something",
            "id" : "2",
            "reporter" : "1",
            "status" : "In Progress",
            "title" : "Second Story",
            "type" : "Enhancement"
        }
    ];*/
    storyboard.statuses = [
        {name: 'To Do'},
        {name: 'In Progress'},
        {name: 'Code Review'},
        {name: 'QA Review'},
        {name: 'Verified'}
    ];

    storyboard.getStories();
})

