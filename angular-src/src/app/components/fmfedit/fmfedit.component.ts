import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { FmfsService } from '../../services/fmfs.service';
import { GamesService } from '../../services/games.service';
import { ValidateService } from '../../services/validate.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fmfedit',
  templateUrl: './fmfedit.component.html',
  styleUrls: ['./fmfedit.component.css']
})
export class FmfeditComponent implements OnInit {
  number:Number;
  date:String;
  fmf:Fmf;
  games:Game[];
  opponents:Opponent[];
  gameList:Object[];
  curGame:Game;
  selectedGame:GameInfo;
  hasDiffVod:boolean;
  private sub:any;

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
    private route:ActivatedRoute,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Edit Fight Me Friday - LIRIK Hub');
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

    this.sub = this.route.params.subscribe(params => {
      this.number = +params['number'];
    });

    this.fmfsService.getFmf(this.number).subscribe(data => {
      if(data.hasOwnProperty('success') && !data.success){
        this.router.navigate(['/fightmefridays']);
        return false;
      }

      this.fmf.number = data.number;
      this.fmf.date = data.date;
      this.fmf.vodurl = data.vodurl;
      
      this.date = this.convertDateFromISO(this.fmf.date);

      this.games = data.games;
      this.opponents = [];
    });
  }

  updateFmf() {
    if(!this.validateService.validateNumber(this.fmf.number) || !this.validateService.validateDate(this.date) || !this.validateService.validateArray(this.games)){
      return false;
    }

    if(this.date==''){
      this.date = undefined;
    } else {
      this.fmf.date = this.convertDate(this.date);
    }

    for(let i=0; i<this.games.length; i++) {
      const newGame = {
        game: this.games[i].game._id,
        opponents: this.games[i].opponents
      }
      this.fmf.games.push(newGame);
    }

    this.fmfsService.updateFmf(this.fmf.number, this.fmf).subscribe(data => {
      if(data.success){
        this.router.navigate(['/fightmefridays']);
      } else {
        alert('An error has ocurred. Try again');
      }
    });
  }

  addGame() {
    if(!this.validateService.validateGameSelect(this.selectedGame)){
      return false;
    }

    this.curGame.opponents = this.opponents;
    this.opponents = [];
    this.clearOpponent();
    this.curGame.game = this.selectedGame;
    this.games.push(this.curGame);
    this.clearGame();
  }

  addOpponent() {
    this.checkInvalidTime();
    var newOpponent = {
      name: this.curOppName,
      vodtime: '?t=' + this.curTimeH + 'h' + this.curTimeM + 'm' + this.curTimeS + 's',
      vodurl: this.curVodUrl
    }
    this.opponents.push(newOpponent);
    this.clearOpponent();
  }

  moveGameUp(index) {
    let aux = this.games[index-1];
    this.games[index-1] = this.games[index];
    this.games[index] = aux;
  }

  moveGameDown(index) {
    let aux = this.games[index+1];
    this.games[index+1] = this.games[index];
    this.games[index] = aux;
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
    this.games.splice(index, 1);
  }

  deleteOpponent(index) {
    this.opponents.splice(index, 1);
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