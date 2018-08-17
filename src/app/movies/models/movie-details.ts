export class MovieDetails {
	adult: boolean; 
	backdrop_path: string;
	belongs_to_collection: Object;
	budget: number; 
	genres: Object;
	homepage: string;
	id: number; 
	original_language: string; 
	original_title: number[]; 
	overview: string;
	popularity: number;
	poster_path: string; 
	production_companies: Object[]; 
	production_countries: Object[]; 
	release_date: string;
	revenue: number;
	runtime: number; 
	spoken_languages: Object[];
	status: string;
	tagline: string; 
	title: string; 
	video: boolean; 
	vote_average: number;
	vote_count: number;
	

	 constructor(obj?: any) {
   
    this.adult = obj && obj.adult || null;
    this.backdrop_path = obj && obj.backdrop_path || null;
    this.belongs_to_collection = obj &&  obj.belongs_to_collection || [];
    this.budget = obj && obj.budget || null;
    this.genres = obj && obj.genres || null;
    this.homepage = obj && obj.homepage || null;
    this.id = obj &&  obj.id || [];
    this.original_language = obj && obj.original_language || null;
    this.original_title = obj && obj.original_title || null;
    this.overview = obj && obj.overview || null;
    this.popularity = obj && obj.popularity || null;
    this.poster_path = obj &&  obj.poster_path || [];
    this.production_companies = obj && obj.production_companies || null;
    this.production_countries = obj && obj.production_countries || null;
    this.release_date = obj && obj.release_date || null;
    this.revenue = obj && obj.revenue || null;
    this.runtime = obj &&  obj.runtime || [];
    this.spoken_languages = obj && obj.spoken_languages || null;
    this.status = obj && obj.status || null;
    this.tagline = obj && obj.tagline || null;
    this.title = obj &&  obj.title || [];
    this.video = obj && obj.video || null;
    this.vote_average = obj && obj.vote_average || null;
    this.vote_count = obj && obj.vote_count || null;
    
    
  }
}