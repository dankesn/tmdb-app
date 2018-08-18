import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MovieService } from './movies/services/movie.service';
import { AuthService } from './login/service/auth.service'; 


import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { AboutComponent } from './core/about/about.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { PaginationComponent } from './movies/pagination/pagination.component';
import { SearchFormComponent } from './movies/search-form/search-form.component';
import { MovieComponent } from './movies/movie/movie.component';
import { LoginComponent } from './login/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    MovieListComponent,
    PaginationComponent,
    SearchFormComponent,
    MovieComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  providers: [MovieService,
               AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
