import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { API_BASE_URL } from '../utils/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class GamesService {

  constructor(
    private http:Http,
    private authService:AuthService
  ) { }

  getGames() {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'games/', {headers: headers})
      .map(res => res.json());
  }

  getGame(id) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'games/' + id, {headers: headers})
      .map(res => res.json());
  }

  addGame(game) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post(API_BASE_URL + 'games/', game, {headers: headers})
      .map(res => res.json());
  }

  updateGame(id, game) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put(API_BASE_URL + 'games/' + id, game, {headers: headers})
      .map(res => res.json());
  }

  deleteGame(id) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.delete(API_BASE_URL +  'games/' + id, {headers: headers})
      .map(res => res.json());
  }
}
