import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { SubsundayService } from '../../services/subsunday.service';
import { EmotesService } from '../../services/emotes.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isNumber } from 'util';
declare var Twitch:any;

@Component({
  selector: 'app-subsundaydetails',
  templateUrl: './subsundaydetails.component.html',
  styleUrls: ['./subsundaydetails.component.css']
})
export class SubsundaydetailsComponent implements OnInit {
  number:number;
  votes:String;
  vodurl:String;
  date:Date;
  games:Game[];
  message:String;
  options:any;
  player:any;
  private sub:any;

  constructor(
    private authService:AuthService,
    private subsundayService:SubsundayService,
    private emotesService:EmotesService,
    private router:Router,
    private route:ActivatedRoute,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.number = +params['number'];
    });

    this.titleService.setTitle('Sub Sunday #' + this.number + ' - LIRIK Hub');

    this.subsundayService.getSubsunday(this.number).subscribe(data => {
      if(data.hasOwnProperty('success') && !data.success){
        this.router.navigate(['/subsundays']);
      }

      this.number = data.number;
      this.votes = data.votes;
      this.vodurl = data.vodurl;
      this.games = data.games;
      this.date = data.date;
      this.message = data.message;

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

  jumpToVod(index) {
    this.player.setMuted(false);
    var diffVod = false;
    if(this.games[index].vodurl) {
      if(this.player.getVideo() != this.getVodID(this.games[index].vodurl)) {
        diffVod = true;
        this.loadVod(this.getVodID(this.games[index].vodurl), index, this.player);
        this.player.play();
      }
    }
    else {
      if(this.player.getVideo() != this.getVodID(this.vodurl)) {
        diffVod = true;
        this.loadVod(this.getVodID(this.vodurl), index, this.player);
        this.player.play();
      }
    }

    if(!diffVod) {
      this.player.seek(this.getSecondsFromTimestamp(this.games[index].vodtime));
      this.player.play();
    }
  }

  loadVod(id, index, player) {
    var time = this.getSecondsFromTimestamp(this.games[index].vodtime);
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

  getEmoteByThought(thought) {
    if(!thought) {
      return '/assets/images/thoughts/TBD.png';
    }

    return `/assets/images/thoughts/${thought}.png`;
  }

  onDeleteClick(number) {
    this.subsundayService.deleteSubsunday(number).subscribe(data => {
      if(data.success){
        this.router.navigate(['/subsundays']);
      }
    });
  }
}

interface Game {
  game:Object,
  buyurl:String,
  tought:String,
  vodtime:String,
  vodurl:String
}