({
	myAction : function(component, event, helper) {
		helper.GetAllContacts(component);


	},
	 firstPage: function(component, event, helper) {
	 	console.log("clicked first page");
        component.set("v.currentPageNumber", 1);
        helper.renderPage(component);
    },
    prevPage: function(component, event, helper) {
    		 	console.log("clicked prev page");

        component.set("v.currentPageNumber", Math.max(component.get("v.currentPageNumber")-1, 1));
        helper.renderPage(component);
    },
    nextPage: function(component, event, helper) {
        component.set("v.currentPageNumber", Math.min(component.get("v.currentPageNumber")+1, component.get("v.maxPageNumber")));
    	helper.renderPage(component);
    },
    lastPage: function(component, event, helper) {
        component.set("v.currentPageNumber", component.get("v.maxPageNumber"));
    	helper.renderPage(component);
    },
    renderPage: function(component, event, helper) {
      
        helper.renderPage(component);
    
    },
    showContact : function(component,event,helper){
    	 //var idx =  event.getSource().get("v.value").Id;
    	 var idx = event.currentTarget.id;
    	// console.log(event.getSource().get("v.value"));
        console.log(idx);
    	var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": idx,
          "slideDevName": "detail"
        });
        navEvt.fire();
    },
    searchKey: function(component, evt, helper){

    	var key = component.find("search").get("v.value");
    	if (key===""){
    		component.set("v.Search_Contact",null);	
    		component.set("v.togglePagi",false);
    		console.log("false");
    		var setEvent = component.getEvent("setAttribute");
       	 	setEvent.setParams({"attributeValue":component.get("v.originalValue")});
       		console.log(setEvent);
       		console.log("Event Fired");
     		setEvent.fire();
     		component.set("v.currentPageNumber",1);
    		helper.renderPage(component);
    	}
    	else{
    	var AllList = component.get("v.All_Certi");
    	var searchList = [];
    	
    	console.log(AllList);
    	
    	for (var i in AllList){
    		if(AllList[i].Name.toLowerCase().startsWith(key) )
    			searchList.push(AllList[i]);
    	}
    	console.log(searchList);
    	component.set("v.currentList",searchList);
    	component.set("v.togglePagi",true)
    	component.set("v.currentPageNumber",1);
    	var setEvent = component.getEvent("setAttribute");
        setEvent.setParams({"attributeValue":Math.floor((searchList.length+4)/5)});
       	console.log(setEvent);
       	console.log("Event Fired");
     	setEvent.fire();
	    helper.renderPage(component);
    	
      }
    }

})