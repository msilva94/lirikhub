import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { API_BASE_URL } from '../utils/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class LiriknchillService {

  constructor(
    private http:Http,
    private authService:AuthService
  ) { }

  getLiriknchills() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'liriknchill/', {headers: headers})
      .map(res => res.json());
  }

  getLiriknchill(number) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'liriknchill/' + number, {headers: headers})
      .map(res => res.json());
  }

  addLiriknchill(hotline) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post(API_BASE_URL + 'liriknchill/', hotline, {headers: headers})
      .map(res => res.json());
  }

  updateLiriknchill(number, hotline) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put(API_BASE_URL + 'liriknchill/' + number, hotline, {headers: headers})
      .map(res => res.json());
  }

  deleteLiriknchill(number) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.delete(API_BASE_URL + 'liriknchill/' + number, {headers: headers})
      .map(res => res.json());
  }
}
