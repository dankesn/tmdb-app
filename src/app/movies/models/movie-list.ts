
import { Movie } from './movie'; 

export class MovieList {
	page: number; 
	total_results: number;
	total_pages: number;
	results: Movie[]; 
	

	 constructor(obj?: any) {
   
    this.page = obj && obj.page || null;
    this.total_results = obj && obj.total_results || null;
    this.total_pages = obj &&  obj.total_pages || [];
    this.results = obj && obj.results || null;
    
    
  }
}