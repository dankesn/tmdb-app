  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs/Observable';
  import { Router } from '@angular/router';
  import 'rxjs/add/operator/map'
  import { RequestOptions, RequestMethod} from '@angular/http';

  import { Token } from '../models/token';
  import { Session } from '../models/session'; 
  import { Account } from '../models/account'; 

  const apiKey = '0e2ff32149f0c6d10bd2f2ff9643ee22';
  const baseUrl = 'https://api.themoviedb.org/3/';



  @Injectable()
  export class AuthService {

    isUserLoggedIn: boolean = false;
    username: string; 

    constructor(private http: HttpClient, private router: Router) { }

    createRequestToken(){
      return this.http.get(`${baseUrl}authentication/token/new?api_key=${apiKey}`).map(res =>{
        return new Token(res); 
      })
    }

    validateToken(user){
      return this.http.post(`${baseUrl}authentication/token/validate_with_login?api_key=${apiKey}` , user).map(res =>{
        return new Token(res); 
      })
    }

    createSessionId(){
      return this.http.post(`${baseUrl}authentication/session/new?api_key=${apiKey}`, {'request_token' :JSON.parse(localStorage.getItem("request_token"))}).map(res=>{
        return new Session (res); 
      })
    }

    getAccountId(){
      return this.http.get(`${baseUrl}account?api_key=${apiKey}&session_id=${JSON.parse(sessionStorage.getItem("sessionId"))}`).map(res =>{
        return new Account(res); 
      })
    }

    logout(){

      let options = ({
        headers: {},
        body: {
          'session_id': JSON.parse(sessionStorage.getItem("sessionId"))
        }
      });
      
      return this.http.delete(`${baseUrl}authentication/session?apiKey=${apiKey}`, options).map(res=>{

        this.isUserLoggedIn = false; 
        localStorage.removeItem('currentUser');
        localStorage.removeItem('favouriteMovieIds');
        sessionStorage.removeItem('sessionId');
        this.router.navigate(['movies/popular']);
        return res; 
      })
    }

    setUserLoggedIn(){
      this.isUserLoggedIn = true;
    }

    getUserLoggedIn(){
      return this.isUserLoggedIn;
    }

    setUsername(username){
      this.username = username;
    }

    getUsername(){
      return this.username;
    }


  }


