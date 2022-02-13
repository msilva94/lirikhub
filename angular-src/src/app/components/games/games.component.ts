import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { GamesService } from '../../services/games.service';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games:Game[];
  filteredGames:Game[];
  aux:Game[];
  total:Number;
  curPage:number;
  offset:number;
  numPages:number;
  pages:number[];
  search:String;

  constructor(
    private gamesService:GamesService,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Games - LIRIK Hub');
    this.pages = [];
    this.filteredGames = [];
    this.curPage = 1;
    this.offset = 25;
    this.gamesService.getGames().subscribe(data => {
      this.games = data;
      this.total = this.games.length;
      this.numPages = Math.ceil(this.games.length / this.offset);
      this.getGamesPage();

      for(var i = 0; i<this.numPages; i++) {
        this.pages.push(i + 1);
      }
    });
  }

  onDeleteClick(game) {
    this.gamesService.deleteGame(game._id).subscribe(data => {
      if(data.success){
        this.games.splice(this.games.indexOf(game), 1);
        this.filteredGames.splice(this.filteredGames.indexOf(game), 1);
        this.searchGame();
      }
    });
  }

  searchGame() {
    this.setPage(1);
    if(!this.search || this.search == '') {
      this.pages = [];
      this.numPages = Math.ceil(this.games.length / this.offset);
      for(var i = 0; i<this.numPages; i++) {
        this.pages.push(i + 1);
      }

      this.total = this.games.length;
      this.getGamesPage();
    } else {
      this.aux = [];
      this.filteredGames = [];
      this.pages = [];

      for(var i = 0; i < this.games.length; i++) {
        if(this.games[i].name.toLowerCase().match(this.search.toLowerCase())) {
          this.aux.push(this.games[i]);
        }
      }

      this.total = this.aux.length;

      this.numPages = Math.ceil(this.aux.length / this.offset);
      for(var i = 0; i < this.numPages; i++) {
        this.pages.push(i + 1);
      }

      var first = (this.curPage - 1) * this.offset;
      var last = first + this.offset;
      this.filteredGames = this.aux.slice(first, last);
    }
  }

  setPage(num) {
    this.curPage = num;
  }

  getGamesPage() {
    var first = (this.curPage - 1) * this.offset;
    var last = first + this.offset;

    if(!this.search || this.search == '') {
      this.filteredGames = this.games.slice(first, last);
    } else {
      this.filteredGames = this.aux.slice(first, last);
    }
  }

  getPrevPage() {
    if(this.curPage > 1) {
      this.curPage--;
      this.getGamesPage();
    }
  }

  getNextPage() {
    if(this.curPage < this.numPages) {
      this.curPage++;
      this.getGamesPage();
    }
  }
}

interface Game {
  name:String;
  image:String;
  buyurl:String;
}