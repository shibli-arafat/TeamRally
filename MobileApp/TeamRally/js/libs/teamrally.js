
var teamRallyNS = teamRallyNS || {};

teamRallyNS.Rally = function (mainTemplateContent, mainTemplateId) {
    this.Stories = new Array();
    this.MainTemplateId = mainTemplateId;
    this.MainTempalteContent = mainTemplateContent;

};


teamRallyNS.Rally.prototype = function () {
    var loadSprints = function () {
        //var converter = new teamRallyNS.FromRallyDataConverter();
        $.ajax({
            url: "https://" + _credential + "@rally1.rallydev.com/slm/webservice/v2.0/Iteration?fetch=true",
            dataType: 'jsonp',
            jsonp: 'jsonp',
            async: false,
            success: function (data, textStatus, jqXHR) {
                toSprints(data);
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
               
        bindSprints(sprints);
    };

    var bindSprints = function(sprints)
    {
        $("#sprintSelector").html(
         $("#SprintTemplate").render(sprints));
        };
    // private method
    var bindView = function () {
        var provider = new teamRallyNS.RallyDataProvider();
        var newsprints = loadSprints();       

        $("#" + this.MainTempalteContent).html(
        $("#" + this.MainTemplateId).render(this.Stories)
		);
    },

    drawChart = function () {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work', 11],
          ['Eat', 2],
          ['Commute', 2],
          ['Watch TV', 2],
          ['Sleep', 7]
        ]);

        var options = {
            title: 'My Daily Activities'
        };

        var allChartContent = $("div[id^='chartId']");

        for (var i = 0; i < allChartContent.length; i++) {
            var chart = new google.visualization.PieChart(document.getElementById(allChartContent[i].id));
            chart.draw(data, options);
        }
    }


    //Public Members
    return {
        bindView: bindView,
        drawChart: drawChart
    };
}();