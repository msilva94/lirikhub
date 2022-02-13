import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  name:String;
  year:Number;

  constructor(
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.name = 'incMS';
    this.year = new Date().getFullYear();
  }

}
