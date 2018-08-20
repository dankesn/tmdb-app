import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'; 
import { AuthService } from '../service/auth.service'; 
import { MovieService } from '../../movies/services/movie.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'tmdb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup; 

  constructor(private fb: FormBuilder, 
    private authservice: AuthService, 
    private movieService: MovieService,
    private router: Router) { 

    this.loginForm = this.fb.group({
      'username': '',
      'password' : '',
      'request_token': ''
    }); 
  }

  loginError: boolean; 

  ngOnInit() {
  }

  login(){		
  	/* First create request_token */
  	this.authservice.createRequestToken().subscribe(res =>{
      if (res && res.request_token){
        this.loginForm.value.request_token = res.request_token;
        localStorage.setItem('request_token', JSON.stringify(res.request_token)); 
      }
      
      /* With user data validate token*/
      this.authservice.validateToken(this.loginForm.value).subscribe(res => {
        
        /* With validated token we can get session ID*/
        this.authservice.createSessionId().subscribe(res => {
          sessionStorage.setItem('sessionId', JSON.stringify(res.session_id));
          
          /* With session ID  we can get account ID */
          this.authservice.getAccountId().subscribe(res => {
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.authservice.setUserLoggedIn();
            this.authservice.setUsername(res.username);  
            let favMovieArray = [];

            /* With account ID  we can get favourite Movies and get their IDs*/
            this.movieService.getFavouriteMovies().subscribe(res => {
              /* We need all favourite movies IDs, from all pages*/
               this.movieService.getAllMovies(res);
              
               this.router.navigate(['movies/popular']);
            },
            error =>{
              console.log("Error. Reason:", error.statusText);
              this.router.navigate(['login']);
            })
          },
          error =>{
            console.log("Error. Reason:", error.statusText);
            this.router.navigate(['login']);
          })
        },
        error =>{
          console.log("Error. Reason:", error.statusText);
          this.router.navigate(['login']);
        })
      },
      error =>{
        console.log("Error. Reason:", error.statusText);
        this.router.navigate(['login']);
        this.loginError = true; 
      })
    },
    error =>{
      console.log("Error. Reason:", error.statusText);
    })
    
  }

  

}
