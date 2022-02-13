import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { SubsundayService } from '../../services/subsunday.service';
import { GamesService } from '../../services/games.service';
import { ValidateService } from '../../services/validate.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router } from '@angular/router';
import { GamesComponent } from '../games/games.component';

@Component({
  selector: 'app-subsundayadd',
  templateUrl: './subsundayadd.component.html',
  styleUrls: ['./subsundayadd.component.css']
})
export class SubsundayaddComponent implements OnInit {
  subsunday:Subsunday;
  date:String;
  addedGames:Game[];
  gameList:Object[];
  curGame:Game;
  curTimeH:Number;
  curTimeM:Number;
  curTimeS:Number;
  selectedGame:Game;
  hasDiffVod:boolean;

  constructor(
    private subsundayService:SubsundayService,
    private gamesService:GamesService,
    private validateService:ValidateService,
    private router:Router,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Add Sub Sunday - LIRIK Hub');
    this.gamesService.getGames().subscribe(data => {
      this.gameList = data;
    });

    this.hasDiffVod = false;
    this.subsunday = {
      number: undefined,
      votes: '',
      vodurl: '',
      date: undefined,
      games: [],
      message: ''
    }
    
    this.addedGames = [];
    this.curGame = {
      _id: '',
      name: '',
      image: '',
      buyurl: '',
      tought: '',
      vodurl: '',
      vodtime: ''
    }
  }

  addSubsunday() {
    if(!this.validateService.validateNumber(this.subsunday.number) || !this.validateService.validateDate(this.date) || !this.validateService.validateArray(this.addedGames)){
      return false;
    }

    for(let i=0; i<this.addedGames.length; i++) {
      const newGame = {
        game: this.addedGames[i]._id,
        tought: this.addedGames[i].tought,
        vodurl: this.addedGames[i].vodurl,
        vodtime: this.addedGames[i].vodtime
      }
      this.subsunday.games.push(newGame);
    } 
    
    if(this.date=='') this.date = undefined;

    if(this.date!=undefined){
      this.subsunday.date = this.convertDate(this.date);
    }

    this.subsundayService.addSubsunday(this.subsunday).subscribe(data => {
      if(data.success){
        this.router.navigate(['/subsundays']);
      } else {
        this.subsunday.games = [];
        alert('An error has ocurred. Try again');
      }
    });
  }

  addGame() {
    if(!this.validateService.validateGameSelect(this.selectedGame)){
      return false;
    }

    this.checkInvalidTime();
    this.curGame.vodtime = '?t=' + this.curTimeH + 'h' + this.curTimeM + 'm' + this.curTimeS + 's';
    this.addedGames.push(this.curGame);
    this.clearGameInput();
  }

  moveGameUp(index) {
    let aux = this.addedGames[index-1];
    this.addedGames[index-1] = this.addedGames[index];
    this.addedGames[index] = aux;
  }

  moveGameDown(index) {
    let aux = this.addedGames[index+1];
    this.addedGames[index+1] = this.addedGames[index];
    this.addedGames[index] = aux;
  }

  deleteGame(index) {
    this.addedGames.splice(index, 1);
  }

  onGameListChange() {
    this.curGame = this.selectedGame;
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

  clearGameInput() {
    this.selectedGame = {
      _id: '',
      name: '',
      image: '',
      buyurl: '',
      tought: '',
      vodurl: '',
      vodtime: ''
    }
    this.curGame = {
      _id: '',
      name: '',
      image: '',
      buyurl: '',
      tought: '',
      vodurl: '',
      vodtime: ''
    }
    this.curTimeH = undefined;
    this.curTimeM = undefined;
    this.curTimeS = undefined;
    this.hasDiffVod = false;
  }
}

interface Subsunday {
  number: Number,
  votes: String,
  vodurl: String,
  date: Date
  games: Object[],
  message: String
}

interface Game {
  _id:String,
  name:String,
  image:String,
  buyurl:String,
  tought:String,
  vodurl:String,
  vodtime:String
}