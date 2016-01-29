describe('StoryboardCtrl', function () {

    beforeEach(module('Angello.Storyboard'));


    beforeEach(inject(function($q, $controller){

        var StoriesModel = {
            all: function() {
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise;
            }
        };

        ctrl = $controller('StoryboardCtrl', {
            STORY_TYPES: {},
            StoriesModel: StoriesModel
        });

        ctrl.detailsForm = {
            $setPristine: function() {},
            $setUntouched: function() {}
        };

        ctrl.stories = [
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
        ];
    }));

    it('should reset the form', function(){
        ctrl.editedStory = ctrl.currentStory = {assignee: '1'};
        ctrl.resetForm ();

        expect(ctrl.currentStory).toBeNull();
        expect(ctrl.editedStory).toEqual({});
    });

    it('should delete a story', function(){
        var story = ctrl.stories[0];

        ctrl.deleteStory(story.id);

        expect(ctrl.stories).not.toContain(story);
    });

    //it('should be valid with populated fields', function(){
    //    ctrl.editedStory = {
    //      title: 'Title',
    //        status: 'To Do',
    //        type: 'Enhancement',
    //        reporter: 'Nikita Lyapin',
    //        assignee: 'Brian Ford'
    //    };
    //
    //    expect(ctrl.detailsForm.$valid).toBeTruthy();
    //})
} );