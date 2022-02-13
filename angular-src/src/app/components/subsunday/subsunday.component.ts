import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { SubsundayService } from '../../services/subsunday.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { isNull } from 'util';

@Component({
  selector: 'app-subsunday',
  templateUrl: './subsunday.component.html',
  styleUrls: ['./subsunday.component.css']
})
export class SubsundayComponent implements OnInit {
  subsundays:Subsunday[];
  filteredSubsundays:Subsunday[];
  curPage:number;
  offset:number;
  numPages:number;
  pages:number[];
  search:String;
  total:Number;
  aux:Subsunday[];
  curSort:String;

  constructor(
    private authService:AuthService,
    private subsundayService:SubsundayService,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Sub Sundays - LIRIK Hub');

    this.pages = [];
    this.filteredSubsundays = [];
    this.curPage = 1;
    this.offset = 25;
    this.curSort = 'date';
    this.subsundayService.getSubsundays().subscribe(data => {
      this.subsundays = data;
      this.numPages = Math.ceil(this.subsundays.length / this.offset);
      this.getSubsundaysPage();

      for(var i = 0; i<this.numPages; i++) {
        this.pages.push(i + 1);
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onDeleteClick(subsunday) {
    this.subsundayService.deleteSubsunday(subsunday.number).subscribe(data => {
      if(data.success){
        let index = this.subsundays.indexOf(subsunday);
        this.subsundays.splice(index, 1);
      }
    });
  }

  searchGame() {
    this.setPage(1);
    if(!this.search || this.search == '') {
      this.pages = [];
      this.numPages = Math.ceil(this.subsundays.length / this.offset);
      for(var i = 0; i<this.numPages; i++) {
        this.pages.push(i + 1);
      }

      this.total = this.subsundays.length;
      this.getSubsundaysPage();
    } else {
      this.aux = [];
      this.filteredSubsundays = [];
      this.pages = [];

      for(var i = 0; i < this.subsundays.length; i++) {
        for(var j = 0; j < this.subsundays[i].games.length; j++) {
          if(this.subsundays[i].games[j].game.name.toLowerCase().match(this.search.toLowerCase())) {
            this.aux.push(this.subsundays[i]);
            j = this.subsundays[i].games.length;
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
      this.filteredSubsundays = this.aux.slice(first, last);
    }
  }

  setPage(num) {
    this.curPage = num;
  }

  getSubsundaysPage() {
    var first = (this.curPage - 1) * this.offset;
    var last = first + this.offset;

    if(!this.search || this.search == '') {
      this.filteredSubsundays = this.subsundays.slice(first, last);
    } else {
      this.filteredSubsundays = this.aux.slice(first, last);
    }
  }

  getPrevPage() {
    if(this.curPage > 1) {
      this.curPage--;
      this.getSubsundaysPage();
    }
  }

  getNextPage() {
    if(this.curPage < this.numPages) {
      this.curPage++;
      this.getSubsundaysPage();
    }
  }

  onSortChange() {
    if(this.curSort=='games') {
      this.subsundays.sort(compareGames);
    }
    else if (this.curSort=='votes') {
      this.subsundays.sort(compareVotes);
    }
    else if (this.curSort=='date') {
      this.subsundays.sort(compareDate);
    }

    this.searchGame();

    function compareVotes(a:Subsunday, b:Subsunday) {
      const re = (/\d+/);
      var a_votes;
      var b_votes;
      var extract;

      if(a.votes=='-') {
        a_votes = -1;
      } else {
        extract = a.votes.match(re)[0];
        a_votes = Number(extract);
      }
      if(b.votes=='-') {
        b_votes = -1;
      } else {
        extract = b.votes.match(re)[0];
        b_votes = Number(extract);
      }

      if(a_votes < b_votes) {
        return 1;
      }
      if(a_votes > b_votes) {
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

    function compareGames(a:Subsunday, b:Subsunday) {
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

    function compareDate(a:Subsunday, b:Subsunday) {
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

interface Subsunday {
  number:Number;
  votes:String;
  date:Date;
  games:Game[];
}

interface Game {
  game:GameName;
}

interface GameName {
  name:String;
}