import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { FmfsService } from '../../services/fmfs.service';
import { GamesService } from '../../services/games.service';
import { ValidateService } from '../../services/validate.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fmfadd',
  templateUrl: './fmfadd.component.html',
  styleUrls: ['./fmfadd.component.css']
})
export class FmfaddComponent implements OnInit {
  fmf:Fmf;
  date:String;
  gameList:Object[];
  addedGames:Game[];
  addedOpponents:Opponent[];
  curGame:Game;
  selectedGame:GameInfo;
  hasDiffVod:boolean;

  curOppName:String;
  curVodUrl:String;
  curTimeH:Number;
  curTimeM:Number;
  curTimeS:Number;

  constructor(
    private fmfsService:FmfsService,
    private gamesService:GamesService,
    private validateService:ValidateService,
    private router:Router,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Add Fight Me Friday - LIRIK Hub');
    this.gamesService.getGames().subscribe(data => {
      this.gameList = data;
    });
    
    this.hasDiffVod = false;
    this.fmf = {
      number: undefined,
      vodurl: '',
      date: undefined,
      games: []
    }
    this.curGame = {
      game: {
        _id: '',
        name: '',
        image: '',
        buyurl: ''
      },
      opponents: []
    }
    this.addedGames = [];
    this.addedOpponents = [];
  }

  addFmf() {
    if(!this.validateService.validateNumber(this.fmf.number) || !this.validateService.validateDate(this.date) || !this.validateService.validateArray(this.addedGames)){
      return false;
    }

    if(this.date=='') this.date = undefined;

    if(this.date!=undefined){
      this.fmf.date = this.convertDate(this.date);
    }

    for(let i=0; i<this.addedGames.length; i++) {
      const newGame = {
        game: this.addedGames[i].game._id,
        opponents: this.addedGames[i].opponents
      }
      this.fmf.games.push(newGame);
    }

    this.fmfsService.addFmf(this.fmf).subscribe(data => {
      if(data.success){
        this.router.navigate(['/fightmefridays']);
      } else {
        this.fmf.games = [];
        alert('An error has ocurred. Try again');
      }
    });
  }

  addGame() {
    if(!this.validateService.validateGameSelect(this.selectedGame)){
      return false;
    }

    this.curGame.opponents = this.addedOpponents;
    this.addedOpponents = [];
    this.clearOpponent();
    this.curGame.game = this.selectedGame;
    this.addedGames.push(this.curGame);
    this.clearGame();
  }

  addOpponent() {
    this.checkInvalidTime();
    var newOpponent = {
      name: this.curOppName,
      vodtime: '?t=' + this.curTimeH + 'h' + this.curTimeM + 'm' + this.curTimeS + 's',
      vodurl: this.curVodUrl
    }
    this.addedOpponents.push(newOpponent);
    this.clearOpponent();
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

  convertDate(date:String) {
    var splitDate = date.split("-");
    var newDate = new Date(splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]);
    newDate.setHours(17,0,0,0);

    return newDate;
  }

  clearGame() {
    this.curGame = {
      game: {
        _id: '',
        name: '',
        image: '',
        buyurl: ''
      },
      opponents: []
    }
    this.selectedGame = {
      _id: '',
      name: '',
      image: '',
      buyurl: ''
    }
  }

  clearOpponent() {
    this.curOppName = '';
    this.curTimeH = undefined;
    this.curTimeM = undefined;
    this.curTimeS = undefined;
    this.curVodUrl = undefined;
    this.hasDiffVod = false;
  }

  deleteGame(index) {
    this.addedGames.splice(index, 1);
  }

  deleteOpponent(index) {
    this.addedOpponents.splice(index, 1);
  }

  onGameListChange() {
    this.curGame.game = this.selectedGame;
  }

  checkInvalidTime() {
    if(this.curTimeH == undefined) this.curTimeH = 0;
    if(this.curTimeM == undefined) this.curTimeM = 0;
    if(this.curTimeS == undefined) this.curTimeS = 0;
  }
}

interface Fmf {
  number:Number;
  date:Date;
  vodurl:String;
  games:Object[];
}

interface GameInfo {
  _id:String,
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