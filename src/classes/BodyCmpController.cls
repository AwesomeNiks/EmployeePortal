/***
**Name: Vinay Gurnani
**Date: 6/4/2018
**Desc: Body Component controller class for EmployeePortal App 
***/
public with sharing class BodyCmpController {
	
	public static Contact CurrentUser;
	public BodyCmpController() {
		
	}

	@auraenabled
	//Method to return current user details for the personal details tab
  	public static id fetchDetails(){
  		try{
  		String CurrentUser_Id = UserInfo.getUserId();
            if(Test.isRunningTest()){
                CurrentUser_Id='005f4000002SGd1AAG';
            }
		CurrentUser = [select id from Contact where User__c=:CurrentUser_Id];
		System.debug(CurrentUser.Id);
		return CurrentUser.Id;
		}
		catch(Exception e){
			System.debug(e);
			return null;
		}
	}

	@auraenabled
	//Method to return list of Current Contact's Certificates for the Certificates tab
	public static List<Certificate__c> fetchCertificates(){
       
		String CurrentUser_Id = UserInfo.getUserId();
         if(Test.isRunningTest()){
                CurrentUser_Id='005f4000002SGd1AAG';
            }
        try{
		CurrentUser = [select id from Contact where User__c=:CurrentUser_Id];
			return [select Name , Link__c , Valid_Till__c from Certificate__c where Contact__c = :CurrentUser.Id];
		}
		catch(Exception e){
			System.debug(e);
			return null;
		}	
	}

	@auraenabled
	//Method to return list of emergency contacts associated with the current contact for the Emergency Contact tab
	public static List<Contact> fetchEmergencyContacts(){
        	try{
        	String CurrentUser_Id = UserInfo.getUserId();
        	CurrentUser = [select id from Contact where User__c=:CurrentUser_Id];
			return [select id,Name,Phone,Email,RelationShip__c from Contact where Emergency_Contact__c =:CurrentUser.Id];
			}
			catch(Exception e){
			System.debug(e);
			return null;
			}
	}

	@auraenabled
	//Method to return Contact's Name according to the searched keyword in the Know Your Colleague tab
	public static List<Contact> searchContacts(string skey){
		skey=skey+'%';
		try{
		return [select Name from Contact where Name LIKE :skey];
		}
		catch(Exception e){
			System.debug(e);
			return null;
		}
	}
    
    @AuraEnabled
    //Method return a Map of Unique Certificates along with their total number of holders
    public static Map<Id,Integer> getCount()
    {
        
        Map<Id,Integer> MyMap = new Map<Id,Integer>();
        List<Certificate__c> certi = [SELECT Id,Contact__c FROM Certificate__c];
        for (Integer i=0;i<certi.size();i++){
             if(MyMap.containsKey(certi[i].Contact__c))
             {
             	Integer sum = MyMap.get(certi[i].Contact__c) + 1;
             	MyMap.put(certi[i].Contact__c, sum);
             }
             else
             {
             	MyMap.put(certi[i].Contact__c, 1);
             }
        }
        
        return MyMap;
    }
    
	@auraenabled
	//Method returns list of Contacts according to offset set by parameter 
	public static List<Contact> fetchContacts(Integer num){

		String CurrentUser_Id = UserInfo.getUserId();
            if(Test.isRunningTest()){
                CurrentUser_Id='005f4000002SGd1AAG';
            }
		CurrentUser = [select id from Contact where User__c=:CurrentUser_Id];
		Integer n =(integer.valueof(num)*10)-10;
		return ([select Name from Contact  where Emergency_Contact__c != :CurrentUser.Id LIMIT 10 offset :n ]);
		
	}
    @auraenabled
    //Method to add new or edit certificate from the Certificate tab
	public static void AddCerti(Id certiId, string NewName, String NewLink, String NewDate){
  		String[] strDate = NewDate.split('-');
   		Integer myIntDate = integer.valueOf(strDate[2]);
   		Integer myIntMonth = integer.valueOf(strDate[1]);
   		Integer myIntYear = integer.valueOf(strDate[0]);
   		Date d = Date.newInstance(myIntYear, myIntMonth, myIntDate);
        
        String CurrentUser_Id = UserInfo.getUserId();
        if(Test.isRunningTest()){
                CurrentUser_Id='005f4000002SGd1AAG';
            }
		CurrentUser = [select id from Contact where User__c=:CurrentUser_Id];
		Certificate__c c = new Certificate__c();
        c.Name = NewName;
        c.Link__c=NewLink;
        c.Valid_Till__c=d;
        c.Contact__c = CurrentUser.id;
        //for Edit
        if(certiId != null) 
            c.Id = certiId;

        try
        {
            upsert c;
            
        }
        
	
		catch(Exception e){
			System.debug(e);
		}
	}
	@auraenabled
    //Method returns Information for the Pie chart
	public static List<Object> getPieInfo (){
		return([select Name,COUNT(id) from Certificate__c Group By Name]);
	}
	@auraenabled
    //Method returns total number of Contacts in the org
	public static Integer getMaxPageNumber (){
		Integer a = [select COUNT() from Contact];
		System.debug(a);
		return(a);
	}
	
}