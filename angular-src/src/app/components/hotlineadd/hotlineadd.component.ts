import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { HotlinesService } from '../../services/hotlines.service';
import { ValidateService } from '../../services/validate.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotlineadd',
  templateUrl: './hotlineadd.component.html',
  styleUrls: ['./hotlineadd.component.css']
})
export class HotlineaddComponent implements OnInit {
  number:Number;
  date:string;
  vods:Vod[];
  curVod:Vod;
  curTimeH:Number;
  curTimeM:Number;
  curTimeS:Number;

  constructor(
    private hotlinesService:HotlinesService,
    private validateService:ValidateService,
    private router:Router,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Add Sub Hotline - LIRIK Hub');

    this.curVod = {
      vodurl: '',
      vodtime: ''
    }

    this.vods = [];
  }

  addHotline() {
    if(!this.validateService.validateDate(this.date) || !this.validateService.validateArray(this.vods)){
      return false;
    }

    var date:Date;
    if(this.date=='') this.date = undefined;
    
    if(this.date!=undefined){
      date = this.convertDate(this.date);
    }

    const hotline = {
      number: this.number,
      date: date,
      vods: this.vods
    }

    this.hotlinesService.addHotline(hotline).subscribe(data => {
      if(data.success){
        this.router.navigate(['/subhotlines']);
      } else {
        alert('An error has ocurred. Try again');
      }
    });
  }

  addVod() {
    if(!this.validateService.validateString(this.curVod.vodurl)) {
      return false;
    }

    this.checkInvalidTime();
    this.curVod.vodtime = '?t=' + this.curTimeH + 'h' + this.curTimeM + 'm' + this.curTimeS + 's';
    this.vods.push(this.curVod);
    this.clearVodInput();
  }

  moveVodUp(index) {
    let aux = this.vods[index-1];
    this.vods[index-1] = this.vods[index];
    this.vods[index] = aux;
  }

  moveVodDown(index) {
    let aux = this.vods[index+1];
    this.vods[index+1] = this.vods[index];
    this.vods[index] = aux;
  }

  deleteVod(index) {
    this.vods.splice(index, 1);
  }

  checkInvalidTime() {
    if(this.curTimeH == undefined) this.curTimeH = 0;
    if(this.curTimeM == undefined) this.curTimeM = 0;
    if(this.curTimeS == undefined) this.curTimeS = 0;
  }

  convertDate(date:string) {
    var splitDate = date.split("-");
    var newDate = new Date(splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]);
    newDate.setHours(17,0,0,0);

    return newDate;
  }

  clearVodInput() {
    this.curVod = {
      vodurl: '',
      vodtime: ''
    }
    this.curTimeH = undefined;
    this.curTimeM = undefined;
    this.curTimeS = undefined;
  }
}

interface Vod {
  vodurl: String,
  vodtime: String
}