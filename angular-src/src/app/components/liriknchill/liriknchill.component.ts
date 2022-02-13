import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { LiriknchillService } from '../../services/liriknchill.service';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-liriknchill',
  templateUrl: './liriknchill.component.html',
  styleUrls: ['./liriknchill.component.css']
})
export class LiriknchillComponent implements OnInit {
  liriknchill:Liriknchill[];
  filteredLiriknchill:Liriknchill[];
  curPage:number;
  offset:number;
  numPages:number;
  pages:number[];
  search:String;
  total:Number;
  aux:Liriknchill[];

  constructor(
    private authService:AuthService,
    private liriknchillService:LiriknchillService,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Lirik n\' Chill - LIRIK Hub');

    this.pages = [];
    this.filteredLiriknchill = [];
    this.curPage = 1;
    this.offset = 25;
    this.liriknchillService.getLiriknchills().subscribe(data => {
      this.liriknchill = data;
      this.numPages = Math.ceil(this.liriknchill.length / this.offset);
      this.getLiriknchillPage();

      for(var i = 0; i<this.numPages; i++) {
        this.pages.push(i + 1);
      }
    });
  }

  setPage(num) {
    this.curPage = num;
  }

  getLiriknchillPage() {
    var first = (this.curPage - 1) * this.offset;
    var last = first + this.offset;

    if(!this.search || this.search == '') {
      this.filteredLiriknchill = this.liriknchill.slice(first, last);
    } else {
      this.filteredLiriknchill = this.aux.slice(first, last);
    }
  }

  getPrevPage() {
    if(this.curPage > 1) {
      this.curPage--;
      this.getLiriknchillPage();
    }
  }

  getNextPage() {
    if(this.curPage < this.numPages) {
      this.curPage++;
      this.getLiriknchillPage();
    }
  }
}

interface Liriknchill {
  number: Number,
  date: Date
}