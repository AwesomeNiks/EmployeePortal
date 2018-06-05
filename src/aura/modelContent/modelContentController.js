({
    
    AddCertificate : function(component, event, helper){
		var Name = component.find("Certificate_Name").get("v.value");
        var Link = component.find("Certificate_Link").get("v.value");
        var Valid = component.find("Certificate_Date").get("v.value");
        var action = component.get("c.AddCerti");
        action.setParams({NewName : Name, NewLink : Link, NewDate : Valid});
        action.setCallback(this, function(response){
            debugger;
            if(response.getState()==="SUCCESS"){

                 console.log('SUCCESS');
               $A.get('e.force:refreshView').fire();
                component.find("overlayLib").notifyClose();
            }
            else
            	console.log("Error Fetching Data");
        });
        $A.enqueueAction(action);
       //$A.get('e.force:refreshView').fire();
       
	}
})