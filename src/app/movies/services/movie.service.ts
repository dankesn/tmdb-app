import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { MovieList } from '../models/movie-list'; 
import { Movie } from '../models/movie'; 
import { MovieDetails } from '../models/movie-details'; 

const apiKey = '0e2ff32149f0c6d10bd2f2ff9643ee22';
const baseUrl = 'https://api.themoviedb.org/3/';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) { }

 /* Get popular/upcoming or now-playing movies depending on the list parameter */
  getMovies(list: string, params?: any ): Observable<MovieList> { 

     let queryParams = {}; 

     if(params) {
      queryParams = {
        params: new HttpParams()
          .set("page", params.page && params.page.toString() || '1')
      }
    }
  	return this.http.get(`${baseUrl}movie/${list}?api_key=${apiKey}`, queryParams).map(res =>{
  		return new MovieList(res); 
  	})
  	
  }

  searchMovies(searchString:string, params?:any): Observable<MovieList> {

        let queryParams = {}; 

     if(params) {
      queryParams = {
        params: new HttpParams()
          .set("page", params.page && params.page.toString() || '1')
      }
    }
    return this.http.get(`${baseUrl}search/movie?api_key=${apiKey}&language=en-US&query=${searchString}`, queryParams).map(res =>{
      return new MovieList(res); 
    })
  }


  getMovieDetails(movieId): Observable<MovieDetails> {
    return this.http.get(`${baseUrl}movie/${movieId}?api_key=${apiKey}`).map(res =>{
      return new MovieDetails(res);
    })

  }
  

  getMovieRecommendation(movieId): Observable<MovieList> {
    return this.http.get(`${baseUrl}movie/${movieId}/recommendations?api_key=${apiKey}`).map(res =>{
      return new MovieList(res);
    })

  }

  getFavouriteMovies(params?: any): Observable<MovieList> {

     let queryParams = {}; 

     if(params) {
      queryParams = {
        params: new HttpParams()
          .set("page", params.page && params.page.toString() || '1')
      }
    }
    let tempId = (JSON.parse(localStorage.getItem("currentUser"))).id;
    return this.http.get(`${baseUrl}account/${tempId}/favorite/movies?api_key=${apiKey}&session_id=${JSON.parse(sessionStorage.getItem("sessionId"))}`).map(res =>{
      return new MovieList(res); 
    })
  }

  isFavouriteMovie(id){

    let favouriteMovieIds = JSON.parse(localStorage.getItem("favouriteMovieIds"));
    
      if (favouriteMovieIds.indexOf(id) > -1) {
        return "assets/images/favourite512x512.png";
      }else return "assets/images/add-to-favorites-icon-63436.png";
  }

 }
