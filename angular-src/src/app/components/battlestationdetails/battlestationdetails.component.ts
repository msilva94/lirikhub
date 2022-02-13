import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { BattlestationsService } from '../../services/battlestations.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var Twitch:any;

@Component({
  selector: 'app-battlestationdetails',
  templateUrl: './battlestationdetails.component.html',
  styleUrls: ['./battlestationdetails.component.css']
})
export class BattlestationdetailsComponent implements OnInit {
  number:Number;
  date:Date;
  vods:Vod[];
  options:any;
  player:any;
  private sub:any;

  constructor(
    private authService:AuthService,
    private battlestationsService:BattlestationsService,
    private router:Router,
    private route:ActivatedRoute,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.number = +params['number'];
    });

    this.titleService.setTitle('Battlestations Review #' + this.number + ' - LIRIK Hub');

    this.battlestationsService.getBattlestation(this.number).subscribe(data => {
      if(data.hasOwnProperty('success') && !data.success){
        this.router.navigate(['/battlestations']);
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
    this.battlestationsService.deleteBattlestation(number).subscribe(data => {
      if(data.success){
        this.router.navigate(['/battlestations']);
      }
    });
  }
}

interface Vod {
  vodurl: String,
  vodtime: String
}