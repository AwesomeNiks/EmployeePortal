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
    
    showContact: function(component, event, helper){
    	 var idx =  event.getSource().get("v.value").Id;
        console.log(idx);
        
    	var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": idx,
          "slideDevName": "detail"
        });
        navEvt.fire();
    },
    Delete_Emer_Contact : function(component, event, helper){
        console.log("Entering Delete Stage");
        var a =event.getSource().get("v.value");
        console.log(a);
		    component.set("v.DeleterecordId",event.getSource().get("v.value"));
        console.log(component.get("v.DeleterecordId"));
        component.set("v.ShowEmergencyCon",true);
        component.find("deleteRecorddetails").reloadRecord();
    },
    recordUpdated : function(component){
        component.find("deleteRecorddetails").deleteRecord($A.getCallback(function(deleteResult){
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
                var resultsToast = $A.get("e.force:showToast");
           		 resultsToast.setParams({
                			"title": "Deleted",
                			"message": "The record was deleted."
            	});
           		 resultsToast.fire();
                console.log("Record is deleted.");
                component.set("v.Count_Emer","v.Count_Emer.length-1");
            }
        }))
        $A.get('e.force:refreshView').fire();
    },

    setAttributeValue: function(component,event){
      console.log('event handled');
      console.log(event);
      var eventValue= event.getParam('attributeValue');
      console.log(eventValue);  
        component.set("v.maxPage", eventValue);
    },
     edit : function(component, event, helper) {
            var a =event.getSource().get("v.value");
            var cname = component.get("v.Current_Contact_Certificate");
            console.log(a);
            console.log("CNAME : " + cname[a].Name);
            var modalBody;
            $A.createComponent("c:modelContent", {"certiId":cname[a].Id,"certiName":cname[a].Name, "certiLink":cname[a].Link__c, "certiValid":cname[a].Valid_Till__c},
               function(content, status) {
                   if (status === "SUCCESS") {
                       modalBody = content;
                       component.find('overlayLib').showCustomModal({
                           header: "Application Confirmation",
                           body: modalBody, 
                           showCloseButton: true,
                           cssClass: "mymodal",
                           
                       })
                       
                   }                               
               });

            }
    
})
