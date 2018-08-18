import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/service/auth.service'

@Component({
  selector: 'tmdb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean; 

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout(); 
  }

}
