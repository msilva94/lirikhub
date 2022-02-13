import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { GamesService } from '../../services/games.service';
import { ValidateService } from '../../services/validate.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gameedit',
  templateUrl: './gameedit.component.html',
  styleUrls: ['./gameedit.component.css']
})
export class GameeditComponent implements OnInit {
  id:String;
  name: string;
  image: string;
  buyurl: string;
  private sub:any;

  constructor(
    private gamesService:GamesService,
    private validateService:ValidateService,
    private router:Router,
    private route:ActivatedRoute,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Edit Game - LIRIK Hub');
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.gamesService.getGame(this.id).subscribe(data => {
      if(data.hasOwnProperty('success') && !data.success){
        this.router.navigate(['/games']);
        return false;
      }

      this.name = data.name;
      this.image = data.image;
      this.buyurl = data.buyurl;
    });
  }

  updateGame() {
    const game = {
      name: this.name,
      image: this.image,
      buyurl: this.buyurl
    }

    if(!this.validateService.validateString(game.name) || !this.validateService.validateString(game.image)){
      return false;
    }

    this.gamesService.updateGame(this.id, game).subscribe(data => {
      if(data.success){
        this.router.navigate(['/games']);
      } else {
        alert('Some fields are missing');
      }
    });
  }
}