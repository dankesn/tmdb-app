import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { AuthService } from '../../login/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from '../models/movie-details';
import { MovieList } from '../models/movie-list';
import { Movie } from '../models/movie';

@Component({
  selector: 'tmdb-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  newFav = {
  "media_type": "movie",
  "media_id": null,
  "favorite": null
}

	id: number; 
	movie: MovieDetails;
  recommendedMovies: Movie []; 
  isFavouriteMovie: boolean; 

  constructor(private movieService: MovieService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
  	this.id = Number(this.route.snapshot.paramMap.get('id'));
  	this.movieService.getMovieDetails(this.id).subscribe(res =>{
  		this.movie = res; 
  	})

    this.movieService.getMovieRecommendation(this.id).subscribe(res =>{
      this.recommendedMovies = res.results;  
    })
  }

)}

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
