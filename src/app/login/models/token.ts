export class Token {
	success: boolean; 
	expires_at: string;
	request_token: string;

	 constructor(obj?: any) {
   
    this.success = obj && obj.success || null;
    this.expires_at = obj && obj.expires_at || null;
    this.request_token = obj &&  obj.request_token || null;
    
    
  }
}