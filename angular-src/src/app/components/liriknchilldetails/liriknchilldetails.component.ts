import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { LiriknchillService } from '../../services/liriknchill.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liriknchilldetails',
  templateUrl: './liriknchilldetails.component.html',
  styleUrls: ['./liriknchilldetails.component.css']
})
export class LiriknchilldetailsComponent implements OnInit {
  number:Number;
  date:Date;
  vods:Vod[];
  player:any;
  currentVod:String;
  private sub:any;

  constructor(
    private authService:AuthService,
    private liriknchillService:LiriknchillService,
    private router:Router,
    private route:ActivatedRoute,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.number = +params['number'];
    });

    this.titleService.setTitle('Lirik n\' Chill #' + this.number + ' - LIRIK Hub');

    this.liriknchillService.getLiriknchill(this.number).subscribe(data => {
      if(data.hasOwnProperty('success') && !data.success){
        this.router.navigate(['/liriknchill']);
      }

      this.number = data.number;
      this.date = data.date;
      this.vods = data.vods;

      this.player = document.getElementById('html5-player');
      this.currentVod = this.vods[0].vodurl;
      this.player.load();
    });
  }

  jumpToVod(index) {
    if (this.player.children[0].src != this.vods[index].vodurl) {
      this.player.children[0].src = (this.vods[index].vodurl);
      this.player.load();
    }

    this.player.currentTime = this.getSecondsFromTimestamp(this.vods[index].vodtime);
    this.player.play();
  }

  getSecondsFromTimestamp(timestamp) {
    var tsNumbers = timestamp.match(/\d+/g).map(Number);
    var seconds = tsNumbers[0]*3600 + tsNumbers[1]*60 + tsNumbers[2];

    return seconds;
  }

  onDeleteClick(number) {
    this.liriknchillService.deleteLiriknchill(number).subscribe(data => {
      if(data.success){
        this.router.navigate(['/liriknchill']);
      }
    });
  }
}

interface Vod {
  vodurl: String,
  vodtime: String
}