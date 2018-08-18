export class Session {
	success: boolean; 
	session_id: string;
	

	 constructor(obj?: any) {
   
    this.success = obj && obj.success || null;
    this.session_id = obj && obj.session_id || null;
     
    
  }
}