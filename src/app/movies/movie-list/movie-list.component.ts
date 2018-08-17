import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieList } from '../models/movie-list';
import { MovieService } from '../services/movie.service'; 

@Component({
  selector: 'tmdb-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
	list: string; 
  movieList: MovieList; 
	movies: Movie []; 

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
  		this.route.params.subscribe(params =>{
  		this.list = this.route.snapshot.paramMap.get('list');
  		this.updateMovies(); 
    
 })
    }

    updateMovies(page?){
      this.movieService.getMovies(this.list, page).subscribe(response=>{
      this.movies = response.results; 
      this.movieList = response; 
     },

     error =>{
      console.log("Error. Reason:", error.statusText);
    })
       
  

    }



}
