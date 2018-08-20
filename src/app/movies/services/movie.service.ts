import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { MovieList } from '../models/movie-list'; 
import { Movie } from '../models/movie'; 
import { MovieDetails } from '../models/movie-details'; 
import { FavouriteMovieUpdate } from '../../login/models/favourite-movie-update'

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
    return this.http.get(`${baseUrl}account/${tempId}/favorite/movies?api_key=${apiKey}&session_id=${JSON.parse(sessionStorage.getItem("sessionId"))}`, queryParams).map(res =>{
      return new MovieList(res); 
    })
  }

  isFavouriteMovie(id):boolean{
    let favouriteMovieIds = JSON.parse(localStorage.getItem("favouriteMovieIds"));
    if (favouriteMovieIds.indexOf(id) > -1) {
      return true;
    }else return false;
  }

  addOrRemoveFromFavourite(newFav){

    let tempId = (JSON.parse(localStorage.getItem("currentUser"))).id;
    let favouriteMovieIds = JSON.parse(localStorage.getItem("favouriteMovieIds"));

    if (newFav.favorite == false){
        let index = favouriteMovieIds.indexOf(newFav.media_id)
      if (index > -1) {
        favouriteMovieIds.splice(index, 1);
        localStorage.setItem('favouriteMovieIds', JSON.stringify(favouriteMovieIds));
      }
    } else {favouriteMovieIds.push(newFav.media_id);
      localStorage.setItem('favouriteMovieIds', JSON.stringify(favouriteMovieIds)); 
    }
    
    return this.http.post(`https://api.themoviedb.org/3/account/${tempId}/favorite?api_key=${apiKey}&session_id=${JSON.parse(sessionStorage.getItem("sessionId"))}`, newFav).map(res =>{
      return new FavouriteMovieUpdate(res); 
    })
  }

  getAllFavouriteMovies(){
    let tempId = (JSON.parse(localStorage.getItem("currentUser"))).id;
    return this.http.get(`${baseUrl}account/${tempId}/favorite/movies?api_key=${apiKey}&session_id=${JSON.parse(sessionStorage.getItem("sessionId"))}`).map(res =>{
      return new MovieList(res); 
    })
  }

  getAllMovies(favouriteMovieList){
    let favMovieArray1 = favouriteMovieList.results.map(a => a.id);
     localStorage.setItem("favouriteMovieIds", JSON.stringify(favMovieArray1));
     let favMovieArray2 = [];  
     if (favouriteMovieList.total_pages > 1){
           for (let i = 2;  i <= favouriteMovieList.total_pages; i++){
              this.getFavouriteMovies({'page': i}).subscribe(data =>{
              favMovieArray2 = data.results.map(a => a.id);
              favMovieArray1 = favMovieArray1.concat(favMovieArray2);
             localStorage.setItem("favouriteMovieIds", JSON.stringify(favMovieArray1));
             }) 
              }
            } 
         
  }

}
