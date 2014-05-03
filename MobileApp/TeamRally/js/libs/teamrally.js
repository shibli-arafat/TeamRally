
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
        sprints.reverse();
        bindSprints(sprints);

    };

    var bindSprints = function(sprints)
    {
        $("#sprintSelector").html(
         $("#SprintTemplate").render(sprints));
        };
    // private method
    var bindView = function () {
        loadSprints();
        $("#" + this.MainTempalteContent).html(
        $("#" + this.MainTemplateId).render(this.Stories)
		);
    },

    drawChart = function () {
//        var _self = this;
        

        for (var i = 0; i < rally.Stories.length; i++) {
            var story = rally.Stories[i];

            var options = {
                title: (i +1) + '. '+ story.title,
                colors: ['#FF0000', '#FE642E', '#FE9A2E', '#FACC2E', '#3ADF00'],
                legend: { position: 'left', alignment: 'center' },
                chartArea: { left: 0,width:"100%", height: "75%" }

            };

            var chart = new google.visualization.PieChart(document.getElementById('chartId' + story.id));
            var data = google.visualization.arrayToDataTable(story.Tasks);

          

            chart.draw(data, options);
        }
    }


    //Public Members
    return {
        bindView: bindView,
        drawChart: drawChart
    };
}();