
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
        

        for (var i = 0; i < rally.Stories.length; i++) {
            var story = rally.Stories[i];

            var options = {
                title: story.title,
                colors: ['#FF0000', '#FE642E', '#FE9A2E', '#FACC2E', '#3ADF00'],
                legend: { position: 'bottom' } 

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