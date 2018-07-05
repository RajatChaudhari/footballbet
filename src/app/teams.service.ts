import { Injectable } from '@angular/core';
import { Team, TEAMS } from './team';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor() { }

  getTeams(): Observable<Team[]>{
    return of(TEAMS);
  }

  getTeam(id: number): Team {
    return TEAMS.filter(element => element.id === id)[0];
  }
}
