import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(
    private router:Router,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('404 - LIRIK Hub');
    this.router.navigate(['404']);
  }

}
