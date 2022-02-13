import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { HotlinesService } from '../../services/hotlines.service';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-hotlines',
  templateUrl: './hotlines.component.html',
  styleUrls: ['./hotlines.component.css']
})
export class HotlinesComponent implements OnInit {
  hotlines:Hotline[];
  filteredHotlines:Hotline[];
  curPage:number;
  offset:number;
  numPages:number;
  pages:number[];
  search:String;
  total:Number;
  aux:Hotline[];

  constructor(
    private authService:AuthService,
    private hotlinesService:HotlinesService,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Sub Hotlines - LIRIK Hub');

    this.pages = [];
    this.filteredHotlines = [];
    this.curPage = 1;
    this.offset = 25;
    this.hotlinesService.getHotlines().subscribe(data => {
      this.hotlines = data;
      this.numPages = Math.ceil(this.hotlines.length / this.offset);
      this.getHotlinesPage();

      for(var i = 0; i<this.numPages; i++) {
        this.pages.push(i + 1);
      }
    });
  }

  setPage(num) {
    this.curPage = num;
  }

  getHotlinesPage() {
    var first = (this.curPage - 1) * this.offset;
    var last = first + this.offset;

    if(!this.search || this.search == '') {
      this.filteredHotlines = this.hotlines.slice(first, last);
    } else {
      this.filteredHotlines = this.aux.slice(first, last);
    }
  }

  getPrevPage() {
    if(this.curPage > 1) {
      this.curPage--;
      this.getHotlinesPage();
    }
  }

  getNextPage() {
    if(this.curPage < this.numPages) {
      this.curPage++;
      this.getHotlinesPage();
    }
  }
}

interface Hotline {
  number: Number,
  date: Date
}