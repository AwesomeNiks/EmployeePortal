({
	get_Details : function(component, event, helper) {

        helper.GetPersonalDetails(component);

    	helper.GetCertificateDetails(component);

    	helper.GetEmergencyContacts(component);

    },
	handleShowModal: function(component, evt, helper) {
        var modalBody;
        
        $A.createComponent("c:modelContent", {},
           function(content, status) {
               if (status === "SUCCESS") {
                   modalBody = content;
                   
                   component.find('overlayLib').showCustomModal({
                       header: "Create a New Certification",
                       body: modalBody, 
                       
                       showCloseButton: true,
                       cssClass: "mymodal",
                       
                   });
                }                              
           });
    },
    searchKey: function(component, evt, helper){

    	var key = component.find("search").get("v.value");
    	if (key==""){
    		component.set("v.Search_Contact",null);	
    	}
    	else{
    	var action = component.get("c.searchContacts");
    	action.setParams( {skey : key} );
        action.setCallback(this, function(response){
            if(response.getState()==="SUCCESS"){
                component.set("v.Search_Contact",response.getReturnValue());
            }
            else
            	console.log("Error Fetching Data");
        });
        $A.enqueueAction(action);
      }
    },
    showContact: function(component, event, helper){
    	 var idx =  event.getSource.get("v.value").Id;
        console.log(idx);
        
    	var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": idx,
          "slideDevName": "details"
        });
        navEvt.fire();
    }
})