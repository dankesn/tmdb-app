export class Account {
	avatar: Object; 
	id: number;
	iso_639_1: boolean;
	iso_3166_1: string; 
	name: string;
	include_adult: boolean;
	username: string; 

	

	 constructor(obj?: any) {
   
    this.avatar = obj && obj.avatar || null;
    this.id = obj && obj.id || null;
    this.iso_639_1 = obj &&  obj.iso_639_1 || [];
    this.iso_3166_1 = obj && obj.iso_3166_1 || null;
    this.name = obj && obj.name || null;
    this.include_adult = obj && obj.include_adult || null;
    this.username = obj &&  obj.username || [];
 
    
    
  }
}