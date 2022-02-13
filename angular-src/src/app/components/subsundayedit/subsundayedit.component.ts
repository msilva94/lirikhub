import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { SubsundayService } from '../../services/subsunday.service';
import { GamesService } from '../../services/games.service';
import { ValidateService } from '../../services/validate.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subsundayedit',
  templateUrl: './subsundayedit.component.html',
  styleUrls: ['./subsundayedit.component.css']
})
export class SubsundayeditComponent implements OnInit {
  number:number;
  subsunday:Subsunday;
  date:String;
  games:Game[];
  gameList:Object[];
  curGame:Game;
  curTimeH:Number;
  curTimeM:Number;
  curTimeS:Number;
  selectedGame:Game;
  hasDiffVod:boolean;
  private sub:any;

  constructor(
    private subsundayService:SubsundayService,
    private gamesService:GamesService,
    private validateService:ValidateService,
    private router:Router,
    private route:ActivatedRoute,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Edit Sub Sunday - LIRIK Hub');
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
    this.curGame = {
      _id: '',
      name: '',
      image: '',
      buyurl: '',
      tought: '',
      vodurl: '',
      vodtime: ''
    }

    this.sub = this.route.params.subscribe(params => {
      this.number = +params['number'];
    });

    this.subsundayService.getSubsunday(this.number).subscribe(data => {
      if(data.hasOwnProperty('success') && !data.success){
        this.router.navigate(['/subsundays']);
        return false;
      }

      this.subsunday.number = data.number;
      this.subsunday.votes = data.votes;
      this.subsunday.vodurl = data.vodurl;
      this.subsunday.date = data.date;
      this.subsunday.message = data.message;
      
      this.date = this.convertDateFromISO(this.subsunday.date);

      let dataGames = data.games;
      this.games = [];
      for(let i=0; i<dataGames.length; i++) {
        const game = {
          _id: dataGames[i].game._id,
          name: dataGames[i].game.name,
          image: dataGames[i].game.image,
          buyurl: dataGames[i].game.buyurl,
          tought: dataGames[i].tought,
          vodurl: dataGames[i].vodurl,
          vodtime: dataGames[i].vodtime
        }

        this.games.push(game);
      }
    });
  }

  updateSubsunday() {
    if(!this.validateService.validateNumber(this.subsunday.number) || !this.validateService.validateDate(this.date) || !this.validateService.validateArray(this.games)){
      return false;
    }

    for(let i=0; i<this.games.length; i++) {
      const newGame = {
        game: this.games[i]._id,
        tought: this.games[i].tought,
        vodurl: this.games[i].vodurl,
        vodtime: this.games[i].vodtime
      }
      this.subsunday.games.push(newGame);
    }

    if(this.date==''){
      this.date = undefined;
    } else {
      this.subsunday.date = this.convertDate(this.date);
    }

    this.subsundayService.updateSubsunday(this.subsunday.number, this.subsunday).subscribe(data => {
      if(data.success){
        this.router.navigate(['/subsundays']);
      } else {
        alert('Some fields are missing');
      }
    });
  }

  addGame() {
    if(!this.validateService.validateGameSelect(this.selectedGame)){
      return false;
    }

    this.checkInvalidTime();
    this.curGame.vodtime = '?t=' + this.curTimeH + 'h' + this.curTimeM + 'm' + this.curTimeS + 's';
    this.games.push(this.curGame);
    this.clearGameInput();
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

  deleteGame(index) {
    this.games.splice(index, 1);
  }

  onListChange() {
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

  convertDateFromISO(date:Date) {
    var splitDate = date.toString().substring(0, 10).split("-");
    var newDate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];

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