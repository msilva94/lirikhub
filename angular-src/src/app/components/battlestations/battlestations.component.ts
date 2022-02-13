import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { BattlestationsService } from '../../services/battlestations.service';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-battlestations',
  templateUrl: './battlestations.component.html',
  styleUrls: ['./battlestations.component.css']
})
export class BattlestationsComponent implements OnInit {
  battlestations:Battlestation[];
  filteredBattlestations:Battlestation[];
  curPage:number;
  offset:number;
  numPages:number;
  pages:number[];
  search:String;
  total:Number;
  aux:Battlestation[];

  constructor(
    private authService:AuthService,
    private battlestationsService:BattlestationsService,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Battlestations Reviews - LIRIK Hub');

    this.pages = [];
    this.filteredBattlestations = [];
    this.curPage = 1;
    this.offset = 25;
    this.battlestationsService.getBattlestations().subscribe(data => {
      this.battlestations = data;
      this.numPages = Math.ceil(this.battlestations.length / this.offset);
      this.getBattlestationsPage();

      for(var i = 0; i<this.numPages; i++) {
        this.pages.push(i + 1);
      }
    });
  }

  setPage(num) {
    this.curPage = num;
  }

  getBattlestationsPage() {
    var first = (this.curPage - 1) * this.offset;
    var last = first + this.offset;

    if(!this.search || this.search == '') {
      this.filteredBattlestations = this.battlestations.slice(first, last);
    } else {
      this.filteredBattlestations = this.aux.slice(first, last);
    }
  }

  getPrevPage() {
    if(this.curPage > 1) {
      this.curPage--;
      this.getBattlestationsPage();
    }
  }

  getNextPage() {
    if(this.curPage < this.numPages) {
      this.curPage++;
      this.getBattlestationsPage();
    }
  }
}

interface Battlestation {
  number: Number,
  date: Date
}