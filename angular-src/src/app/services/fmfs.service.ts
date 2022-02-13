import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { API_BASE_URL } from '../utils/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class FmfsService {

  constructor(
    private http:Http,
    private authService:AuthService
  ) { }

  getFmfs() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'fmfs/', {headers: headers})
      .map(res => res.json());
  }

  getFmf(number) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'fmfs/' + number, {headers: headers})
      .map(res => res.json());
  }

  addFmf(fmf) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post(API_BASE_URL + 'fmfs/', fmf, {headers: headers})
      .map(res => res.json());
  }

  updateFmf(number, fmf) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put(API_BASE_URL + 'fmfs/' + number, fmf, {headers: headers})
      .map(res => res.json());
  }

  deleteFmf(number) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.delete(API_BASE_URL + 'fmfs/' + number, {headers: headers})
      .map(res => res.json());
  }
}
