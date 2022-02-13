import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { StreamService } from '../../services/stream.service';
import { AuthService } from '../../services/auth.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ObserveOnMessage } from 'rxjs/operators/observeOn';
import * as moment from 'moment';
declare var Twitch:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  stream:Object;
  timer:any;
  nextStream:String;
  isLive:boolean;
  options:any;
  player:any;

  constructor(
    private streamService:StreamService,
    private authService:AuthService,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Home - LIRIK Hub');

    this.options = {
      width: '100%',
      height: '100%',
      channel: 'LIRIK',
      autoplay: true
    };
    this.player = new Twitch.Player("twitch-player", this.options);
    this.player.setQuality('chunked');
    this.player.setMuted(true);

    this.timer = Observable.timer(0,60000)
    .mergeMap(() => this.streamService.getStream())
    .subscribe(data => {
      if(data.type!='live') {
        this.isLive = false;
        var nextStream = this.getNextStream();
        nextStream.setMinutes(nextStream.getMinutes() - nextStream.getTimezoneOffset());
        if(nextStream.getFullYear() <= 1970) {
          this.nextStream = 'Stream starting soon!';
        } else {
          this.nextStream = moment(nextStream).calendar();
        }
      } else {
        this.isLive = true;
        this.stream = data;
      }
    });
  }

  getNextStream() {
    const streamTime = 17;
    const dayOff = 4;
    var nextStream = new Date();
    var utcTime = {
      year: nextStream.getUTCFullYear(),
      month: nextStream.getUTCMonth(),
      day: nextStream.getUTCDate(),
      hour: nextStream.getUTCHours(),
      minutes: nextStream.getUTCMinutes(),
      seconds: nextStream.getUTCSeconds()
    }
    nextStream = new Date(utcTime.year, utcTime.month, utcTime.day, utcTime.hour, utcTime.minutes, utcTime.seconds);

    if(nextStream.getHours() < streamTime){
      if(nextStream.getDay()==dayOff){
        nextStream.setDate(nextStream.getDate() + 1);
      }
      nextStream.setHours(streamTime,0,0,0);

      return nextStream;
    }
    else if(nextStream.getHours() < streamTime + 1) {
      if(nextStream.getDay()==dayOff){
        nextStream.setDate(nextStream.getDate() + 1);
        nextStream.setHours(streamTime,0,0,0);
        return nextStream;
      }

      return new Date("1970-01-01");
    }
    else {
      if(nextStream.getDay()==dayOff-1){
        nextStream.setDate(nextStream.getDate() + 1);
      }
      nextStream.setHours(streamTime,0,0,0);
      nextStream.setDate(nextStream.getDate() + 1);
    }

    return nextStream;
  }

  /*
  openChat() {
    const width = 400;
    const height = 725;
    const left = (screen.width)-(width*1.15);
    const top = (screen.height/2)-(height/2);

    window.open('https://www.twitch.tv/popout/lirik/chat?popout=', 'targetWindow', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
  }*/

  ngOnDestroy() {
    this.timer.unsubscribe();
  }
}