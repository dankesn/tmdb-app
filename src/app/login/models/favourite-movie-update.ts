
export class FavouriteMovieUpdate {
	status_code: number; 
	status_message: string;
	

	 constructor(obj?: any) {
   
    this.status_code = obj && obj.status_code || null;
    this.status_message = obj && obj.status_message || null;
     
    
  }
}