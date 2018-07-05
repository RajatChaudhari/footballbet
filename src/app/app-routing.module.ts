import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchesComponent } from './matches/matches.component';
import { BetComponent } from './bet/bet.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: 'placebet', component: MatchesComponent },
  { path: 'bets', component: BetComponent },
  { path: '', redirectTo: '/teams', pathMatch: 'full' },
  { path: 'teams', component: TeamsComponent }
];
@NgModule({
  exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ],
  declarations: []
})
export class AppRoutingModule { }
