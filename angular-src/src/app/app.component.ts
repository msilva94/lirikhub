import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DarkmodeService } from './services/darkmode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LIRIK Hub';

  constructor(
    private router:Router,
    private darkmodeService:DarkmodeService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    this.darkmodeService.setDarkMode();

    const darkmode = this.darkmodeService.loadDarkMode();
    const body = document.getElementsByTagName('body')[0];

    if(darkmode == 'true') {
      body.classList.add('dark-bg');
    } 
    else if (darkmode == 'false'){
      body.classList.add('default-bg');
    }
  }
}
