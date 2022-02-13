import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { API_BASE_URL } from '../utils/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class HotlinesService {

  constructor(
    private http:Http,
    private authService:AuthService
  ) { }

  getHotlines() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'hotlines/', {headers: headers})
      .map(res => res.json());
  }

  getHotline(number) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'hotlines/' + number, {headers: headers})
      .map(res => res.json());
  }

  addHotline(hotline) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post(API_BASE_URL + 'hotlines/', hotline, {headers: headers})
      .map(res => res.json());
  }

  updateHotline(number, hotline) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put(API_BASE_URL + 'hotlines/' + number, hotline, {headers: headers})
      .map(res => res.json());
  }

  deleteHotline(number) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.delete(API_BASE_URL + 'hotlines/' + number, {headers: headers})
      .map(res => res.json());
  }
}
