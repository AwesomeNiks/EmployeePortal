({
	GetPersonalDetails : function(component) {
		var action = component.get("c.fetchDetails");
        action.setCallback(this, function(response){
        	console.log('Personal Details --->' + JSON.stringify(response));
            if(response.getState()==="SUCCESS"){
                component.set("v.CurrentContact",response.getReturnValue());
            }
            else
            	console.log("Error Fetching Data");
        });
        $A.enqueueAction(action);
	},
	GetCertificateDetails : function (component) {
		var action = component.get("c.fetchCertificates");
        action.setCallback(this, function(response){
        	console.log(response);
            if(response.getState()==="SUCCESS"){
                component.set("v.Current_Contact_Certificate",response.getReturnValue());
            }
            else
            	console.log("Error Fetching Data");
        });
        $A.enqueueAction(action);
	},
	GetEmergencyContacts : function (component) {
		var action = component.get("c.fetchEmergencyContacts");
        action.setCallback(this, function(response){
            if(response.getState()==="SUCCESS"){
                component.set("v.Current_Emergency_Contact",response.getReturnValue());
            }
            else
            	console.log("Error Fetching Data");
        });
        $A.enqueueAction(action);
	}
})