import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  constructor(
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Donate - LIRIK Hub');
  }
}
