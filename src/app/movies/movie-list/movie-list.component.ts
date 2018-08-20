import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieList } from '../models/movie-list';
import { MovieService } from '../services/movie.service';
import { AuthService } from '../../login/service/auth.service'; 

@Component({
  selector: 'tmdb-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
	list: string; 
  movieList: MovieList; 
  movies: Movie []; 
  searchText: string;

  newFav = {
    "media_type": "movie",
    "media_id": null,
    "favorite": null
  }

  constructor(private route: ActivatedRoute, private movieService: MovieService, private authService: AuthService) { }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem("currentUser")))
    this.route.params.subscribe(params =>{
      this.list = this.route.snapshot.paramMap.get('list');
      this.updateMovies();    
    })
  }

  updateMovies(page?){

    if(this.list == 'favourite'){
      this.movieService.getFavouriteMovies(page).subscribe(response =>{
        this.movies = response.results; 
        this.movieList = response; 
      },
      error =>{
      console.log("Error. Reason:", error.statusText);
    })

    }else if(this.list !== "search"){
      this.movieService.getMovies(this.list, page).subscribe(response=>{
        this.movies = response.results; 
        this.movieList = response; 
      },
      error =>{
        console.log("Error. Reason:", error.statusText);
      })
    } else {this.searchMovies(this.searchText, page)} 


  }

  searchMovies(searchString: string, page?){

    this.searchText = searchString;
    this.movieService.searchMovies(searchString, page).subscribe(res => {
      this.movies = res.results;
      this.movieList = res;  
    },
    error =>{
      console.log("Error. Reason:", error.statusText);
    })
  }


  isFavourite(id): string{
    if(this.movieService.isFavouriteMovie(id) == true){
      return "assets/images/favourite512x512.png"
    }else return "assets/images/add-to-favorites-icon-63436.png";
  }

  isLoggedIn(){
    return this.authService.getUserLoggedIn(); 
  }

  addToFavourites(id){
    this.newFav.media_id = id;
    this.newFav.favorite = !(this.movieService.isFavouriteMovie(id));
    this.movieService.addOrRemoveFromFavourite(this.newFav).subscribe(res =>{
    },
    error =>{
      console.log("Error. Reason:", error.statusText);
    }) 

  }



}
