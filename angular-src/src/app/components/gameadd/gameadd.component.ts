import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { GamesService } from '../../services/games.service';
import { ValidateService } from '../../services/validate.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gameadd',
  templateUrl: './gameadd.component.html',
  styleUrls: ['./gameadd.component.css']
})
export class GameaddComponent implements OnInit {
  name: string;
  image: string;
  buyurl: string;

  constructor(
    private gamesService:GamesService,
    private validateService:ValidateService,
    private router:Router,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Add Game - LIRIK Hub');
  }

  addGame() {
    const game = {
      name: this.name,
      image: this.image,
      buyurl: this.buyurl
    }

    if(!this.validateService.validateString(game.name) || !this.validateService.validateString(game.image)){
      return false;
    }

    this.gamesService.addGame(game).subscribe(data => {
      if(data.success){
        this.router.navigate(['/games']);
      } else {
        alert('An error has ocurred. Try again');
      }
    });
  }
}