import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../core/about/about.component'; 
import { MovieListComponent } from '../movies/movie-list/movie-list.component'; 


const routes: Routes = [
{path:'about', component: AboutComponent},
{path: 'movies/:list', component: MovieListComponent},
{path:'', redirectTo: '/movies/popular', pathMatch:'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
