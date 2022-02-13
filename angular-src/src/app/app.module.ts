import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ScrollToModule } from 'ng2-scroll-to';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SubsundayComponent } from './components/subsunday/subsunday.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SubsundayService } from './services/subsunday.service';
import { PlaythroughsService } from './services/playthroughs.service';
import { FmfsService } from './services/fmfs.service';
import { HotlinesService } from './services/hotlines.service';
import { BattlestationsService } from './services/battlestations.service';
import { LiriknchillService } from './services/liriknchill.service';
import { GamesService } from './services/games.service';
import { EmotesService } from './services/emotes.service';
import { BadgesService } from './services/badges.service';
import { StreamService } from './services/stream.service';
import { ValidateService } from './services/validate.service';
import { DarkmodeService } from './services/darkmode.service';
import { SubsundayaddComponent } from './components/subsundayadd/subsundayadd.component';
import { SubsundayeditComponent } from './components/subsundayedit/subsundayedit.component';
import { SubsundaydetailsComponent } from './components/subsundaydetails/subsundaydetails.component';
import { EmotesComponent } from './components/emotes/emotes.component';
import { GamesComponent } from './components/games/games.component';
import { BadgesComponent } from './components/badges/badges.component';
import { GameaddComponent } from './components/gameadd/gameadd.component';
import { GameeditComponent } from './components/gameedit/gameedit.component';
import { PlaythroughsComponent } from './components/playthroughs/playthroughs.component';
import { PlaythroughaddComponent } from './components/playthroughadd/playthroughadd.component';
import { PlaythrougheditComponent } from './components/playthroughedit/playthroughedit.component';
import { PlaythroughdetailsComponent } from './components/playthroughdetails/playthroughdetails.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FooterComponent } from './components/footer/footer.component';
import { DonateComponent } from './components/donate/donate.component';
import { FmfsdetailsComponent } from './components/fmfsdetails/fmfsdetails.component';
import { FmfsComponent } from './components/fmfs/fmfs.component';
import { FmfaddComponent } from './components/fmfadd/fmfadd.component';
import { FmfeditComponent } from './components/fmfedit/fmfedit.component';
import { HotlineaddComponent } from './components/hotlineadd/hotlineadd.component';
import { HotlineeditComponent } from './components/hotlineedit/hotlineedit.component';
import { HotlinedetailsComponent } from './components/hotlinedetails/hotlinedetails.component';
import { HotlinesComponent } from './components/hotlines/hotlines.component';
import { BattlestationsComponent } from './components/battlestations/battlestations.component';
import { BattlestationaddComponent } from './components/battlestationadd/battlestationadd.component';
import { BattlestationdetailsComponent } from './components/battlestationdetails/battlestationdetails.component';
import { BattlestationeditComponent } from './components/battlestationedit/battlestationedit.component';
import { LiriknchillComponent } from './components/liriknchill/liriknchill.component';
import { LiriknchilldetailsComponent } from './components/liriknchilldetails/liriknchilldetails.component';
import { LiriknchilladdComponent } from './components/liriknchilladd/liriknchilladd.component';
import { LiriknchilleditComponent } from './components/liriknchilledit/liriknchilledit.component';

const appRoutes:Routes = [
  {path:'', component: HomeComponent},
  {path:'subsundays', component: SubsundayComponent},
  {path:'subsundays/add', component: SubsundayaddComponent, canActivate:[AuthGuard]},
  {path:'subsundays/:number', component: SubsundaydetailsComponent},
  {path:'subsundays/edit/:number', component: SubsundayeditComponent, canActivate:[AuthGuard]},
  {path:'playthroughs', component: PlaythroughsComponent},
  {path:'playthroughs/add', component: PlaythroughaddComponent, canActivate:[AuthGuard]},
  {path:'playthroughs/:id', component: PlaythroughdetailsComponent},
  {path:'playthroughs/edit/:id', component: PlaythrougheditComponent, canActivate:[AuthGuard]},
  {path:'subhotlines', component: HotlinesComponent},
  {path:'subhotlines/add', component: HotlineaddComponent, canActivate:[AuthGuard]},
  {path:'subhotlines/:number', component: HotlinedetailsComponent},
  {path:'subhotlines/edit/:number', component: HotlineeditComponent, canActivate:[AuthGuard]},
  {path:'fightmefridays', component: FmfsComponent},
  {path:'fightmefridays/add', component: FmfaddComponent, canActivate:[AuthGuard]},
  {path:'fightmefridays/:number', component: FmfsdetailsComponent},
  {path:'fightmefridays/edit/:number', component: FmfeditComponent, canActivate:[AuthGuard]},
  {path:'battlestations', component: BattlestationsComponent},
  {path:'battlestations/add', component: BattlestationaddComponent, canActivate:[AuthGuard]},
  {path:'battlestations/:number', component: BattlestationdetailsComponent},
  {path:'battlestations/edit/:number', component: BattlestationeditComponent, canActivate:[AuthGuard]},
  {path:'liriknchill', component: LiriknchillComponent},
  {path:'liriknchill/add', component: LiriknchilladdComponent, canActivate:[AuthGuard]},
  {path:'liriknchill/:number', component: LiriknchilldetailsComponent},
  {path:'liriknchill/edit/:number', component: LiriknchilleditComponent, canActivate:[AuthGuard]},
  {path:'games', component: GamesComponent, canActivate:[AuthGuard]},
  {path:'games/add', component: GameaddComponent, canActivate:[AuthGuard]},
  {path:'games/edit/:id', component: GameeditComponent, canActivate:[AuthGuard]},
  {path:'emotes', component: EmotesComponent},
  {path:'badges', component: BadgesComponent},
  {path:'authenticate', component: LoginComponent},
  {path:'donate', component: DonateComponent},
  {path:'**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SubsundayComponent,
    LoginComponent,
    HomeComponent,
    SubsundayaddComponent,
    SubsundayeditComponent,
    SubsundaydetailsComponent,
    EmotesComponent,
    GamesComponent,
    BadgesComponent,
    GameaddComponent,
    GameeditComponent,
    PlaythroughsComponent,
    PlaythroughaddComponent,
    PlaythrougheditComponent,
    PlaythroughdetailsComponent,
    NotfoundComponent,
    FooterComponent,
    DonateComponent,
    FmfsdetailsComponent,
    FmfsComponent,
    FmfaddComponent,
    FmfeditComponent,
    HotlineaddComponent,
    HotlineeditComponent,
    HotlinedetailsComponent,
    HotlinesComponent,
    BattlestationsComponent,
    BattlestationaddComponent,
    BattlestationdetailsComponent,
    BattlestationeditComponent,
    LiriknchillComponent,
    LiriknchilldetailsComponent,
    LiriknchilladdComponent,
    LiriknchilleditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ScrollToModule.forRoot()
  ],
  providers: [AuthService, SubsundayService, GamesService, EmotesService, BadgesService, ValidateService, PlaythroughsService, FmfsService, StreamService, HotlinesService, BattlestationsService, LiriknchillService, DarkmodeService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
