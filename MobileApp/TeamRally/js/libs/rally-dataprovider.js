var teamRallyNS = teamRallyNS || {};

teamRallyNS.RallyDataProvider = function () {
};

teamRallyNS.RallyDataProvider.prototype = function (sprintNo) {
    var loadStories = function () {
        var converter = new teamRallyNS.FromRallyDataConverter();
        $.ajax({
            url: "https://" + _credential + "@rally1.rallydev.com/slm/webservice/v2.0/HierarchicalRequirement?query=(iteration.Name=\"" + sprintNo + "\")&fetch=true",
            dataType: 'jsonp',
            jsonp: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                return converter.toStories(data);
            },
            error: function () {
                alert("Error");
                return null;
            }
        });
    };

    var loadSprints = function () {
        //var converter = new teamRallyNS.FromRallyDataConverter();
        $.ajax({
            url: "https://" + _credential + "@rally1.rallydev.com/slm/webservice/v2.0/Iteration?fetch=true",
            dataType: 'jsonp',
            jsonp: 'jsonp',
            async: false,
            success: function (data, textStatus, jqXHR) {
                return toSprints(data);
            },
            error: function () {
                alert("Error");
                return null;
            }
        });
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


    return {
        loadSprints: loadSprints,
        loadStories: loadStories
    };
}();

