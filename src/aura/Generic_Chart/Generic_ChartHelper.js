({
	getPieInfoSuccess : function(component) {
				console.log("Entering Chart");
				var colors=['#FF6384','#1F3976','#36A2EB','#99B641','#bed2ce','#0abc70','#f5b022','#e85e7f','#41B67F'];
				console.log('data available : ' + JSON.stringify(component.get("v.data")));
				var object = component.get("v.data");
             	console.log(object);
             	var objName=[];
             	var objCount=[];
             	for (var i in object){
             		objName.push(object[i].Name);
             		objCount.push(object[i].expr0)
             	}
             	var end = objName.length;
             	colors.slice(0,end);
            	var chartdata = {
            						labels: objName,
            						datasets: [
                							{
               								    label:'Certificate',
                    							data: objCount,
                    							backgroundColor: colors ,
                    							borderColor:'#000000',
                    							fill: false,
							                    pointBackgroundColor: "#FFFFFF",
							                	pointBorderWidth: 1,
							                	pointHoverRadius: 1,
							                	pointRadius: 1,
							                	bezierCurve: true,
							                	pointHitRadius: 2
                							}
           									 ]
        						}
        		var ctx = component.find("chart").getElement();
        		var allChart = new Chart(ctx ,{
            										type: component.get("v.type"),
            										data: chartdata,

            								options: {	
                										legend: {
												                    position: 'bottom',
												                    padding: 2,
                												},
                										responsive: true
            										 }
												})
	}
})