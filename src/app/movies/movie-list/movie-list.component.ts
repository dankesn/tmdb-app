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
  searchText: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
  		this.route.params.subscribe(params =>{
  		this.list = this.route.snapshot.paramMap.get('list');
  		this.updateMovies(); 
    
 })
    }

    updateMovies(page?){
      if(this.list !== "search"){
      this.movieService.getMovies(this.list, page).subscribe(response=>{
      this.movies = response.results; 
      this.movieList = response; 
     },
     error =>{
      console.log("Error. Reason:", error.statusText);
    })
     } else { this.searchMovies(this.searchText, page)} 
  

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



}
