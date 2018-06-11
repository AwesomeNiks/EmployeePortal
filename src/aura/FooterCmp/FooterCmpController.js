({
	//Get Current Year
	myAction : function(component, event, helper) {
		var a = new Date();
		var d= a.getFullYear()
		component.set("v.year",d);
	}
})