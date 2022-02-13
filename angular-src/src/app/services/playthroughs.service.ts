import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { API_BASE_URL } from '../utils/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaythroughsService {

  constructor(
    private http:Http,
    private authService:AuthService
  ) { }

  getPlaythroughs() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'playthroughs/', {headers: headers})
      .map(res => res.json());
  }

  getPlaythrough(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'playthroughs/' + id, {headers: headers})
      .map(res => res.json());
  }

  addPlaythrough(playthrough) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post(API_BASE_URL + 'playthroughs/', playthrough, {headers: headers})
      .map(res => res.json());
  }

  updatePlaythrough(id, playthrough) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put(API_BASE_URL + 'playthroughs/' + id, playthrough, {headers: headers})
      .map(res => res.json());
  }

  deletePlaythrough(id) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.delete(API_BASE_URL + 'playthroughs/' + id, {headers: headers})
      .map(res => res.json());
  }
}
