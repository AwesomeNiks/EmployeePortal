({
	generateChart : function(component, event, helper) {
		console.log('generateChart Controller - After Script..'); 
		//debugger;
		        helper.getPieInfoSuccess(component);
	},

	init : function(component, event, helper){
		console.log('data = ' , component.get("v.data"));
		console.log('data = ' , JSON.stringify(component.get("v.data")));
	}
})