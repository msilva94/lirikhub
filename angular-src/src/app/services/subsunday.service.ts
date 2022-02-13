import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { API_BASE_URL } from '../utils/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class SubsundayService {

  constructor(
    private http:Http,
    private authService:AuthService
  ) { }

  getSubsundays() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'subsundays/', {headers: headers})
      .map(res => res.json());
  }

  getSubsunday(number) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'subsundays/' + number, {headers: headers})
      .map(res => res.json());
  }

  addSubsunday(subsunday) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post(API_BASE_URL + 'subsundays/', subsunday, {headers: headers})
      .map(res => res.json());
  }

  updateSubsunday(number, subsunday) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put(API_BASE_URL + 'subsundays/' + number, subsunday, {headers: headers})
      .map(res => res.json());
  }

  deleteSubsunday(number) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.delete(API_BASE_URL + 'subsundays/' + number, {headers: headers})
      .map(res => res.json());
  }
}
