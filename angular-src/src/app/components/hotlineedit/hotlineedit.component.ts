import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { HotlinesService } from '../../services/hotlines.service';
import { ValidateService } from '../../services/validate.service';
import { DarkmodeService } from '../../services/darkmode.service';
import{ Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotlineedit',
  templateUrl: './hotlineedit.component.html',
  styleUrls: ['./hotlineedit.component.css']
})
export class HotlineeditComponent implements OnInit {
  number:Number;
  date:String;
  vods:Vod[];
  private sub:any;
  curVod:Vod;
  curTimeH:Number;
  curTimeM:Number;
  curTimeS:Number;
  
  constructor(
    private hotlinesService:HotlinesService,
    private validateService:ValidateService,
    private router:Router,
    private route:ActivatedRoute,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Edit Sub Hotline - LIRIK Hub');
    this.sub = this.route.params.subscribe(params => {
      this.number = params['number'];
    });

    this.hotlinesService.getHotline(this.number).subscribe(data => {
      if(data.hasOwnProperty('success') && !data.success){
        this.router.navigate(['/subhotlines']);
        return false;
      }

      this.number = data.number;
      this.vods = data.vods;
      this.date = this.convertDateFromISO(data.date);
    });

    this.curVod = {
      vodurl: '',
      vodtime: ''
    }
  }

  updateHotline() {
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

    this.hotlinesService.updateHotline(this.number, hotline).subscribe(data => {
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

  convertDate(date:String) {
    var splitDate = date.split("-");
    var newDate = new Date(splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]);
    newDate.setHours(17,0,0,0);

    return newDate;
  }

  convertDateFromISO(date:Date) {
    var splitDate = date.toString().substring(0, 10).split("-");
    var newDate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];

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