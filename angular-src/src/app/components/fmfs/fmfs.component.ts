import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { FmfsService } from '../../services/fmfs.service';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-fmfs',
  templateUrl: './fmfs.component.html',
  styleUrls: ['./fmfs.component.css']
})
export class FmfsComponent implements OnInit {
  fmfs:Fmf[];
  filteredFmfs:Fmf[];
  curPage:number;
  offset:number;
  numPages:number;
  pages:number[];
  search:String;
  total:Number;
  aux:Fmf[];
  curSort:String;

  constructor(
    private authService:AuthService,
    private fmfsService:FmfsService,
    private titleService:Title,
    private darkmodeService:DarkmodeService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Fight Me Fridays - LIRIK Hub');

    this.pages = [];
    this.filteredFmfs = [];
    this.curPage = 1;
    this.offset = 25;
    this.curSort = 'date';
    this.fmfsService.getFmfs().subscribe(data => {
      this.fmfs = data;
      this.numPages = Math.ceil(this.fmfs.length / this.offset);
      this.getFmfsPage();

      for(var i = 0; i<this.numPages; i++) {
        this.pages.push(i + 1);
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  getNumberOfOpponents(index) {
    var counter = 0;

    for(var i=0; i<this.filteredFmfs[index].games.length; i++) {
      counter += this.filteredFmfs[index].games[i].opponents.length;
    }

    return counter;
  }

  searchGame() {
    this.setPage(1);
    if(!this.search || this.search == '') {
      this.pages = [];
      this.numPages = Math.ceil(this.fmfs.length / this.offset);
      for(var i = 0; i<this.numPages; i++) {
        this.pages.push(i + 1);
      }

      this.total = this.fmfs.length;
      this.getFmfsPage();
    } else {
      this.aux = [];
      this.filteredFmfs = [];
      this.pages = [];

      for(var i = 0; i < this.fmfs.length; i++) {
        for(var j = 0; j < this.fmfs[i].games.length; j++) {
          if(this.fmfs[i].games[j].game.name.toLowerCase().match(this.search.toLowerCase())) {
            this.aux.push(this.fmfs[i]);
            j = this.fmfs[i].games.length;
          }
        }
      }

      this.total = this.aux.length;

      this.numPages = Math.ceil(this.aux.length / this.offset);
      for(var i = 0; i < this.numPages; i++) {
        this.pages.push(i + 1);
      }

      var first = (this.curPage - 1) * this.offset;
      var last = first + this.offset;
      this.filteredFmfs = this.aux.slice(first, last);
    }
  }

  setPage(num) {
    this.curPage = num;
  }

  getFmfsPage() {
    var first = (this.curPage - 1) * this.offset;
    var last = first + this.offset;

    if(!this.search || this.search == '') {
      this.filteredFmfs = this.fmfs.slice(first, last);
    } else {
      this.filteredFmfs = this.aux.slice(first, last);
    }
  }

  getPrevPage() {
    if(this.curPage > 1) {
      this.curPage--;
      this.getFmfsPage();
    }
  }

  getNextPage() {
    if(this.curPage < this.numPages) {
      this.curPage++;
      this.getFmfsPage();
    }
  }

  onSortChange() {
    if(this.curSort=='games') {
      this.fmfs.sort(compareGames);
    }
    else if (this.curSort=='opponents') {
      this.fmfs.sort(compareOpponents);
    }
    else if (this.curSort=='date') {
      this.fmfs.sort(compareDate);
    }

    this.searchGame();

    function compareOpponents(a:Fmf, b:Fmf) {
      var counter_a = 0;
      var counter_b = 0;

      for(var i=0; i<a.games.length; i++) {
        counter_a += a.games[i].opponents.length;
      }

      for(var i=0; i<b.games.length; i++) {
        counter_b += b.games[i].opponents.length;
      }

      if(counter_a < counter_b) {
        return 1;
      }
      if(counter_a > counter_b) {
        return -1;
      }
      if(a.date < b.date) {
        return 1;
      }
      if(a.date > b.date) {
        return -1;
      }

      return 0;
    }

    function compareGames(a:Fmf, b:Fmf) {
      if(a.games.length < b.games.length) {
        return 1;
      }
      if(a.games.length > b.games.length) {
        return -1;
      }
      if(a.date < b.date) {
        return 1;
      }
      if(a.date > b.date) {
        return -1;
      }

      return 0;
    }

    function compareDate(a:Fmf, b:Fmf) {
      if(a.date < b.date) {
        return 1;
      }
      if(a.date > b.date) {
        return -1;
      }

      return 0;
    }
  }
}

interface Fmf {
  number:Number;
  date:Date;
  vodurl:String;
  games:Game[];
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