
var teamRallyNS = teamRallyNS || {};

teamRallyNS.Rally = function (mainTemplateContent,mainTemplateId) {
    this.Stories = new Array();
    this.MainTemplateId = mainTemplateId;
    this.MainTempalteContent = mainTemplateContent;

};


teamRallyNS.Rally.prototype = function () {
    
	// private method
    var bindView = function () {	
        $("#"+this.MainTempalteContent).html(
        $("#"+this.MainTemplateId).render(this.Stories)
		);
    },

    drawChart = function () {
//        var _self = this;
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
        

        for (var i = 0; i < rally.Stories.length; i++) {
            var chart = new google.visualization.PieChart(document.getElementById('chartId'+rally.Stories[i].id));
            chart.draw(data, options);
        }
    }

    
    //Public Members
    return {
        bindView: bindView,
        drawChart: drawChart
    };
}();