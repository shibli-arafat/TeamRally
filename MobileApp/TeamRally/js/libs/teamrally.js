
var teamRallyNS = teamRallyNS || {};

teamRallyNS.Rally = function (mainTemplateContent, mainTemplateId,sprintSelectorId) {
    this.Sprints = new Array();
    this.Stories = new Array();
    this.MainTemplateId = mainTemplateId;
    this.MainTempalteContent = mainTemplateContent;
    this.SprintSelector = sprintSelectorId;
    
};


teamRallyNS.Rally.prototype = function () {
    var loadSprints = function () {
        var _self = this;

        //var converter = new teamRallyNS.FromRallyDataConverter();s
        $.ajax({
            url: "https://" + _credential + "@rally1.rallydev.com/slm/webservice/v2.0/Iteration?fetch=true",
            dataType: 'jsonp',
            jsonp: 'jsonp',
            async: false,
            success: function (data, textStatus, jqXHR) {
                toSprints(data);
            },
            error: function () {
                alert("Error Sprint");
                return null;
            }
        });
    };

     
    var toSprints = function (data) {
        var _self = this;
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
        rally.Sprints = sprints;
        bindSprints();
  };
   
    var bindSprints = function()
    {
        var _self = this;
       
        $("#sprintSelector").html(
         $("#SprintTemplate").render(rally.Sprints));
        $("#sprintSelector").val(rally.Sprints);
    };

    var loadTasks = function ()
    {
        var _self = this;
        var iterationId = $('#' + rally.SprintSelector).val();
        $.ajax({
            url: "https://" + _credential + "@rally1.rallydev.com/slm/webservice/v2.0/tasks?fetch=description,notes,taskindex,name,objectid,formattedid,owner,blocked,estimate,todo,actuals,state,status,qa,workproduct&query=(Iteration = /iteration/" + iterationId + ")&project=/project/16127913136&projectScopeUp=false&projectScopeDown=true&pagesize=1000",
            dataType: 'jsonp',
            jsonp: 'jsonp',
            async: false,
            success: function (data, textStatus, jqXHR) {
                toTasks(data);
            },
            error: function () {
                alert("Error Sprint");
                return null;
            }
        });

    };
    var toTasks = function (data) {
        var _self = this;
        var tasks = new Array();
        var stories = new Array();
        
        for (var i = 0; i < data.QueryResult.Results.length; i++) {
            
            var task = new Object();
            task.Name = data.QueryResult.Results[i].Name;
            task.Status = data.QueryResult.Results[i].c_Status.replace(/\s/g, '');
            console.log(task.Status);
            task.Description = data.QueryResult.Results[i].Description;
            if (data.QueryResult.Results[i].Owner != null)
                task.OwnerName = data.QueryResult.Results[i].Owner._refObjectName;
            else
                task.OwnerName = '';
            task.StoryName = data.QueryResult.Results[i].WorkProduct._refObjectName;
            task.StoryId = data.QueryResult.Results[i].WorkProduct.ObjectID;

            var result = $.grep(stories, function (e) { return e.Name == task.StoryName; });
            if (result.length > 0) {
                result[0].tasks.push(task);
                var prevVal = 0;
                if (!isNaN(result[0].TaskStausCounter[task.Status]))
                    prevVal = result[0].TaskStausCounter[task.Status];
                result[0].TaskStausCounter[task.Status] = prevVal + 1;
            }
            else {
                var story = new Object();
                story.Name = task.StoryName;
                story.tasks = new Array();
                story.tasks.push(task);
                story.TaskStausCounter = new Array();
                story.TaskStausCounter[task.Status] = 1;
                story.Id = task.StoryId;
                stories.push(story);
            }

            tasks.push(task);
        }
        rally.Stories = stories;
        rally.Tasks = tasks;
        bindStories();
    };
    var bindStories = function () {
        var self = this;
        $('#mainTemplateContent').html(
        $('#mainTemplate').render(rally.Stories));
        
        $("#hiddenButton").click();

    };

   

    // private method
    var bindView = function () {
        
        var _self = this;
        loadSprints();
      
        
    },
    drawChart = function () {
        var _self = this;
        

        for (var i = 0; i < rally.Stories.length; i++) {
            var story = rally.Stories[i];

            var options = {
                title: (i +1) + '. '+ story.Name,
                colors: ['#FF0000', '#FE642E', '#FE9A2E', '#FACC2E', '#3ADF00'],
                legend: { position: 'left', alignment: 'center' },
                chartArea: { left: 0,width:"100%", height: "75%" }

            };

           var chartData = [
      ['Task', 'Hours per Day'],
      ['Open', story.TaskStausCounter["Open"]],
      ['In-Progress', story.TaskStausCounter["In-Development"]],
      ['Review', story.TaskStausCounter["ReadyforReview"]],
      ['Test', story.TaskStausCounter["ReadyforTest"]],
      ['Completed', story.TaskStausCounter["Completed"]]];
            var chart = new google.visualization.PieChart(document.getElementById('chartId' + story.Id));
            var data = google.visualization.arrayToDataTable(chartData);

          

            chart.draw(data, options);
        }
    }


    //Public Members
    return {
        bindView: bindView,
        drawChart: drawChart,
        loadTasks: loadTasks,

    };
}();