
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
    } 

    
    //Public Members
    return {
        bindView:bindView
    };
}();