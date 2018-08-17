import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
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

	id: number; 
	movie: MovieDetails;
  recommendedMovies: Movie [];

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

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

}
