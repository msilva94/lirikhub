import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { PlaythroughsService } from '../../services/playthroughs.service';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-playthroughs',
  templateUrl: './playthroughs.component.html',
  styleUrls: ['./playthroughs.component.css']
})
export class PlaythroughsComponent implements OnInit {
  playthroughs:Playthrough[];
  filteredPlaythroughs:Playthrough[];
  curPage:number;
  offset:number;
  numPages:number;
  pages:number[];
  search:String;
  total:Number;
  aux:Playthrough[];
  curSort:String;

  constructor(
    private authService:AuthService,
    private playthroughsService:PlaythroughsService,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Playthroughs - LIRIK Hub');
    
    this.pages = [];
    this.filteredPlaythroughs = [];
    this.curPage = 1;
    this.offset = 25;
    this.curSort = 'date';
    this.playthroughsService.getPlaythroughs().subscribe(data => {
      this.playthroughs = data;
      this.numPages = Math.ceil(this.playthroughs.length / this.offset);
      this.getPlaythroughsPage();

      for(var i = 0; i<this.numPages; i++) {
        this.pages.push(i + 1);
      }
    });
  }

  onDeleteClick(playthrough) {
    this.playthroughsService.deletePlaythrough(playthrough._id).subscribe(data => {
      if(data.success){
        let index = this.playthroughs.indexOf(playthrough);
        this.playthroughs.splice(index, 1);
      }
    });
  }

  searchGame() {
    this.setPage(1);
    if(!this.search || this.search == '') {
      this.pages = [];
      this.numPages = Math.ceil(this.playthroughs.length / this.offset);
      for(var i = 0; i<this.numPages; i++) {
        this.pages.push(i + 1);
      }

      this.total = this.playthroughs.length;
      this.getPlaythroughsPage();
    } else {
      this.aux = [];
      this.filteredPlaythroughs = [];
      this.pages = [];

      for(var i = 0; i < this.playthroughs.length; i++) {
        if(this.playthroughs[i].game.name.toLowerCase().match(this.search.toLowerCase())) {
          this.aux.push(this.playthroughs[i]);
        }
      }

      this.total = this.aux.length;

      this.numPages = Math.ceil(this.aux.length / this.offset);
      for(var i = 0; i < this.numPages; i++) {
        this.pages.push(i + 1);
      }

      var first = (this.curPage - 1) * this.offset;
      var last = first + this.offset;
      this.filteredPlaythroughs = this.aux.slice(first, last);
    }
  }

  setPage(num) {
    this.curPage = num;
  }

  getPlaythroughsPage() {
    var first = (this.curPage - 1) * this.offset;
    var last = first + this.offset;

    if(!this.search || this.search == '') {
      this.filteredPlaythroughs = this.playthroughs.slice(first, last);
    } else {
      this.filteredPlaythroughs = this.aux.slice(first, last);
    }
  }

  getPrevPage() {
    if(this.curPage > 1) {
      this.curPage--;
      this.getPlaythroughsPage();
    }
  }

  getNextPage() {
    if(this.curPage < this.numPages) {
      this.curPage++;
      this.getPlaythroughsPage();
    }
  }

  onSortChange() {
    if(this.curSort=='rating') {
      this.playthroughs.sort(compareRating);
    }
    else if (this.curSort=='name') {
      this.playthroughs.sort(compareName);
    }
    else if (this.curSort=='date') {
      this.playthroughs.sort(compareDate);
    }

    this.searchGame();

    function compareRating(a:Playthrough, b:Playthrough) {
      var a_rating;
      var b_rating;

      if(!a.rating) {
        a_rating = -1;
      } else {
        a_rating = a.rating;
      }
      if(!b.rating) {
        b_rating = -1;
      } else {
        b_rating = b.rating;
      }

      if(a_rating < b_rating) {
        return 1;
      }
      if(a_rating > b_rating) {
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

    function compareName(a:Playthrough, b:Playthrough) {
      return a.game.name.localeCompare(b.game.name.toString());
    }

    function compareDate(a:Playthrough, b:Playthrough) {
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

interface Playthrough {
  date:Date;
  rating:Number;
  game:Game;
}

interface Game {
  name:String;
}