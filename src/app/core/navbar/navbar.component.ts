import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/service/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'tmdb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout().subscribe(res=>{
      this.authService.isUserLoggedIn = false; 
      localStorage.removeItem('currentUser');
      localStorage.removeItem('favouriteMovieIds');
      sessionStorage.removeItem('sessionId');
      this.router.navigate(['movies/popular']);
    }); 
  }

  isLoggedIn(){
    return this.authService.getUserLoggedIn();
  }

  getUsername(){
    return this.authService.getUsername(); 
  }

}
