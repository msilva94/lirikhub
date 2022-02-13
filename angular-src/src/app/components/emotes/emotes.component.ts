import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { EmotesService } from '../../services/emotes.service';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-emotes',
  templateUrl: './emotes.component.html',
  styleUrls: ['./emotes.component.css']
})
export class EmotesComponent implements OnInit {
  tier1:Emote[];
  tier2:Emote[];
  tier3:Emote[];
  old_emotes:Emote[];

  constructor(
    private emotesService:EmotesService,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Emotes - LIRIK Hub');

    this.emotesService.getEmotes().subscribe(data => {
      this.tier1 = data[0];
      this.tier2 = data[1];
      this.tier3 = data[2];
      this.old_emotes = data[3];
    });
  }

}

interface Emote {
  code: String,
  id: number
}