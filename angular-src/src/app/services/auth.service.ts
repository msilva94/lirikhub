import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { API_BASE_URL } from '../utils/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken:any;

  constructor(private http:Http) { }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(API_BASE_URL + 'users/authenticate/', user, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token) {
    localStorage.setItem('id_token', token);
    this.authToken = token;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    localStorage.removeItem('id_token');
  }
}
