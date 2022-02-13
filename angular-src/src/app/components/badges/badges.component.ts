import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { BadgesService } from '../../services/badges.service';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {
  bits:Badge[];
  subs:Badge[];

  constructor(
    private badgesService:BadgesService,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Badges - LIRIK Hub');

    this.badgesService.getBadges().subscribe(data => {
      this.bits = this.jsonToArray(data.badge_sets.bits.versions);
      this.subs = this.jsonToArray(data.badge_sets.subscriber.versions);
    });
  }

  jsonToArray(json) {
    var array = [];
    var i = 0;

    for(let k in json) {
      if(json.hasOwnProperty(k)){
        array[i] = json[k];
        i++;
      }
    }

    return array;
  }
}

interface Badge {
  title: String,
  image_url_4x: String
}