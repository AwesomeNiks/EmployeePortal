({
	//Init function to get default contact records and get Max page number
    myAction : function(component, event, helper) {
        var action = component.get("c.getMaxPageNumber");
       
        action.setCallback(this, function(response){
            console.log("MAX PAGE IS");
            console.log(response.getState());
            if(response.getState()==="SUCCESS"){
            console.log(response.getReturnValue());
            component.set("v.maxPageNumber", Math.ceil(response.getReturnValue()/10));
            console.log(component.get("v.maxPageNumber"));
            component.set("v.max",true);
            component.set("v.originalValue",Math.ceil(response.getReturnValue()/10));
            
            }
        });
        $A.enqueueAction(action);
        //Get contact Details
		helper.GetAllContacts(component);


	},
    //Shows records of first page
	firstPage: function(component, event, helper) {
        component.set("v.currentPageNumber", 1);
        if(component.get("v.isNotSearch"))
        helper.GetAllContacts(component);
        else
        helper.renderSearch(component);
    },
    //Shows records of previous page
    prevPage: function(component, event, helper) {
        component.set("v.currentPageNumber",Math.max(component.get("v.currentPageNumber")-1, 1));
        if(component.get("v.isNotSearch"))
        helper.GetAllContacts(component);
        else
        helper.renderSearch(component);

    },
    //Shows records of next page
    nextPage: function(component, event, helper) {
        component.set("v.currentPageNumber", Math.min(component.get("v.currentPageNumber")+1, component.get("v.maxPageNumber")));
    	if(component.get("v.isNotSearch"))
        helper.GetAllContacts(component);
        else
        helper.renderSearch(component);
    },
    //Shows records of last page
    lastPage: function(component, event, helper) {
        component.set("v.currentPageNumber", component.get("v.maxPageNumber"));
    	if(component.get("v.isNotSearch"))
        helper.GetAllContacts(component);
        else
        helper.renderSearch(component);
    },
    //Navigate to record detail page
    showContact : function(component,event,helper){
    	
    	var idx = event.currentTarget.id;
    	var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": idx,
          "slideDevName": "detail"
        });
        navEvt.fire();
    },
    //Find all contacts according to entered input in search bar
    searchKey: function(component, evt, helper){

    	var key = component.find("search").get("v.value");
    	
        if (key===""){
    		
    		component.set("v.togglePagi",false);
    		console.log("false");
     		component.set("v.currentPageNumber",1);
            component.set("v.maxPageNumber",component.get("v.originalValue"));
            component.set("v.isNotSearch",true);
    		helper.GetAllContacts(component);
    	}

    	else{
        var action = component.get("c.searchContacts");
        action.setParams({skey : key});
        action.setCallback(this, function(response){
            if(response.getState()==="SUCCESS"){
            component.set("v.currentPageNumber",1);
            component.set("v.isNotSearch",false);
            
            var a=response.getReturnValue();
            component.set("v.maxPageNumber",Math.ceil(a.length/10));
            component.set("v.All_Contact",response.getReturnValue());
            helper.GetAllCertificates(component);
            }
        });
        $A.enqueueAction(action);
        }
    }

})