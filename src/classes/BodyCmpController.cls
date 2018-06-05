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
  	public static Contact fetchDetails(){
  		try{
  		String CurrentUser_Name = UserInfo.getName();
		CurrentUser = [select 	id,
								Name,
								FirstName,
								LastName,
								Designation__c,
								Technology__c,
								Social_Media_Link__c,
								Interests__c 
								from Contact where Name=:CurrentUser_Name];
       
		return CurrentUser;
		}
		catch(Exception e){
			System.debug(e);
			return null;
		}
	}

	@auraenabled
	//Method to return list of Current Contact's Certificates for the Certificates tab
	public static List<Certificate__c> fetchCertificates(){
        try{
		String CurrentUser_Name = UserInfo.getName();
		CurrentUser = [select id from Contact where Name=:CurrentUser_Name];
			return [select Name , Link__c , Valid_Till__c from Certificate__c where Contact__r.id = :CurrentUser.id];
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
        	String CurrentUser_Name = UserInfo.getName();
        	CurrentUser = [select id from Contact where Name=:CurrentUser_Name];
			return [select Name,Phone,Email,RelationShip__c from Contact where Emergency_Contact__r.id =:CurrentUser.id];
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
		return [select Name,Id from Contact where Name LIKE :skey];
		}
		catch(Exception e){
			System.debug(e);
			return null;
		}
	}
    
    @auraenabled
    //Method to add new certificate from the Certificate tab
	public static void AddCerti(string NewName, String NewLink, String NewDate){
  		String[] strDate = NewDate.split('-');
   		Integer myIntDate = integer.valueOf(strDate[2]);
   		Integer myIntMonth = integer.valueOf(strDate[1]);
   		Integer myIntYear = integer.valueOf(strDate[0]);
   		Date d = Date.newInstance(myIntYear, myIntMonth, myIntDate);
        try{
        String CurrentUser_Name = UserInfo.getName();
        CurrentUser = [select id from Contact where Name=:CurrentUser_Name];
		Certificate__c c = new Certificate__c();
        c.Name = NewName;
        c.Link__c=NewLink;
        c.Valid_Till__c=d;
        c.Contact__c = CurrentUser.id;
        insert c;
		}
		catch(Exception e){
			System.debug(e);
		}
	}
}