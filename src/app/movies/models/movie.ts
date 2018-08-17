
export class Movie {
	vote_count: number; 
	id: number;
	video: boolean;
	title: string; 
	popularity: number;
	poster_path: string;
	original_language: string; 
	original_title: string; 
	genre_ids: number[]; 
	backdrop_path: string;
	adult: boolean;
	overview: string; 
	release_date: string; 
	

	 constructor(obj?: any) {
   
    this.vote_count = obj && obj.vote_count || null;
    this.id = obj && obj.id || null;
    this.video = obj &&  obj.video || [];
    this.title = obj && obj.title || null;
    this.popularity = obj && obj.popularity || null;
    this.poster_path = obj && obj.poster_path || null;
    this.original_language = obj &&  obj.original_language || null;
    this.original_title = obj && obj.original_title || null;
    this.genre_ids = obj && obj.genre_ids || null;
    this.backdrop_path = obj && obj.backdrop_path || null;
    this.poster_path = obj && obj.poster_path || null;
    this.adult = obj &&  obj.adult || [];
    this.overview = obj && obj.overview || null;
    this.release_date = obj && obj.release_date || null;
    
    
  }
}