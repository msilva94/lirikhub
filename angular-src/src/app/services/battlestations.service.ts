import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { API_BASE_URL } from '../utils/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class BattlestationsService {

  constructor(
    private http:Http,
    private authService:AuthService
  ) { }

  getBattlestations() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'battlestations/', {headers: headers})
      .map(res => res.json());
  }

  getBattlestation(number) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(API_BASE_URL + 'battlestations/' + number, {headers: headers})
      .map(res => res.json());
  }

  addBattlestation(battlestation) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post(API_BASE_URL + 'battlestations/', battlestation, {headers: headers})
      .map(res => res.json());
  }

  updateBattlestation(number, battlestation) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put(API_BASE_URL + 'battlestations/' + number, battlestation, {headers: headers})
      .map(res => res.json());
  }

  deleteBattlestation(number) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.delete(API_BASE_URL + 'battlestations/' + number, {headers: headers})
      .map(res => res.json());
  }
}
