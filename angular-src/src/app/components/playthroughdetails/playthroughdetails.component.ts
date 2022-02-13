import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { PlaythroughsService } from '../../services/playthroughs.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var Twitch:any;

@Component({
  selector: 'app-playthroughdetails',
  templateUrl: './playthroughdetails.component.html',
  styleUrls: ['./playthroughdetails.component.css']
})
export class PlaythroughdetailsComponent implements OnInit {
  id:string;
  playthrough:Playthrough;
  options:any;
  player:any;
  private sub:any;

  constructor(
    private authService:AuthService,
    private playthroughsService:PlaythroughsService,
    private router:Router,
    private route:ActivatedRoute,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.playthroughsService.getPlaythrough(this.id).subscribe(data => {
      if(data.hasOwnProperty('success') && !data.success){
        this.router.navigate(['/playthroughs']);
      }

      this.playthrough = data;
      this.titleService.setTitle(this.playthrough.game.name.valueOf() + ' - LIRIK Hub');

      this.options = {
        width: '100%',
        height: '100%',
        autoplay: false
      };
      this.player = new Twitch.Player("twitch-player", this.options);
      this.player.setVideo(this.getVodID(this.playthrough.vods[0].vodurl));
      this.player.setQuality('chunked');
      this.player.setVolume(1);
    });
  }

  jumpToVod(index) {
    this.player.setMuted(false);
    var diffVod = false;
    if(this.player.getVideo() != this.getVodID(this.playthrough.vods[index].vodurl)) {
      diffVod = true;
      this.loadVod(this.getVodID(this.playthrough.vods[index].vodurl), index, this.player);
      this.player.play();
    }

    if(!diffVod) {
      this.player.seek(this.getSecondsFromTimestamp(this.playthrough.vods[index].vodtime));
      this.player.play();
    }
  }

  loadVod(id, index, player) {
    var time = this.getSecondsFromTimestamp(this.playthrough.vods[index].vodtime);
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

  goBuy(url) {
    window.open(url);
  }

  onDeleteClick(id) {
    this.playthroughsService.deletePlaythrough(id).subscribe(data => {
      if(data.success){
        this.router.navigate(['/playthroughs']);
      }
    });
  }
}

interface Playthrough {
  game:Game;
  date:Date;
  vods:Vod[];
}

interface Vod {
  vodurl:String;
  vodtime:String;
}

interface Game {
  name:String;
  image:String;
  buyurl:String;
}