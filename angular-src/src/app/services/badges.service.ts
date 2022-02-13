import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { API_BASE_URL } from '../utils/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class BadgesService {

  constructor(
    private http:Http
  ) { }

  getBadges() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'badges/', {headers: headers})
      .map(res => res.json());
  }
}
