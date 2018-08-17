import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { MovieList } from '../models/movie-list'; 
import { Movie } from '../models/movie'; 

const apiKey = '0e2ff32149f0c6d10bd2f2ff9643ee22';
const movieUrl = 'https://api.themoviedb.org/3/movie/';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) { }

 /* Get popular/upcoming or now playing movies depending on the list parameter */
  getMovies(list: string, newParams?: any ): Observable<MovieList> { 

     let queryParams = {}; 

     if(newParams) {
      queryParams = {
        params: new HttpParams()
          .set("page", newParams.page && newParams.page.toString() || '1')
      }
    }
  	return this.http.get(`${movieUrl}${list}?api_key=${apiKey}`, queryParams).map(res =>{
  		return new MovieList(res); 
  	})
  	
  }

}
