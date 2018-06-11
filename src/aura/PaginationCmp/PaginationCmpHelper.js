({
	//Get All certificate count
    GetAllCertificates : function(component){
        var action = component.get("c.getCount");
        action.setStorable();
        action.setCallback(this, function(response){
            if(response.getState()==="SUCCESS"){
                var temp = JSON.stringify(component.get("v.All_Contact"));
                var colleague = JSON.parse(temp);
                var certificates = response.getReturnValue();
                console.log(certificates);
                var custs = [];
                for (var i in colleague ){
                    
                    if (certificates.hasOwnProperty(colleague[i].Id)){
                        custs.push({Name: colleague[i].Name,Id: colleague[i].Id,count: certificates[colleague[i].Id]});
                    }
                    else
                        custs.push({Name: colleague[i].Name,Id: colleague[i].Id ,count: 0});
                    
                }
                var a = component.find("max");
                console.log("certificates sec");
                console.log(performance.now()-startTime);
	            if(!component.get("v.isNotSearch")){
                    component.set("v.currentList", custs);
                    this.renderSearch(component);	
                }
                else
                     component.set("v.displayList", custs);
            }
        });
        var startTime = performance.now();
        $A.enqueueAction(action);
    },
    //Get all contact name and id
    GetAllContacts : function(component){
        var action = component.get("c.fetchContacts");
        action.setStorable();
        action.setParams({num : component.get("v.currentPageNumber")});
        action.setCallback(this, function(response){
            if(response.getState()==="SUCCESS"){
              
             component.set("v.All_Contact",response.getReturnValue());
             console.log("Contact sec"); 
             console.log(performance.now()-startTime1);
             this.GetAllCertificates(component);  
         }

    });
        var startTime1 = performance.now();
     $A.enqueueAction(action);
     },
    //Show records of searched key according to page number 
    renderSearch:function(component){
        var records = component.get("v.currentList");
        var pageNumber = component.get("v.currentPageNumber");
        var pageRecords = records.slice((pageNumber-1)*10, pageNumber*10);
        component.set("v.displayList", pageRecords);
     }
})