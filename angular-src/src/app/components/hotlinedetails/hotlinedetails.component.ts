import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { HotlinesService } from '../../services/hotlines.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var Twitch:any;

@Component({
  selector: 'app-hotlinedetails',
  templateUrl: './hotlinedetails.component.html',
  styleUrls: ['./hotlinedetails.component.css']
})
export class HotlinedetailsComponent implements OnInit {
  number:Number;
  date:Date;
  vods:Vod[];
  options:any;
  player:any;
  private sub:any;

  constructor(
    private authService:AuthService,
    private hotlinesService:HotlinesService,
    private router:Router,
    private route:ActivatedRoute,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.number = +params['number'];
    });

    this.titleService.setTitle('Sub Hotline #' + this.number + ' - LIRIK Hub');

    this.hotlinesService.getHotline(this.number).subscribe(data => {
      if(data.hasOwnProperty('success') && !data.success){
        this.router.navigate(['/hotlines']);
      }

      this.number = data.number;
      this.date = data.date;
      this.vods = data.vods;

      this.options = {
        width: '100%',
        height: '100%',
        autoplay: false
      };
      this.player = new Twitch.Player("twitch-player", this.options);
      this.player.setVideo(this.getVodID(this.vods[0].vodurl));
      this.player.setQuality('chunked');
      this.player.setVolume(1);
    });
  }

  jumpToVod(index) {
    this.player.setMuted(false);
    var diffVod = false;
    if(this.player.getVideo() != this.getVodID(this.vods[index].vodurl)) {
      diffVod = true;
      this.loadVod(this.getVodID(this.vods[index].vodurl), index, this.player);
      this.player.play();
    }

    if(!diffVod) {
      this.player.seek(this.getSecondsFromTimestamp(this.vods[index].vodtime));
      this.player.play();
    }
  }

  loadVod(id, index, player) {
    var time = this.getSecondsFromTimestamp(this.vods[index].vodtime);
    player.setVideo(id, time);
  }

  getVodID(url) {
    var vodID = url.split('/');

    return 'v' + vodID[vodID.length - 1];
  }

  getSecondsFromTimestamp(timestamp) {
    var tsNumbers = timestamp.match(/\d+/g).map(Number);
    var seconds = tsNumbers[0]*3600 + tsNumbers[1]*60 + tsNumbers[2];

    return seconds;
  }

  onDeleteClick(number) {
    this.hotlinesService.deleteHotline(number).subscribe(data => {
      if(data.success){
        this.router.navigate(['/hotlines']);
      }
    });
  }
}

interface Vod {
  vodurl: String,
  vodtime: String
}