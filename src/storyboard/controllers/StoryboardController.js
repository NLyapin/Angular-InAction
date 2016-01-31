angular.module('Angello.Storyboard').controller('StoryboardCtrl', function($scope, StoriesModel, STORY_TYPES){
    var storyboard = this;
    storyboard.currentStory = null;
    storyboard.editedStory = {};
    storyboard.types = STORY_TYPES;

    storyboard.setCurrentStory = function(story){
        storyboard.currentStory = story;
        storyboard.currentStoryId = story.id;
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

    //storyboard.deleteStory = function(storyId) {
    //    storyboard.stories.remove(function(story){
    //        return story.id == storyId;
    //    });
    //    storyboard.resetForm();
    //}

    storyboard.createStory = function () {
        StoriesModel.create(storyboard.editedStory)
            .then(function (result) {
                storyboard.getStories();
                storyboard.resetForm();
                //$log.debug('RESULT', result);
            }, function (reason) {
                //$log.debug('ERROR', reason);
            });
    };

    storyboard.updateStory = function () {
        var fields = ['title', 'description', 'criteria', 'status', 'type', 'reporter', 'assignee'];

        fields.forEach(function (field) {
            storyboard.currentStory[field] = storyboard.editedStory[field]
        });

        StoriesModel.update(storyboard.currentStoryId, storyboard.editedStory)
            .then(function (result) {
                storyboard.getStories();
                storyboard.resetForm();
                //$log.debug('RESULT', result);
            }, function (reason) {
                //$log.debug('REASON', reason);
            });
    };
    storyboard.isEmptyStatus = function (status) {
        var empty = true;
        if (storyboard.stories) {
            storyboard.stories.forEach(function (story) {
                if (story.status === status) empty = false;
            });
        }

        return empty;
    };

    storyboard.insertAdjacent = function (target, story, insertBefore) {
        if (target === story) return;

        var fromIdx = storyboard.stories.indexOf(story);
        var toIdx = storyboard.stories.indexOf(target);

        if (!insertBefore) toIdx++;

        if (fromIdx >= 0 && toIdx >= 0) {
            storyboard.stories.splice(fromIdx, 1);

            if (toIdx >= fromIdx) toIdx--;

            storyboard.stories.splice(toIdx, 0, story);

            story.status = target.status;
        }
    };

    storyboard.finalizeDrop = function (story) {
        StoriesModel.update(story.id, story)
            .then(function (result) {
                console.log('RESULT', result);
                //$log.debug('RESULT', result);
            }, function (reason) {
                //$log.debug('REASON', reason);
                console.log('REASON', reason);
            });
    };

    storyboard.changeStatus = function (story, status) {
        story.status = status.name;
    };

    storyboard.statuses = [
        {name: 'To Do'},
        {name: 'In Progress'},
        {name: 'Code Review'},
        {name: 'QA Review'},
        {name: 'Verified'}
    ];

    storyboard.getStories();

    $scope.$on('storyDeleted', function () {
        storyboard.getStories();
        storyboard.resetForm();
    });
})

