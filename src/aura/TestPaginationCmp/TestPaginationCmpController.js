({
	myAction : function(component, event, helper) {
		var action = component.get("c.fetchContacts");
		action.setStorable();
		console.log(component.get("v.Cpage"));
		action.setParams({num : component.get("v.Cpage")});
        action.setCallback(this, function(response){
            if(response.getState()==="SUCCESS"){
            	console.log(performance.now()-startTime);

             console.log("SUCCESS");
             var temp= component.get("v.All");
             var temp2=response.getReturnValue();    
             component.set("v.Display",temp2);
             temp.push(temp2);
             component.set("v.All",temp);
            // this.RenderPage(component);
            }
            else
            	console.log("error");
      });
       var startTime = performance.now();
     $A.enqueueAction(action);
     },

     nextPage : function(component,event,helper){
     	component.set("v.Cpage",component.get("v.Cpage")+1);
     	helper.RenderPage(component);
     },
    prevPage:function(component,event,helper){
     	component.set("v.Cpage",component.get("v.Cpage")-1);
     	helper.RenderPage(component);
     },
	
})