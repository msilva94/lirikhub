import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { API_BASE_URL } from '../utils/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class StreamService {

  constructor(
    private http:Http
  ) { }

  getStream() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Cache-Control','no-cache');
    return this.http.get(API_BASE_URL + 'stream/', {headers: headers})
      .map(res => res.json());
  }
}
