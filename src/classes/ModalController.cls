public class ModalController {
    @AuraEnabled
    public static List<Contact> fetchContcts(){
        List<Contact> contactList = new List<Contact>();
        contactList = [Select Id, Name, Email, Title, Phone From Contact Limit 5];
        return contactList;
    }
    public class lightningTableColumnWrapper{
        @AuraEnabled
        public  String label { get; set; }
        @AuraEnabled 
        public  String fieldName { get; set; }
        @AuraEnabled
        public String type { get; set; }
        @AuraEnabled
        public Boolean sortable { get; set; }
    }
    public class lightningTableDataWrapper{
        @AuraEnabled
        public Contact con { get; set; }
        @AuraEnabled
        public String accountName { get; set; }
    }
    
    public class lightningTableWrapper{
        @AuraEnabled
        public List<lightningTableColumnWrapper> tableColumnWrapper { get; set; }
        @AuraEnabled
        public List<lightningTableDataWrapper> tableDataWrapper { get; set; }
    }
}