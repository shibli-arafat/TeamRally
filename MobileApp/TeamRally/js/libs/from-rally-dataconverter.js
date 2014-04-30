var teamRallyNS = teamRallyNS || {};

teamRallyNS.FromRallyDataConverter = function () {
};

teamRallyNS.FromRallyDataConverter.prototype = function () {
    var toStories = function (data) {
    };

    var toSprints = function (data) {
        var sprints = new Array();
        for (var i = 0; i < data.QueryResult.Results.length; i++) {
            var sprint = new Object();
            sprint.Name = data.QueryResult.Results[i].Name;
            sprint.Id = data.QueryResult.Results[i].ObjectID;
            sprint.Url = data.QueryResult.Results[i]._ref;
            sprint.StartDate = data.QueryResult.Results[i].StartDate;
            sprint.EndDate = data.QueryResult.Results[i].EndDate;
            sprints.push(sprint);
        }
        return sprints;
    };

    var toStory = function () {
    }

    var toTasks = function () {
    };

    var toTask = function () {
    };

    return {
        toStories: toStories,
        toSprints: toSprints
    };
}();