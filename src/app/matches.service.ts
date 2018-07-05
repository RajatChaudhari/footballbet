import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Matches } from './matches';
import { catchError, map, tap } from 'rxjs/operators';
import {Team} from './team';
import {TeamsService} from './teams.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private matchUrl = 'http://localhost:56074/api/Matches/';
  team:Team;
  teamObj:Team=new Team();
  
  constructor(private http: HttpClient, private teamService:TeamsService) { }
  getMatches(): Observable<any> {
    return this.http.get<any>(this.matchUrl+"Get")
      .pipe(
        map((response: any) => {
          let matches:Matches[]=[];
          Object.keys(response.groups).forEach((group,index)=>{
            response.groups[group].matches.forEach((match,index)=>{
              this.getTeam(match.home_team);
              match.homeTeamName=this.teamObj.name;
              match.homeTeamID=this.teamObj.id;
              match.flagHome=this.teamObj.flag
              this.getTeam(match.away_team);
              match.awayTeamName=this.teamObj.name;
              match.awayTeamID=this.teamObj.id;
              match.flagAway=this.teamObj.flag
              matches.push(match);
            })
          })
          console.log(matches);
          return matches;
          
        }),
        catchError(this.handleError('getMatches', []))
      );

  }


  getTeam(id:number): Team {
    this.teamObj=this.teamService.getTeam(id)
    return this.teamObj;
    

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
