import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { FmfsService } from '../../services/fmfs.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var Twitch:any;

@Component({
  selector: 'app-fmfsdetails',
  templateUrl: './fmfsdetails.component.html',
  styleUrls: ['./fmfsdetails.component.css']
})
export class FmfsdetailsComponent implements OnInit {
  number:Number;
  vodurl:String;
  date:Date;
  games:Game[];
  options:any;
  player:any;
  private sub:any;

  constructor(
    private authService:AuthService,
    private titleService:Title,
    private fmfsService:FmfsService,
    private router:Router,
    private route:ActivatedRoute,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.number = +params['number'];
    });

    this.titleService.setTitle('Fight Me Friday #' + this.number + ' - LIRIK Hub');

    this.fmfsService.getFmf(this.number).subscribe(data => {
      if(data.hasOwnProperty('success') && !data.success){
        this.router.navigate(['/fightmefridays']);
      }

      this.number = data.number;
      this.vodurl = data.vodurl;
      this.date = data.date;
      this.games = data.games;

      this.options = {
        width: '100%',
        height: '100%',
        autoplay: false
      };
      this.player = new Twitch.Player("twitch-player", this.options);
      this.player.setVideo(this.getVodID(this.vodurl));
      this.player.setQuality('chunked');
      this.player.setVolume(1);
    });
  }

  jumpToVod(index1, index2) {
    this.player.setMuted(false);
    var diffVod = false;
    if(this.games[index1].opponents[index2].vodurl) {
      if(this.player.getVideo() != this.getVodID(this.games[index1].opponents[index2].vodurl)) {
        diffVod = true;
        this.loadVod(this.getVodID(this.games[index1].opponents[index2].vodurl), index1, index2, this.player);
        this.player.play();
      }
    }
    else {
      if(this.player.getVideo() != this.getVodID(this.vodurl)) {
        diffVod = true;
        this.loadVod(this.getVodID(this.vodurl), index1, index2, this.player);
        this.player.play();
      }
    }

    if(!diffVod) {
      this.player.seek(this.getSecondsFromTimestamp(this.games[index1].opponents[index2].vodtime));
      this.player.play();
    }
  }

  loadVod(id, index1, index2, player) {
    var time = this.getSecondsFromTimestamp(this.games[index1].opponents[index2].vodtime);
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

  onDeleteClick(number) {
    this.fmfsService.deleteFmf(number).subscribe(data => {
      if(data.success){
        this.router.navigate(['/fightmefridays']);
      }
    });
  }
}

interface GameInfo {
  name:String,
  image:String,
  buyurl:String
}

interface Opponent {
  name:String
  vodtime:String,
  vodurl:String
}

interface Game {
  game:GameInfo,
  opponents:Opponent[]
}