import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { API_BASE_URL } from '../utils/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class EmotesService {

  constructor(
    private http:Http
  ) { }

  getEmotes() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'emotes/', {headers: headers})
      .map(res => res.json());
  }

  getEmote(name) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'emotes/' + name, {headers: headers})
      .map(res => res.json());
  }
}
